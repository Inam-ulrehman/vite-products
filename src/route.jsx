import { Route, Routes } from 'react-router-dom'

import Dashboard from './pages/dashboard/page'
import ProtectedRoute from './pages/dashboard/ProtectedRoute'
import ErrorPage from './pages/errorPage'
import Layout from './layout'
import { BrowserRouter as Router } from 'react-router-dom'
import Profile from './pages/dashboard/settings/profile/page'
import LayoutDashboard from './pages/dashboard/LayoutDashboard'
import Login from './pages/user/login/page'
import Register from './pages/user/register/page'
import Recover from './pages/user/recover/page'
import RecoverPassword from './pages/user/recoverpassword/page'
import Admin from './pages/dashboard/admin/page'
import ProtectedAdminRoute from './pages/dashboard/admin/ProtectedAdminRoute'
import AdminUsers from './pages/dashboard/admin/users/page'
import LayoutAdminDashboard from './pages/dashboard/admin/LayoutAdminDashboard'
import ContactSubmissions from './pages/dashboard/admin/contact/page'
import ContactDetails from './pages/dashboard/settings/contact-details/page'
import ChangePassword from './pages/dashboard/settings/change-password/page'
import AdminSingleUser from './pages/dashboard/admin/users/singleUser/page'
import AllProducts from './pages/dashboard/products/all-products/page'
import AddProduct from './pages/dashboard/products/add-product/page'
import EditProduct from './pages/dashboard/products/edit-product/page'
import SoldProducts from './pages/dashboard/products/sold-product/page'

// ==================>>>>>> Routes Config

const RoutesConfig = () => {
  return (
    <Router>
      <Routes>
        {/* ================>>>>> Layout Start  */}
        <Route path='/' element={<Layout />}>
          {/* ================>>>>> Public Routes  */}
          <Route index element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/recover' element={<Recover />} />
          <Route path='recoverpassword?' element={<RecoverPassword />} />
          {/* ================>>>>> Public Routes End  */}
          {/* ================>>>>> Protected Dashboard Start  */}
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <LayoutDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            {/* ===========>>> settings<<<============= */}
            <Route path='/dashboard/settings/profile' element={<Profile />} />
            <Route
              path='/dashboard/settings/contact-details'
              element={<ContactDetails />}
            />
            <Route
              path='/dashboard/settings/change-password'
              element={<ChangePassword />}
            />
            {/* ===========>>> settings<<<============= */}
            {/* ===========>>> products<<============== */}
            <Route path='/dashboard/products' element={<AllProducts />} />
            <Route path='/dashboard/products/add' element={<AddProduct />} />
            <Route
              path='/dashboard/products/edit/:id'
              element={<EditProduct />}
            />
            <Route path='/dashboard/products/sold' element={<SoldProducts />} />
            {/* ===========>>> products<<============== */}

            {/* ================>>>>> Protected Admin Dashboard Start  */}
            <Route
              path='/dashboard/admin'
              element={
                <ProtectedAdminRoute>
                  <LayoutAdminDashboard />
                </ProtectedAdminRoute>
              }
            >
              <Route index element={<Admin />} />
              <Route path='/dashboard/admin/users' element={<AdminUsers />} />
              <Route
                path='/dashboard/admin/users/:id'
                element={<AdminSingleUser />}
              />
              <Route
                path='/dashboard/admin/contact-submissions'
                element={<ContactSubmissions />}
              />
            </Route>
            {/* ================>>>>> Protected Admin Dashboard End  */}
          </Route>
          {/* ================>>>>> Protected Dashboard End  */}
        </Route>
        {/* ================>>>>> Layout End  */}
        {/* ================>>>>> Error Page  */}
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </Router>
  )
}

export default RoutesConfig
