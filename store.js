import { configureStore } from '@reduxjs/toolkit'
import sampleSlice from './features/samples/sampleSlice'
import userSlice from './features/users/userSlice'
import adminUserSlice from './features/users/adminUserSlice'
import Cookies from 'js-cookie'

const role = Cookies.get('role')

const reducers = {
  sample: sampleSlice,
  user: userSlice,
}

if (role === 'admin') {
  reducers.adminUsers = adminUserSlice
}

const store = configureStore({
  reducer: reducers,
})

export default store
