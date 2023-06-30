import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customFetch } from '../../lib/axios/customFetch'
import { toast } from 'react-toastify'
import { addObjectInState } from '../../lib/helper'

const initialState = {
  _id: '',
  createdAt: '',
  name: '',
  description: '',
  price: '',
  purchasePrice: '',
  quantity: '',
  category: '',
  storagePoint: '',
  isLoading: false,
}
// =================== 1  Single Product ===================
export const singleProductThunk = createAsyncThunk(
  'products/singleProductThunk',
  async (id, thunkAPI) => {
    try {
      const response = await customFetch(`/products/${id}`)

      toast.success('Product added successfully')

      return response.data
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong')
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
      // =================== 1  Add Product===================
      .addCase(singleProductThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(singleProductThunk.fulfilled, (state, { payload }) => {
        addObjectInState(payload.result, state)

        state.isLoading = false
      })
      .addCase(singleProductThunk.rejected, (state) => {
        state.isLoading = false
      })
  },
})
export const { createFunction, getStateValues, clearState } =
  productsSlice.actions

export default productsSlice.reducer
