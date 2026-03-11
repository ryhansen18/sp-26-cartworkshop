import { useContext } from 'react';
import { CartContext } from './cartContextDef';
import type { CartContextType } from './cartContextDef';

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}