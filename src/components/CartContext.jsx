"use client";

import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext(undefined);

// Helper to safely parse price
const parsePrice = (price) => {
  if (typeof price === 'number') return price;
  if (!price) return 0;
  // Remove currency symbols and other non-numeric characters (except decimal point)
  const cleanPrice = String(price).replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleanPrice);
  return isNaN(parsed) ? 0 : parsed;
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const itemPrice = parsePrice(action.payload.price);
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        return {
          ...state,
          items: [...state.items, {
            ...action.payload,
            price: itemPrice, // Ensure price is stored as a number
            quantity: 1
          }]
        };
      }
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    case 'SET_CUSTOMER_INFO':
      return {
        ...state,
        customerInfo: action.payload
      };

    case 'SET_ORDER_STATUS':
      return {
        ...state,
        orderStatus: action.payload
      };

    case 'SET_PAYMENT_METHOD':
      return {
        ...state,
        paymentMethod: action.payload
      };

    case 'ADD_ORDER':
      return {
        ...state,
        orders: [action.payload, ...(state.orders || [])]
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    customerInfo: null,
    orderStatus: 'idle',
    orders: [],
    paymentMethod: 'cod'
  });

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
    return true;
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  const updateQuantity = (itemId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const setCustomerInfo = (info) => {
    dispatch({ type: 'SET_CUSTOMER_INFO', payload: info });
  };

  const setOrderStatus = (status) => {
    dispatch({ type: 'SET_ORDER_STATUS', payload: status });
  };

  const setPaymentMethod = (method) => {
    dispatch({ type: 'SET_PAYMENT_METHOD', payload: method });
  };

  const addOrder = (order) => {
    dispatch({ type: 'ADD_ORDER', payload: order });
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => {
      // Use stored price which is already parsedNumber, or parse again for safety
      const price = typeof item.price === 'number' ? item.price : parsePrice(item.price);
      return total + (price * item.quantity);
    }, 0);
  };

  const value = {
    items: state.items,
    customerInfo: state.customerInfo,
    orderStatus: state.orderStatus,
    orders: state.orders,
    paymentMethod: state.paymentMethod,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setCustomerInfo,
    setOrderStatus,
    setPaymentMethod,
    addOrder,
    getTotalItems,
    getTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};