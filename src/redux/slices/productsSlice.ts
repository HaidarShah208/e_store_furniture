import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {cardsData} from '../../api/products';
import { Product } from '@/types/types';

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

// Simulate API call
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  return new Promise<Product[]>((resolve) => {
    setTimeout(() => {
      resolve(cardsData as unknown as Product[]);
    }, 500);
  });
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export default productsSlice.reducer;
