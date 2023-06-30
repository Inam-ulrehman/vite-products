import {
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { Button, Menu } from 'antd'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const items = [
  {
    label: <Link to='/dashboard'>Dashboard</Link>,
    key: 'dashboard',
    icon: <DashboardOutlined />,
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
const DesktopMenu = () => {
  const [collapsed, setCollapsed] = useState(false)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  const handleClose = (e) => {
    if (e.key === 'logout') {
      Cookies.remove('token')
      Cookies.remove('role')
      Cookies.remove('name')
    }
  }
  return (
    <div style={{ width: collapsed ? 50 : 256 }}>
      <Button
        type='primary'
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        style={{ width: collapsed ? 50 : 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode='inline'
        theme='light'
        inlineCollapsed={collapsed}
        items={items}
        onClick={handleClose}
      />
    </div>
  )
}
export default DesktopMenu
