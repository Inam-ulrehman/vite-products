import { Button } from 'antd'
import { UserOutlined, FileSearchOutlined } from '@ant-design/icons'

import { useSelector } from 'react-redux'
import { styled } from 'styled-components'

const DataIndex = () => {
  const { totalData, page, totalCount, search } = useSelector(
    (state) => state.adminUsers
  )
  return (
    <Wrapper>
      <Button size='large' icon={<UserOutlined />}>
        Total Users:
        <span className='span'>{totalData}</span>
      </Button>

      <Button size='large' icon={<FileSearchOutlined />}>
        Page: <span className='span'>{page}</span>
      </Button>

      {search && (
        <Button size='large' icon={<FileSearchOutlined />}>
          Search Results: <span className='span'>{totalCount}</span>
        </Button>
      )}
    </Wrapper>
  )
}
const Wrapper = styled.section`
  // hide on ipad and smaller
  @media (max-width: 992px) {
    display: none;
  }
  button {
    color: var(--gray-7);
    cursor: default;
    &:hover {
      background: none !important;
      border-color: var(--gray-5) !important;
      color: var(--gray-7) !important;
    }
  }
  .span {
    margin-left: 5px;
    color: var(--gray-9);
  }
`
export default DataIndex
