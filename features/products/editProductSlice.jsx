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
  soldPrice: '',
  soldQuantity: 1,
  purchasePrice: '',
  quantity: '',
  category: '',
  storagePoint: '',
  isLoading: false,
  isUpdating: false,
  isUpdatingQuantity: false,
  revalidate: false,
}
// =================== 1  Single Product ===================
export const singleProductThunk = createAsyncThunk(
  'products/singleProductThunk',
  async (id, thunkAPI) => {
    try {
      const response = await customFetch(`/products/${id}`)

      return response.data
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong')
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// =================== 2  edit Product ===================
export const editProductThunk = createAsyncThunk(
  'products/editProductThunk',

  async (_, thunkAPI) => {
    const state = thunkAPI.getState().editProduct
    const { _id } = state
    try {
      const response = await customFetch.put(`/products/${_id}`, state)

      toast.success(response.data.message)
      return response.data
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong')

      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// ===================   edit Product and create Order ===================
export const editProductAddOrderThunk = createAsyncThunk(
  'products/editProductAddOrderThunk',

  async (value, thunkAPI) => {
    const { closeModal } = value
    const state = thunkAPI.getState().editProduct
    const price = state.soldPrice
    const quantity = state.soldQuantity
    const productId = state._id
    const { purchasePrice } = state
    try {
      const response = await customFetch.post(`/orders`, {
        price,
        quantity,
        productId,
        purchasePrice,
      })

      toast.success(response.data.message)
      console.log(response)
      closeModal()
      return response.data
    } catch (error) {
      console.log(error)
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
        state.soldPrice = payload.result.price

        state.isLoading = false
      })
      .addCase(singleProductThunk.rejected, (state) => {
        state.isLoading = false
      })
      // =================== 2  edit Product===================
      .addCase(editProductThunk.pending, (state) => {
        state.isUpdating = true
      })
      .addCase(editProductThunk.fulfilled, (state, { payload }) => {
        addObjectInState(payload.result, state)

        state.isUpdating = false
      })
      .addCase(editProductThunk.rejected, (state) => {
        state.isUpdating = false
      })
      // =================== 2  edit Product add order ===================
      .addCase(editProductAddOrderThunk.pending, (state) => {
        state.isUpdatingQuantity = true
      })
      .addCase(editProductAddOrderThunk.fulfilled, (state) => {
        state.revalidate = !state.revalidate

        state.isUpdatingQuantity = false
      })
      .addCase(editProductAddOrderThunk.rejected, (state) => {
        state.isUpdatingQuantity = false
      })
  },
})
export const { createFunction, getStateValues, clearState } =
  productsSlice.actions

export default productsSlice.reducer
