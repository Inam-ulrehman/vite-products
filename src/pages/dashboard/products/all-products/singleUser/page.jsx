import { useParams } from 'react-router-dom'

const AdminSingleUser = () => {
  const { id } = useParams()
  console.log(id)
  return (
    <div>
      SingleUser Id
      <h1>{id}</h1>
    </div>
  )
}

export default AdminSingleUser
