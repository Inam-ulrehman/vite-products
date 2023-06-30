import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customFetch } from '../../lib/axios/customFetch'
import { toast } from 'react-toastify'

const initialState = {
  userList: [],
  search: '',
  page: 1,
  limit: 20,
  countOnPage: 0,
  totalData: 0,
  totalSearchCount: 0,
  totalCount: 0,
  totalPages: 0,
  currentPage: 1,
  sort: '-createdAt',
  isLoading: false,
}
// =================== 1  All Products===================
export const allProductsThunk = createAsyncThunk(
  'products/allProductsThunk',
  async (_, thunkAPI) => {
    const { search, page, limit, sort } = thunkAPI.getState().products

    try {
      const response = await customFetch(
        `products?search=${search}&page=${page}&limit=${limit}&sort=${sort}`
      )

      return response.data
    } catch (error) {
      toast.error('Error fetching users')
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // createFunction: (state, { payload }) => {
    //   console.log('function call')
    // },
    getStateValues: (state, { payload }) => {
      const { name, value } = payload

      state[name] = value
    },
    clearState: (state) => {
      state.name = ''
      state.lastName = ''
      state.email = ''
    },
  },

  extraReducers: (builder) => {
    builder
      // =================== 1  All Products===================
      .addCase(allProductsThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(allProductsThunk.fulfilled, (state, { payload }) => {
        console.log(payload)
        state.userList = payload.result
        state.countOnPage = payload.countOnPage
        state.totalCount = payload.totalCount
        state.totalPages = payload.totalPages
        state.currentPage = payload.currentPage
        state.totalData = payload.totalData
        state.totalSearchCount = payload.totalSearchCount
        state.isLoading = false
      })
      .addCase(allProductsThunk.rejected, (state) => {
        state.isLoading = false
      })
  },
})
export const { createFunction, getStateValues, clearState } =
  productsSlice.actions

export default productsSlice.reducer
