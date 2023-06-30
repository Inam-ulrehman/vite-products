import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customFetch } from '../../lib/axios/customFetch'
import { toast } from 'react-toastify'

const initialState = {
  name: '',
  description: '',
  price: '',
  purchasePrice: '',
  quantity: '',
  category: '',
  storagePoint: '',
  isLoading: false,
}
// =================== 1  Add Product===================
export const addProductThunk = createAsyncThunk(
  'products/addProductThunk',
  async (state, thunkAPI) => {
    const { values, clearForm } = state

    try {
      const response = await customFetch.post('/products', values)
      clearForm()
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
      .addCase(addProductThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addProductThunk.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(addProductThunk.rejected, (state) => {
        state.isLoading = false
      })
  },
})
export const { createFunction, getStateValues, clearState } =
  productsSlice.actions

export default productsSlice.reducer
