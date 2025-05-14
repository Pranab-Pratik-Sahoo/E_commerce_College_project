import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product } from '../types/product';

type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

type CartContextType = {
  cart: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const calculateCartTotals = (items: CartItem[]): { totalItems: number; totalPrice: number } => {
  return items.reduce(
    (acc, item) => {
      return {
        totalItems: acc.totalItems + item.quantity,
        totalPrice: acc.totalPrice + item.product.price * item.quantity,
      };
    },
    { totalItems: 0, totalPrice: 0 }
  );
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find((item) => item.product.id === action.payload.id);
      
      let newItems;
      
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.product.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { product: action.payload, quantity: 1 }];
      }
      
      const { totalItems, totalPrice } = calculateCartTotals(newItems);
      
      return {
        items: newItems,
        totalItems,
        totalPrice,
      };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter((item) => item.product.id !== action.payload);
      const { totalItems, totalPrice } = calculateCartTotals(newItems);
      
      return {
        items: newItems,
        totalItems,
        totalPrice,
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map((item) =>
        item.product.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter((item) => item.quantity > 0);
      
      const { totalItems, totalPrice } = calculateCartTotals(newItems);
      
      return {
        items: newItems,
        totalItems,
        totalPrice,
      };
    }
    
    case 'CLEAR_CART':
      return initialState;
      
    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'CLEAR_CART' });
        parsedCart.items.forEach((item: CartItem) => {
          for (let i = 0; i < item.quantity; i++) {
            dispatch({ type: 'ADD_ITEM', payload: item.product });
          }
        });
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage', error);
    }
  }, []);
  
  // Save cart to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save cart to localStorage', error);
    }
  }, [cart]);
  
  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };
  
  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};