import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../../types/cart';
import { Product } from '../../types/product';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product & { quantity?: number; selectedColor?: string; selectedSize?: string }>) {
      const { id, quantity = 1, selectedColor, selectedSize } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && item.selectedColor === selectedColor && item.selectedSize === selectedSize
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...action.payload, quantity });
      }
    },
    removeFromCart(state, action: PayloadAction<{ id: string; selectedColor?: string; selectedSize?: string }>) {
      const { id, selectedColor, selectedSize } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.selectedColor === selectedColor && item.selectedSize === selectedSize)
      );
    },
    updateQuantity(state, action: PayloadAction<{ id: string; quantity: number; selectedColor?: string; selectedSize?: string }>) {
      const { id, quantity, selectedColor, selectedSize } = action.payload;
      const item = state.items.find(
        (item) => item.id === id && item.selectedColor === selectedColor && item.selectedSize === selectedSize
      );
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
