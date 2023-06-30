import { Pagination } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getStateValues } from '../../../../../features/products/productsSlice'

const PaginationComponent = () => {
  const { page, totalSearchCount, limit } = useSelector(
    (state) => state.products
  )
  const dispatch = useDispatch()
  const onShowSizeChange = (current, pageSize) => {
    dispatch(getStateValues({ name: 'limit', value: pageSize }))
  }
  const onChange = (page, pageSize) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    dispatch(getStateValues({ name: 'page', value: page }))
  }
  return (
    <div>
      <Pagination
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        onChange={onChange}
        current={page}
        total={totalSearchCount}
        pageSize={limit}
      />
    </div>
  )
}

export default PaginationComponent
