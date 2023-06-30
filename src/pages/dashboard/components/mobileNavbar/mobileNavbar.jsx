import { MenuOutlined } from '@ant-design/icons'
import { Button, Drawer } from 'antd'
import { useState } from 'react'
import MobileMenu from './mobileMenu'
import { styled } from 'styled-components'
const MobileNavbar = () => {
  const [open, setOpen] = useState(false)
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  return (
    <Wrapper>
      <Button
        type='primary'
        onClick={showDrawer}
        icon={<MenuOutlined />}
        size='large'
      >
        Menu
      </Button>
      <Drawer
        title='Basic Drawer'
        placement='left'
        onClose={onClose}
        open={open}
        bodyStyle={{ padding: '0px' }}
      >
        <MobileMenu onClose={onClose} />
      </Drawer>
    </Wrapper>
  )
}

const Wrapper = styled.div``
export default MobileNavbar
