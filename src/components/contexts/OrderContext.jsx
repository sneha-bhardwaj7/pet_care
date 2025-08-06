"use client"

import { createContext, useContext, useReducer, useEffect, useCallback } from "react"
import { db } from "@/config/firebase"
import { doc, setDoc, collection, query, where, orderBy, getDocs } from "firebase/firestore"
import { useAuth } from "./AuthContext"

// localStorage helper functions
const loadOrdersFromStorage = () => {
  try {
    const savedOrders = localStorage.getItem("orders")
    if (savedOrders) {
      return JSON.parse(savedOrders)
    }
  } catch (error) {
    console.error("Error loading orders from localStorage:", error)
  }
  return {
    items: [],
    totalOrders: 0,
  }
}

const saveOrdersToStorage = (ordersState) => {
  try {
    localStorage.setItem("orders", JSON.stringify(ordersState))
  } catch (error) {
    console.error("Error saving orders to localStorage:", error)
  }
}

const OrderContext = createContext()

const ordersReducer = (state, action) => {
  switch (action.type) {
    case "SET_ORDERS":
      return {
        ...action.payload,
      }
    case "ADD_ORDER":
      return {
        ...state,
        items: [action.payload, ...state.items],
        totalOrders: state.totalOrders + 1,
      }
    case "UPDATE_ORDER_STATUS":
      return {
        ...state,
        items: state.items.map((order) =>
          order.id === action.payload.orderId
            ? { ...order, status: action.payload.status, updatedAt: new Date().toISOString() }
            : order,
        ),
      }
    case "CANCEL_ORDER":
      return {
        ...state,
        items: state.items.map((order) =>
          order.id === action.payload ? { ...order, status: "cancelled", updatedAt: new Date().toISOString() } : order,
        ),
      }
    case "CLEAR_ORDERS":
      return {
        items: [],
        totalOrders: 0,
      }
    default:
      return state
  }
}

const initialState = loadOrdersFromStorage()

export function OrderProvider({ children }) {
  const [state, dispatch] = useReducer(ordersReducer, initialState)
  const { currentUser } = useAuth()

  // Enhanced Firebase save function
  const saveOrdersToFirebase = useCallback(
    async (ordersState) => {
      if (!currentUser?.uid) return

      try {
        const ordersRef = doc(db, "userOrders", currentUser.uid)
        await setDoc(
          ordersRef,
          {
            items: ordersState.items,
            totalOrders: ordersState.totalOrders,
            updatedAt: new Date().toISOString(),
          },
          { merge: true },
        )
      } catch (error) {
        console.error("Error saving orders to Firebase:", error)
      }
    },
    [currentUser],
  )

  // Load orders from Firebase when user logs in
  useEffect(() => {
    const loadOrdersFromFirebase = async () => {
      if (currentUser?.uid) {
        try {
          // Load from orders collection
          const ordersRef = collection(db, "orders")
          const q = query(ordersRef, where("userId", "==", currentUser.uid), orderBy("orderDate", "desc"))
          const querySnapshot = await getDocs(q)

          const ordersData = []
          querySnapshot.forEach((doc) => {
            ordersData.push({
              id: doc.id,
              ...doc.data(),
            })
          })

          if (ordersData.length > 0) {
            const ordersState = {
              items: ordersData,
              totalOrders: ordersData.length,
            }
            dispatch({ type: "SET_ORDERS", payload: ordersState })
            saveOrdersToStorage(ordersState)
          }
        } catch (error) {
          console.error("Error loading orders from Firebase:", error)
        }
      }
    }

    loadOrdersFromFirebase()
  }, [currentUser])

  // Save to localStorage whenever orders state changes
  useEffect(() => {
    saveOrdersToStorage(state)

    // Debounce Firebase saves
    const timer = setTimeout(() => {
      saveOrdersToFirebase(state)
    }, 500)

    return () => clearTimeout(timer)
  }, [state, saveOrdersToFirebase])

  const addOrder = (orderData) => {
    const newOrder = {
      id: `order_${Date.now()}`,
      userId: currentUser?.uid,
      orderNumber: `ORD${Date.now()}`,
      orderDate: new Date(),
      status: "processing",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...orderData,
    }
    dispatch({ type: "ADD_ORDER", payload: newOrder })
  }

  const updateOrderStatus = (orderId, status) => {
    dispatch({ type: "UPDATE_ORDER_STATUS", payload: { orderId, status } })
  }

  const cancelOrder = (orderId) => {
    dispatch({ type: "CANCEL_ORDER", payload: orderId })
  }

  const clearOrders = () => {
    dispatch({ type: "CLEAR_ORDERS" })
  }

  const getOrderById = (orderId) => {
    return state.items.find((order) => order.id === orderId)
  }

  const getOrdersByStatus = (status) => {
    return state.items.filter((order) => order.status === status)
  }

  return (
    <OrderContext.Provider
      value={{
        state,
        addOrder,
        updateOrderStatus,
        cancelOrder,
        clearOrders,
        getOrderById,
        getOrdersByStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export const useOrders = () => {
  const context = useContext(OrderContext)
  if (!context) {
    // Return default state instead of throwing error immediately
    console.warn("useOrders must be used within an OrderProvider")
    return {
      state: { items: [], totalOrders: 0 },
      addOrder: () => {},
      updateOrderStatus: () => {},
      cancelOrder: () => {},
      clearOrders: () => {},
      getOrderById: () => null,
      getOrdersByStatus: () => [],
    }
  }
  return context
}
