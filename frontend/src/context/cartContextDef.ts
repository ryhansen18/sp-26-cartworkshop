import { createContext } from 'react';
import type { CartState, CartAction } from '../types/cart';

export interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);
