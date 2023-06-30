import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { singleProductThunk } from '../../../../../features/products/editProductSlice'

const EditProduct = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(singleProductThunk(id)) // <== Here
  }, [id])
  return (
    <div>
      <h1>Id: {id}</h1>
    </div>
  )
}

export default EditProduct
