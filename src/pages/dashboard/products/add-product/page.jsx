import styled from 'styled-components'

import { Button, Form, Input } from 'antd'

import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { addProductThunk } from '../../../../../features/products/addProductSlice'

const AddProduct = () => {
  const formRef = useRef()
  const { isLoading } = useSelector((state) => state.addProduct)
  const dispatch = useDispatch()
  const onFinish = async (values) => {
    const clearForm = () => formRef.current.resetFields() // clear form
    dispatch(addProductThunk({ values, clearForm }))
  }
  return (
    <Wrapper>
      <Form
        ref={formRef}
        name='normal_login'
        className='login-form'
        onFinish={onFinish}
        initialValues={{ quantity: 1 }}
      >
        <h1>Upload Product</h1>
        {/* name  */}
        <Form.Item
          label='Name'
          name='name'
          rules={[
            {
              required: true,
              message: 'Please input product name!',
            },
            { min: 6, message: 'Name must be at least 6 characters.' },
          ]}
          hasFeedback
        >
          <Input placeholder='Baby Toy' size='large' />
        </Form.Item>
        {/* category  */}
        <Form.Item
          label='Category'
          name='category'
          rules={[
            {
              required: true,
              message: 'Please input product category!',
            },
          ]}
          hasFeedback
        >
          <Input placeholder='Toys' size='large' />
        </Form.Item>
        {/* price  */}
        <Form.Item
          label='Selling Price'
          name='price'
          rules={[
            {
              required: true,
              message: 'Please input product price!',
            },
          ]}
          hasFeedback
        >
          <Input placeholder='20' size='large' type='number' />
        </Form.Item>
        {/* purchasePrice  */}
        <Form.Item
          label='Purchase Price'
          name='purchasePrice'
          rules={[
            {
              required: true,
              message: 'Please input product purchasePrice!',
            },
          ]}
          hasFeedback
        >
          <Input placeholder='10' size='large' type='number' />
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
          <Input placeholder='Product quantity' size='large' type='number' />
        </Form.Item>
        {/* storagePoint  */}
        <Form.Item
          label='Storage Location'
          name='storagePoint'
          rules={[
            {
              required: true,
              message: 'Please input product storagePoint!',
            },
          ]}
          hasFeedback
        >
          <Input placeholder='Point A' size='large' />
        </Form.Item>

        {/* Description  */}
        <Form.Item
          label='Description'
          name='description'
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
          />
        </Form.Item>

        {/* button */}
        <Form.Item>
          <Button
            className='update'
            type='primary'
            htmlType='submit'
            size='large'
            loading={isLoading}
          >
            Add
          </Button>
        </Form.Item>
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
export default AddProduct
