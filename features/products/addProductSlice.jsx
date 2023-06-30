import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customFetch } from '../../lib/axios/customFetch'

const initialState = {
  name: '',
  lastName: '',
  email: '',
  isLoading: false,
}
export const productsThunk = createAsyncThunk(
  'products/productsThunk',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch('')

      return response.data
    } catch (error) {
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
      .addCase(productsThunk.pending, (state, { payload }) => {
        console.log('promise pending')
        console.log(payload)
        state.isLoading = true
      })
      .addCase(productsThunk.fulfilled, (state, { payload }) => {
        console.log('promise fulfilled')
        console.log(payload)
        state.isLoading = false
      })
      .addCase(productsThunk.rejected, (state, { payload }) => {
        console.log('promise rejected')
        console.log(payload)
        state.isLoading = false
      })
  },
})
export const { createFunction, getStateValues, clearState } =
  productsSlice.actions

export default productsSlice.reducer
