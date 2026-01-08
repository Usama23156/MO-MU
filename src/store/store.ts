import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import categoriesReducer from './categorySlice'
import brandsReducer from './brandsSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoriesReducer,
    brands: brandsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;
