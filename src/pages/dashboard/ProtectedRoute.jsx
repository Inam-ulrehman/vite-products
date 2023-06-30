import { Navigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
const ProtectedRoute = ({ children }) => {
  const { isMember } = useSelector((state) => state.user)

  if (isMember === false) {
    return <Navigate to={'/'} />
  } else {
    return children
  }
}

export default ProtectedRoute
