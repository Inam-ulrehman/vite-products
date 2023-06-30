import {
  DashboardOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import Cookies from 'js-cookie'

import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

const items = [
  {
    label: <Link to='/dashboard'>Dashboard</Link>,
    key: 'dashboard',
    icon: <DashboardOutlined />,
  },
  {
    label: 'Products',
    key: 'Products',
    // create antd icon component for product

    icon: <ShoppingCartOutlined />,
    children: [
      {
        label: <Link to='/dashboard/products'>All Products</Link>,
        key: 'products:all-products',
      },
      {
        label: <Link to='/dashboard/products/add'>New Product</Link>,
        key: 'products:add-product',
      },
      {
        label: <Link to='/dashboard/products/sold'>Sold Product</Link>,
        key: 'products:add-product',
      },
    ],
    // disabled: true,
  },
  {
    label: 'Settings',
    key: 'settings',
    icon: <SettingOutlined />,
    children: [
      {
        label: <Link to='/dashboard/settings/profile'>Profile</Link>,
        key: 'settings:profile',
      },
      {
        label: (
          <Link to='/dashboard/settings/contact-details'>Contact Details</Link>
        ),
        key: 'settings:contact-details',
      },
      {
        label: (
          <Link to='/dashboard/settings/change-password'>Change Password</Link>
        ),
        key: 'settings:change-password',
      },
    ],
    // disabled: true,
  },
]
// check if user is admin

if (Cookies.get('role') === 'admin') {
  items.push({
    label: 'Admin',
    key: 'SubMenu',
    icon: <UserOutlined />,
    children: [
      {
        label: <Link to='/dashboard/admin'>Home</Link>,
        key: 'setting:1',
      },
      {
        label: <Link to='/dashboard/admin/users'>Users</Link>,
        key: 'setting:2',
      },
      {
        label: (
          <Link to='/dashboard/admin/contact-submissions'>
            Contact Submissions
          </Link>
        ),
        key: 'setting:3',
      },
    ],
  })
}

items.push({
  label: <Link to='/'>LogOut</Link>,
  key: 'logout',
  icon: <LogoutOutlined />,
  // disabled: true,
})

const MobileMenu = ({ onClose }) => {
  const handleClose = (e) => {
    if (e.key === 'logout') {
      Cookies.remove('token')
      Cookies.remove('role')
      Cookies.remove('name')
    }

    onClose()
  }
  return (
    <Wrapper>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode='inline'
        theme='light'
        items={items}
        onClick={handleClose}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div``
export default MobileMenu
