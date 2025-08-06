"use client"
import { createContext, useContext, useReducer, useEffect, useCallback } from "react"
import { db } from "@/config/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { useAuth } from "./AuthContext"

const loadWishlistFromStorage = () => {
  try {
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      return JSON.parse(savedWishlist)
    }
  } catch (error) {
    console.error("Error loading wishlist from localStorage:", error)
  }
  return {
    items: [],
    totalItems: 0,
  }
}

const saveWishlistToStorage = (wishlistState) => {
  try {
    localStorage.setItem("wishlist", JSON.stringify(wishlistState))
  } catch (error) {
    console.error("Error saving wishlist to localStorage:", error)
  }
}

const WishlistContext = createContext()

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case "SET_WISHLIST":
      return {
        ...action.payload,
      }
    case "ADD_TO_WISHLIST":
      // Check if product with same ID and selected size already exists
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id && 
               item.selectedSize?.size === action.payload.selectedSize?.size
      )
      
      if (existingItemIndex >= 0) return state

      return {
        ...state,
        items: [...state.items, action.payload],
        totalItems: state.items.length + 1,
      }
    case "REMOVE_FROM_WISHLIST":
      const filteredItems = state.items.filter(item => item.wishlistItemId !== action.payload)
      return {
        ...state,
        items: filteredItems,
        totalItems: filteredItems.length,
      }
    case "CLEAR_WISHLIST":
      return {
        items: [],
        totalItems: 0,
      }
    case "UPDATE_WISHLIST_ITEM":
      return {
        ...state,
        items: state.items.map(item => 
          item.wishlistItemId === action.payload.wishlistItemId
            ? { 
                ...item, 
                selectedSize: action.payload.size,
                price: action.payload.size?.sellingPrice || item.price,
                originalPrice: action.payload.size?.price || item.originalPrice
              }
            : item
        )
      }
    default:
      return state
  }
}
const initialState = loadWishlistFromStorage()

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState)
  const { currentUser } = useAuth()

  const saveWishlistToFirebase = useCallback(async (wishlistState) => {
    if (!currentUser?.uid) return

    try {
      const wishlistRef = doc(db, "wishlist", currentUser.uid)
      await setDoc(wishlistRef, {
        items: wishlistState.items,
        totalItems: wishlistState.totalItems,
        updatedAt: new Date().toISOString()
      }, { merge: true })
    } catch (error) {
      console.error("Error saving wishlist to Firebase:", error)
    }
  }, [currentUser])

  useEffect(() => {
    const loadWishlistFromFirebase = async () => {
      if (currentUser?.uid) {
        try {
          const wishlistRef = doc(db, "wishlist", currentUser.uid)
          const wishlistSnap = await getDoc(wishlistRef)

          if (wishlistSnap.exists()) {
            const firebaseWishlist = wishlistSnap.data()
            if (firebaseWishlist.items) {
              dispatch({ type: "SET_WISHLIST", payload: firebaseWishlist })
              saveWishlistToStorage(firebaseWishlist)
            }
          }
        } catch (error) {
          console.error("Error loading wishlist from Firebase:", error)
        }
      }
    }

    loadWishlistFromFirebase()
  }, [currentUser])

  useEffect(() => {
    saveWishlistToStorage(state)
    const timer = setTimeout(() => saveWishlistToFirebase(state), 500)
    return () => clearTimeout(timer)
  }, [state, saveWishlistToFirebase])

  const addToWishlist = (product) => {
    const wishlistItem = {
      wishlistItemId: `${product.id}-${Date.now()}`,
      id: product.id,
      name: product.name,
      price: product.selectedSize?.sellingPrice || product.discountedPrice || product.price,
      originalPrice: product.selectedSize?.price || product.price,
      image: product.imageUrl || product.image || product.thumbnails?.[0],
      sizeVariations: product.sizeVariations,
      colorVariations: product.colorVariations,
      selectedSize: product.selectedSize,
      selectedColor: product.selectedColor,
      taxRate: product.taxRate || 5,
      createdAt: new Date().toISOString()
    }
    dispatch({ type: "ADD_TO_WISHLIST", payload: wishlistItem })
    return wishlistItem.wishlistItemId
  }

  const removeFromWishlist = (wishlistItemId) => {
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: wishlistItemId })
  }

  const clearWishlist = () => {
    dispatch({ type: "CLEAR_WISHLIST" })
  }

  const updateWishlistItemSize = (wishlistItemId, size) => {
    dispatch({
      type: "UPDATE_WISHLIST_ITEM",
      payload: {
        wishlistItemId,
        size
      }
    })
  }

  const isInWishlist = (productId, selectedSize = null) => {
    return state.items.some(item => {
      const sameProduct = item.id === productId
      const sameSize = selectedSize
        ? item.selectedSize?.size === selectedSize.size
        : true
      return sameProduct && sameSize
    })
  }

  return (
    <WishlistContext.Provider
      value={{
        state,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        updateWishlistItemSize,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}