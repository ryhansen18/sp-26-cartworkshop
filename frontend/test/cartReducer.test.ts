import { describe, it, expect } from 'vitest';
import { cartReducer, initialCartState } from '../src/reducers/cartReducer';

describe('cartReducer', () => {
  // Pure function test
  it('ADD_TO_CART adds a new item with quantity 1', () => {
    const action = {
      type: 'ADD_TO_CART' as const,
      payload: {
        productId: 1,
        productName: 'Wireless Headphones',
        price: 149.99,
      },
    };
    const state = cartReducer(initialCartState, action);
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(1);
    expect(state.items[0].productId).toBe(1);
  });

  // Reducer test
  it('ADD_TO_CART increments quantity if item already exists', () => {
    const action = {
      type: 'ADD_TO_CART' as const,
      payload: { productId: 1, productName: 'Headphones', price: 149.99 },
    };
    const stateAfterFirst = cartReducer(initialCartState, action);
    const stateAfterSecond = cartReducer(stateAfterFirst, action);
    expect(stateAfterSecond.items).toHaveLength(1);
    expect(stateAfterSecond.items[0].quantity).toBe(2);
  });

  it('REMOVE_FROM_CART removes the correct item', () => {
    const withItem = {
      ...initialCartState,
      items: [{ productId: 1, productName: 'Headphones', price: 149.99, quantity: 1 }],
    };
    const state = cartReducer(withItem, {
      type: 'REMOVE_FROM_CART',
      payload: { productId: 1 },
    });
    expect(state.items).toHaveLength(0);
  });

  it('UPDATE_QUANTITY removes item when quantity drops below 1', () => {
    const withItem = {
      ...initialCartState,
      items: [{ productId: 1, productName: 'Headphones', price: 149.99, quantity: 1 }],
    };
    const state = cartReducer(withItem, {
      type: 'UPDATE_QUANTITY',
      payload: { productId: 1, quantity: 0 },
    });
    expect(state.items).toHaveLength(0);
  });

  it('CLEAR_CART empties all items', () => {
    const withItems = {
      ...initialCartState,
      items: [
        { productId: 1, productName: 'Headphones', price: 149.99, quantity: 2 },
        { productId: 2, productName: 'Keyboard', price: 89.99, quantity: 1 },
      ],
    };
    const state = cartReducer(withItems, { type: 'CLEAR_CART' });
    expect(state.items).toHaveLength(0);
  });

  it('TOGGLE_CART flips isOpen', () => {
    const state = cartReducer(initialCartState, { type: 'TOGGLE_CART' });
    expect(state.isOpen).toBe(true);
  });
});