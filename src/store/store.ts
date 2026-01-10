import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import categoriesReducer from './categorySlice'
import brandsReducer from './brandsSlice'
import productsReducer from '@/store/productsSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoriesReducer,
    brands: brandsReducer,
    products:productsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;
