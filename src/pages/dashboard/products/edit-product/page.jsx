import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  editProductThunk,
  getStateValues,
  singleProductThunk,
} from '../../../../../features/products/editProductSlice'
import { styled } from 'styled-components'
import { Button, Form, Input } from 'antd'
import ApiLoading from '../../../../components/singleComponent/apiLoading'
import SoldComponent from './soldComponent'

const EditProduct = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const {
    isLoading,
    isUpdating,
    _id,
    createdAt,
    name,
    description,
    price,
    purchasePrice,
    quantity,
    category,
    storagePoint,
    isAvailable,
    revalidate,
  } = useSelector((state) => state.editProduct) // <== Here

  const onFinish = async (values) => {}

  const handleUpdate = async () => {
    dispatch(editProductThunk())
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    dispatch(getStateValues({ name, value }))
  }

  useEffect(() => {
    dispatch(singleProductThunk(id)) // <== Here
  }, [id, revalidate])
  if (isLoading) return <ApiLoading />
  return (
    <Wrapper>
      <Form
        name='normal_login'
        className='login-form'
        onFinish={onFinish}
        initialValues={{
          name,
          description,
          price,
          purchasePrice,
          quantity,
          category,
          storagePoint,
          isAvailable,
        }}
      >
        <h1>Product</h1>
        {/* name  */}
        <Form.Item
          label='Name'
          rules={[
            {
              required: true,
              message: 'Please input product name!',
            },
            { min: 6, message: 'Name must be at least 6 characters.' },
          ]}
          hasFeedback
        >
          <Input
            name='name'
            placeholder='Baby Toy'
            size='large'
            value={name}
            onChange={handleChange}
          />
        </Form.Item>
        {/* category  */}
        <Form.Item
          label='Category'
          rules={[
            {
              required: true,
              message: 'Please input product category!',
            },
          ]}
          hasFeedback
        >
          <Input
            placeholder='Toys'
            size='large'
            name='category'
            value={category}
            onChange={handleChange}
          />
        </Form.Item>
        {/* price  */}
        <Form.Item
          label='Selling Price'
          rules={[
            {
              required: true,
              message: 'Please input product price!',
            },
          ]}
          hasFeedback
        >
          <Input
            placeholder='20'
            size='large'
            type='number'
            name='price'
            value={price}
            onChange={handleChange}
          />
        </Form.Item>
        {/* purchasePrice  */}
        <Form.Item
          label='Purchase Price'
          rules={[
            {
              required: true,
              message: 'Please input product purchasePrice!',
            },
          ]}
          hasFeedback
        >
          <Input
            placeholder='10'
            size='large'
            type='number'
            name='purchasePrice'
            value={purchasePrice}
            onChange={handleChange}
          />
        </Form.Item>
        {/* quantity  */}
        <Form.Item
          label='quantity'
          name='quantity'
          rules={[
            {
              required: true,
              message: 'Please input product quantity!',
            },
          ]}
          hasFeedback
        >
          <Input
            placeholder='Product quantity'
            size='large'
            type='number'
            name='quantity'
            value={quantity}
            onChange={handleChange}
          />
        </Form.Item>
        {/* storagePoint  */}
        <Form.Item
          label='Storage Location'
          rules={[
            {
              required: true,
              message: 'Please input product storagePoint!',
            },
          ]}
          hasFeedback
        >
          <Input
            placeholder='Point A'
            size='large'
            name='storagePoint'
            value={storagePoint}
            onChange={handleChange}
          />
        </Form.Item>

        {/* Description  */}
        <Form.Item
          label='Description'
          rules={[
            {
              required: true,
              message: 'Please input product description!',
            },
            { min: 6, message: 'description must be at least 6 characters.' },
          ]}
          hasFeedback
        >
          <Input.TextArea
            placeholder='Product description'
            size='large'
            autoSize={{ minRows: 4, maxRows: 8 }}
            name='description'
            value={description}
            onChange={handleChange}
          />
        </Form.Item>

        {/* button */}
        <div className='buttons'>
          <Form.Item>
            <Button
              onClick={handleUpdate}
              className='update'
              type='primary'
              htmlType='submit'
              size='large'
              loading={isUpdating}
            >
              Update
            </Button>
          </Form.Item>
          <Form.Item>
            <SoldComponent />
          </Form.Item>
        </div>
      </Form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .ant-form {
    width: 100%;
    border: 1px solid #ccc;
    padding: 2rem;
    border-radius: 0.5rem;
  }

  label {
    width: 140px;
  }
  .buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  /* Mobile */
  @media (max-width: 580px) {
    .ant-form-item {
      margin-bottom: 0;
    }
    .update {
      width: 100%;
      margin-top: 1rem;
    }
  }
  @media (max-width: 768px) {
    padding: 1rem;
    .update {
      width: 100%;
    }
  }
  /* Desktop & ipad & laptop */
  @media (min-width: 768px) {
    input,
    .ant-input-password,
    .ant-select,
    .mobile-input,
    .ant-picker {
      max-width: 400px;
    }

    .ant-form {
      max-width: 600px;
      margin: 2rem auto;
    }
  }
`

export default EditProduct
