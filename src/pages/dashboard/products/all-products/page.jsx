import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TableComponent from './tableComponent'
import SearchComponent from './searchComponent'
import SortComponent from './sortComponent'
import { styled } from 'styled-components'
import DataIndex from './dataIndex'
import { allProductsThunk } from '../../../../../features/products/productsSlice'

const Products = () => {
  const dispatch = useDispatch()
  const { search, limit, page, sort } = useSelector((state) => state.products)
  useEffect(() => {
    document.title = 'Admin Users'
    dispatch(allProductsThunk())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, limit, page, sort])
  return (
    <Wrapper>
      <div className='search-sort'>
        <SearchComponent />
        <SortComponent />
      </div>
      <DataIndex />
      <TableComponent />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .search-sort {
    display: flex;
  }
`
export default Products
