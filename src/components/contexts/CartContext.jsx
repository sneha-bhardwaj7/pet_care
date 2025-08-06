
"use client"
import { createContext, useContext, useReducer, useEffect } from "react"
import { db } from "@/config/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { useAuth } from "./AuthContext"

// Helper functions for localStorage
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      return JSON.parse(savedCart)
    }
  } catch (error) {
    console.error("Error loading cart from localStorage:", error)
  }
  return {
    items: [],
    totalItems: 0,
    totalAmount: 0,
  }
}

const saveCartToStorage = (cartState) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cartState))
  } catch (error) {
    console.error("Error saving cart to localStorage:", error)
  }
}

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return {
        ...action.payload,
      }
    case "ADD_TO_CART":
      const existingItem = state.items.find(
        (item) => item.cartItemId === action.payload.cartItemId
      )
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.cartItemId === action.payload.cartItemId
              ? {
                  ...item,
                  quantity: item.quantity + action.payload.quantity,
                  price: item.price,
                  originalPrice: item.originalPrice
                }
              : item
          ),
          totalItems: state.totalItems + action.payload.quantity,
          totalAmount: state.totalAmount + (existingItem.price * action.payload.quantity),
        }
      } else {
        return {
          ...state,
          items: [...state.items, action.payload],
          totalItems: state.totalItems + action.payload.quantity,
          totalAmount: state.totalAmount + (action.payload.price * action.payload.quantity),
        }
      }
    case "REMOVE_FROM_CART":
      const itemToRemove = state.items.find((item) => item.cartItemId === action.payload)
      return {
        ...state,
        items: state.items.filter((item) => item.cartItemId !== action.payload),
        totalItems: state.totalItems - (itemToRemove?.quantity || 0),
        totalAmount: state.totalAmount - ((itemToRemove?.price || 0) * (itemToRemove?.quantity || 0)),
      }
    case "UPDATE_QUANTITY":
      const item = state.items.find((item) => item.cartItemId === action.payload.cartItemId)
      const quantityDiff = action.payload.quantity - (item?.quantity || 0)
      return {
        ...state,
        items: state.items.map((item) =>
          item.cartItemId === action.payload.cartItemId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        totalItems: state.totalItems + quantityDiff,
        totalAmount: state.totalAmount + ((item?.price || 0) * quantityDiff),
      }
    case "CLEAR_CART":
      return {
        items: [],
        totalItems: 0,
        totalAmount: 0,
      }
    default:
      return state
  }
}

const initialState = loadCartFromStorage()

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const { currentUser } = useAuth()

  // Load cart from Firebase when user logs in
  useEffect(() => {
    const loadCartFromFirebase = async () => {
      if (currentUser) {
        try {
          const cartRef = doc(db, "carts", currentUser.uid)
          const cartSnap = await getDoc(cartRef)

          if (cartSnap.exists()) {
            const firebaseCart = cartSnap.data()
            const validatedItems = firebaseCart.items.map(item => ({
              ...item,
              taxRate: item.taxRate || 5,
              originalPrice: item.originalPrice || item.price,
              selectedSize: item.selectedSize || null,
              selectedColor: item.selectedColor || null
            }))
            dispatch({
              type: "SET_CART",
              payload: {
                ...firebaseCart,
                items: validatedItems
              }
            })
            saveCartToStorage({
              ...firebaseCart,
              items: validatedItems
            })
          } else {
            await setDoc(cartRef, state)
          }
        } catch (error) {
          console.error("Error loading cart from Firebase:", error)
        }
      }
    }
    loadCartFromFirebase()
  }, [currentUser])

  // Save to localStorage and Firebase whenever cart state changes
  useEffect(() => {
    saveCartToStorage(state)

    const saveCartToFirebase = async () => {
      if (currentUser) {
        try {
          const cartRef = doc(db, "carts", currentUser.uid)
          await setDoc(cartRef, state, { merge: true })
        } catch (error) {
          console.error("Error saving cart to Firebase:", error)
        }
      }
    }
    saveCartToFirebase()
  }, [state, currentUser])

  const generateCartItemId = (product, selectedColor, selectedSize) => {
    const sizePart = selectedSize?.size ? `-size-${selectedSize.size}` : ''
    const colorPart = selectedColor?.name ? `-color-${selectedColor.name}` : ''
    return `${product.id}${sizePart}${colorPart}`.toLowerCase()
  }

  const addToCart = (product, quantity = 1, selectedColor, selectedSize) => {
    const sellingPrice = selectedSize?.sellingPrice || product.sellingPrice || product.price
    const originalPrice = selectedSize?.price || product.price

    const cartItemId = generateCartItemId(product, selectedColor, selectedSize)

    const cartItem = {
      cartItemId,
      productId: product.id,
      originalProductId: product.id,
      name: product.name || 'Unnamed Product',
      price: sellingPrice,
      originalPrice: originalPrice,
      image: product.imageUrl || product.thumbnails?.[0] || "/placeholder-product.png",
      quantity: Math.max(1, quantity),
      selectedColor: selectedColor || null,
      selectedSize: selectedSize || null,
      createdAt: new Date().toISOString(),
      sku: product.sku || '',
      taxRate: product.taxRate || 5,
      stockStatus: product.stockStatus || "in_stock",
      weight: product.weight || 0,
      weightUnit: product.weightUnit || 'g',
      displaySize: selectedSize?.size || `${product.weight || 0}${product.weightUnit || 'g'}`,
      displayColor: selectedColor?.name || null
    }

    dispatch({ type: "ADD_TO_CART", payload: cartItem })
  }

  const removeFromCart = (cartItemId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: cartItemId })
  }

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId)
    } else {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { cartItemId, quantity }
      })
    }
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}