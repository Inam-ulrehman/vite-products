import { DownOutlined } from '@ant-design/icons'
import { Button, Dropdown, Space, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getStateValues } from '../../../../../features/users/adminUserSlice'

const SortComponent = () => {
  const dispatch = useDispatch()
  const { sort } = useSelector((state) => state.adminUsers)
  const handleMenuClick = (e) => {
    dispatch(getStateValues({ name: 'page', value: 1 }))
    if (e.key === 'name') {
      dispatch(getStateValues({ name: 'sort', value: 'name' }))
    } else if (e.key === '-name') {
      dispatch(getStateValues({ name: 'sort', value: '-name' }))
    } else if (e.key === 'createdAt') {
      dispatch(getStateValues({ name: 'sort', value: 'createdAt' }))
    } else if (e.key === '-createdAt') {
      dispatch(getStateValues({ name: 'sort', value: '-createdAt' }))
    } else if (e.key === 'active') {
      dispatch(getStateValues({ name: 'sort', value: 'active' }))
    } else if (e.key === '-active') {
      dispatch(getStateValues({ name: 'sort', value: '-active' }))
    } else {
      message.error('Something went wrong')
    }
  }

  const sortOptions = [
    { label: 'Name (A-Z)', key: 'name' },
    { label: 'Name (Z-A)', key: '-name' },
    { label: 'Date (Oldest First)', key: 'createdAt' },
    { label: 'Date (Newest First)', key: '-createdAt' },
    { label: 'User Status (Active)', key: '-active' },
    { label: 'User Status (Not Active)', key: 'active' },
  ]

  const sortedOptions = [...sortOptions].map((option) => {
    let label = option.label
    if (option.key === sort) {
      label = <strong>{label}</strong>
    }
    return {
      ...option,
      label,
    }
  })

  const menuProps = {
    items: sortedOptions,
    onClick: handleMenuClick,
  }

  return (
    <Space wrap>
      <Dropdown menu={menuProps}>
        <Button size='large'>
          <Space>
            Sort By
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </Space>
  )
}

export default SortComponent
