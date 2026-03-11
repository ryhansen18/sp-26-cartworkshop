import { useReducer, type ReactNode } from 'react';
import { cartReducer, initialCartState } from '../reducers/cartReducer';
import { CartContext } from './cartContextDef';

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
