import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the product type
interface Product {
  id: number;
  img: string;
  name: string;
  price: number;
  descrption: string;
  size?: string;
}

interface CartItem {
  product: Product;
  count: number;
  totalPrice: number;
}

interface CartState {
  products: CartItem[];
}

const initialState: CartState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ✅ Fix: Expect payload shape to be { product, quantity }
    addCart: (state, action: PayloadAction<{ product: Product; quantity?: number }>) => {
      const { product, quantity = 1 } = action.payload;

      const existingItem = state.products.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        existingItem.count += quantity;
        existingItem.totalPrice += product.price * quantity;
      } else {
        state.products.push({
          product,
          count: quantity,
          totalPrice: product.price * quantity,
        });
      }
    },

    increase(state, action: PayloadAction<Product>) {
      const item = state.products.find(
        (item) => item.product.id === action.payload.id
      );

      if (item) {
        item.count += 1;
        item.totalPrice += action.payload.price;
      }
    },

    decrease(state, action: PayloadAction<Product>) {
      const item = state.products.find(
        (item) => item.product.id === action.payload.id
      );

      if (item && item.count > 1) {
        item.count -= 1;
        item.totalPrice -= action.payload.price;
      } else if (item) {
        console.warn("Cannot decrease count below 1.");
      }
    },

    removeItem(state, action: PayloadAction<Product>) {
      state.products = state.products.filter(
        (item) => item.product.id !== action.payload.id
      );
    },

    cleanUpCart(state) {
      state.products = [];
    },
  },
});

export const { addCart, removeItem, increase, decrease, cleanUpCart } = cartSlice.actions;
export default cartSlice.reducer;
