import { Button, Table, Tooltip } from 'antd'
import { UserOutlined, CrownOutlined, EditOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PaginationComponent from './paginationComponent'
const columns = [
  {
    title: 'Name',
    dataIndex: 'name', // Array of field names
    key: 'name',
    ellipsis: true,
    width: 150,
    render: (_, record) => (
      <Link to={`/dashboard/products/edit/${record._id}`}>{record.name}</Link>
    ),
  },
  {
    title: 'Location',
    dataIndex: 'storagePoint',
    key: 'storagePoint',
    ellipsis: true,
    width: 150,
    render: (storagePoint) => {
      return (
        <Tooltip title={storagePoint}>
          <span>{storagePoint}</span>
        </Tooltip>
      )
    },
  },
  {
    title: 'Total',
    dataIndex: 'quantity', // Array of field names
    key: 'quantity',
    ellipsis: true,
    width: 70,
    render: (_, record) => (
      // show backgroun color based on quantity
      <span
        style={{
          backgroundColor:
            record.quantity > 1
              ? '#52c41a'
              : record.quantity === 0
              ? '#f5222d'
              : '#faad14',
          color: '#fff',
          padding: '5px 10px',
          borderRadius: '5px',
        }}
      >
        {record.quantity}
      </span>
    ),
  },

  {
    title: 'Time',
    key: 'age',
    dataIndex: 'createdAt',
    align: 'center',
    width: 100,
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
]

const App = () => {
  const { userList, isLoading } = useSelector((state) => state.products)

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
