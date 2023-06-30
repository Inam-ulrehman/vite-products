import { configureStore } from '@reduxjs/toolkit'
import sampleSlice from './features/samples/sampleSlice'
import userSlice from './features/users/userSlice'
import adminUserSlice from './features/users/adminUserSlice'
import Cookies from 'js-cookie'
import addProductSlice from './features/products/addProductSlice'
import productsSlice from './features/products/productsSlice'
import editProductSlice from './features/products/editProductSlice'

const role = Cookies.get('role')

const reducers = {
  sample: sampleSlice,
  user: userSlice,
  addProduct: addProductSlice,
  products: productsSlice,
  editProduct: editProductSlice,
}

if (role === 'admin') {
  reducers.adminUsers = adminUserSlice
}

const store = configureStore({
  reducer: reducers,
})

export default store
