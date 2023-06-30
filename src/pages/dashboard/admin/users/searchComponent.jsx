import { Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from 'styled-components'
import { getStateValues } from '../../../../../features/users/adminUserSlice'
const SearchComponent = () => {
  const { search, isLoading } = useSelector((state) => state.adminUsers)
  const dispatch = useDispatch()
  const { Search } = Input
  const handleChange = (e) => {
    dispatch(getStateValues({ name: 'search', value: e.target.value }))
    dispatch(getStateValues({ name: 'page', value: 1 }))
    dispatch(getStateValues({ name: 'limit', value: 10 }))
  }

  return (
    <Wrapper>
      <Search
        placeholder='Search users'
        size='large'
        name='search'
        enterButton
        onChange={handleChange}
        value={search}
        loading={isLoading}
        allowClear
        style={{
          width: 304,
        }}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div``
export default SearchComponent
