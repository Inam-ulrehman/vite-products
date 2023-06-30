import { Button, Table, Tooltip } from 'antd'
import { UserOutlined, CrownOutlined, EditOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PaginationComponent from './paginationComponent'
const columns = [
  {
    title: 'Name',
    dataIndex: ['firstName', 'lastName'], // Array of field names
    key: 'firstName',
    ellipsis: true,
    width: 150,

    render: (_, record) => {
      const { firstName, lastName } = record
      const namesParts = [firstName, lastName].filter(Boolean) // Filter out empty values
      const capitalizedParts = namesParts.map(
        (part) => part.charAt(0).toUpperCase() + part.slice(1)
      ) // Capitalize first letter
      const names = capitalizedParts.join(' ')
      return (
        <Tooltip title={names}>
          <a>{names}</a>
        </Tooltip>
      )
    },
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    responsive: ['lg'],
    ellipsis: true,
    width: 150,
    render: (email) => {
      return (
        <Tooltip title={email}>
          <span>{email}</span>
        </Tooltip>
      )
    },
  },
  {
    title: 'Cell Phone',
    dataIndex: 'cellPhone',
    key: 'cellPhone',
    responsive: ['lg'],
    ellipsis: true,
    width: 150,
    render: (mobile) => {
      if (!mobile) return <span>-</span>
      return (
        <Tooltip title={mobile}>
          <span>{mobile}</span>
        </Tooltip>
      )
    },
  },
  {
    title: 'Address',
    dataIndex: ['city', 'country'], // Array of field names
    key: 'address',
    responsive: ['lg'],
    ellipsis: true,
    width: 150,
    render: (_, record) => {
      if (!record?.address) return <span>-</span>
      const { city, country } = record.address
      const addressParts = [city, country].filter(Boolean) // Filter out empty values
      const capitalizedParts = addressParts.map(
        (part) => part.charAt(0).toUpperCase() + part.slice(1)
      ) // Capitalize first letter
      const address = capitalizedParts.join(', ')
      return <Tooltip title={address}>{address}</Tooltip>
    },
  },
  {
    title: 'Role',
    key: 'role',
    dataIndex: 'role',
    align: 'center',
    width: 65,
    render: (role) => {
      const icon =
        role === 'admin' ? (
          <Tooltip title='Admin'>
            <CrownOutlined style={{ color: '#ffcc00' }} />
          </Tooltip>
        ) : (
          <Tooltip title='User'>
            <UserOutlined />
          </Tooltip>
        )
      return icon
    },
  },
  {
    title: 'Status',
    dataIndex: 'active',
    key: 'active',
    align: 'center',
    width: 80,
    render: (_, record) => {
      const { active } = record
      const color = active ? 'green' : 'red'
      const text = active ? 'Active' : 'Inactive'
      return <span style={{ color }}>{text}</span>
    },
  },
  {
    title: 'Loyalty',
    key: 'age',
    dataIndex: 'createdAt',
    align: 'center',
    width: 100,
    responsive: ['lg'],
    render: (createdAt) => {
      const currentDate = new Date()
      const createdDate = new Date(createdAt)
      const ageInMilliseconds = currentDate - createdDate
      const ageInSeconds = Math.floor(ageInMilliseconds / 1000)

      let ageText = ''

      if (ageInSeconds < 60) {
        ageText = `${ageInSeconds} seconds`
      } else if (ageInSeconds < 3600) {
        const ageInMinutes = Math.floor(ageInSeconds / 60)
        ageText = `${ageInMinutes} minutes`
      } else if (ageInSeconds < 86400) {
        const ageInHours = Math.floor(ageInSeconds / 3600)
        ageText = `${ageInHours} hours`
      } else if (ageInSeconds < 2592000) {
        const ageInDays = Math.floor(ageInSeconds / 86400)
        ageText = `${ageInDays} days`
      } else if (ageInSeconds < 31536000) {
        const ageInMonths = Math.floor(ageInSeconds / 2592000)
        ageText = `${ageInMonths} months`
      } else {
        const ageInYears = Math.floor(ageInSeconds / 31536000)
        ageText = `${ageInYears} years`
      }

      return <Tooltip title={createdAt}>{ageText}</Tooltip>
    },
  },
  {
    title: 'Action',
    key: 'action',
    align: 'center',
    width: 80,
    render: (_, record) => (
      <Link to={`/dashboard/admin/users/${record._id}`}>
        <Button type='primary' icon={<EditOutlined />} />
      </Link>
    ),
  },
]

const App = () => {
  const { userList, isLoading } = useSelector((state) => state.adminUsers)

  return (
    <Table
      size='large'
      columns={columns}
      dataSource={userList.map((item) => ({ ...item, key: item._id }))}
      bordered
      showHeader={true}
      sticky={true}
      footer={() => <PaginationComponent />}
      pagination={false}
      loading={isLoading}
    />
  )
}
export default App
