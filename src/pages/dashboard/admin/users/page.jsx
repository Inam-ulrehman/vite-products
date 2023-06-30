import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminGetAllUsersThunk } from '../../../../../features/users/adminUserSlice'
import TableComponent from './tableComponent'
import SearchComponent from './searchComponent'
import SortComponent from './sortComponent'
import { styled } from 'styled-components'
import DataIndex from './dataIndex'

const AdminUsers = () => {
  const dispatch = useDispatch()
  const { search, limit, page, sort } = useSelector((state) => state.adminUsers)
  useEffect(() => {
    document.title = 'Admin Users'
    dispatch(adminGetAllUsersThunk())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, limit, page, sort])
  return (
    <Wrapper>
      <div className='search-sort'>
        <SearchComponent />
        <SortComponent />
        <DataIndex />
      </div>
      <TableComponent />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .search-sort {
    display: flex;
  }
`
export default AdminUsers
