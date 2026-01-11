import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '@/api/client'
import type { brand } from '@/types/brands'

type BrandsState = {
  data: brand[]
  loading: boolean
}

export const fetchBrands = createAsyncThunk<brand[]>(
  'brands/fetch',
  async () => {
    const { data, error } = await supabase
      .from('brands')
      .select('*')

    if (error) throw error
    return data as brand[]
  }
)

const initialState: BrandsState = {
  data: [],
  loading: true,
}

const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBrands.pending, state => {
        state.loading = true
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false
      })
  },
})

export default brandsSlice.reducer