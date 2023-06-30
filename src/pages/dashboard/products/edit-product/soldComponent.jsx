import { Button, Input, Modal } from 'antd'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  editProductAddOrderThunk,
  getStateValues,
} from '../../../../../features/products/editProductSlice'
const SoldComponent = () => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const { soldPrice, soldQuantity, isUpdatingQuantity, quantity } = useSelector(
    (state) => state.editProduct
  )

  const showModal = () => {
    setOpen(true)
  }
  const handleOk = () => {
    const closeModal = () => {
      setOpen(false)
    }
    dispatch(editProductAddOrderThunk({ closeModal }))
  }
  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    dispatch(getStateValues({ name, value }))
  }
  return (
    <>
      <Button
        type='primary'
        onClick={showModal}
        size='large'
        block
        disabled={quantity === 0 || isUpdatingQuantity}
      >
        Confirm Sold
      </Button>
      <Modal
        title='Title'
        open={open}
        onOk={handleOk}
        confirmLoading={isUpdatingQuantity}
        onCancel={handleCancel}
      >
        <div className='div'>
          <p>Sold Price</p>
          <Input
            type='number'
            name='soldPrice'
            placeholder='Sold Price'
            value={soldPrice}
            onChange={handleChange}
            style={{ marginBottom: '1rem' }}
          />
          <p>Sold Quantity</p>
          <Input
            type='number'
            name='soldQuantity'
            placeholder='Sold Quantity'
            value={soldQuantity}
            onChange={handleChange}
          />
        </div>
      </Modal>
    </>
  )
}
export default SoldComponent
