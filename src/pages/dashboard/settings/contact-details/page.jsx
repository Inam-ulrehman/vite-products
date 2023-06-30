import { Button, Form, Input } from 'antd'
import { styled } from 'styled-components'
import { useEffect } from 'react'
import GooglePlacesHook from './googlePlacesHook'
import { useDispatch, useSelector } from 'react-redux'
import {
  getStateValues,
  userProfileThunk,
  userProfileUpdateThunk,
} from '../../../../../features/users/userSlice'
import getPostalCodeCoordinates from './getPostalCodeCoordinates'

import ApiLoading from '../../../../components/singleComponent/apiLoading'
import CellPhone from './form-cellPhone'

const ContactDetails = () => {
  const { email, cellPhone, homePhone, address, isLoading, isUpdating } =
    useSelector((state) => state.user)

  const {
    apartment,
    house,
    street,
    city,
    region,
    province,
    country,
    postalCode,
  } = address

  const dispatch = useDispatch()

  const onFinish = async () => {
    const updatedProfile = {}

    if (email) {
      updatedProfile.email = email
    }
    if (cellPhone) {
      updatedProfile.cellPhone = cellPhone
    }
    if (homePhone) {
      updatedProfile.homePhone = homePhone
    }

    if (postalCode) {
      const data = await getPostalCodeCoordinates(postalCode)
      updatedProfile.location = data
    }
    if (address) {
      updatedProfile.address = address
    }

    dispatch(userProfileUpdateThunk(updatedProfile))
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    if (name === 'email' || name === 'cellPhone' || name === 'homePhone') {
      dispatch(getStateValues({ name, value }))
    } else {
      dispatch(
        getStateValues({
          name: 'address',
          value: { ...address, [name]: value },
        })
      )
    }
  }

  // get data from server and set it to state
  useEffect(() => {
    dispatch(userProfileThunk())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    form.setFieldsValue({ email }) // Update the email field value in the form
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email])
  const [form] = Form.useForm()
  if (isLoading) return <ApiLoading />
  return (
    <Wrapper>
      <Form
        form={form}
        name='basic'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        initialValues={{
          email,
          cellPhone,
          apartment,
          house,
          street,
          city,
          region,
          province,
          country,
          postalCode,
        }}
      >
        <h1>Contact Details</h1>
        {/* email */}
        <div>
          <Form.Item
            label='Email'
            name='email'
            rules={[
              { required: true, message: 'Email is required' },
              { type: 'email', message: 'Invalid email address' },
            ]}
          >
            <Input
              size='large'
              type='email'
              value={email}
              name='email'
              className='input-email'
              onChange={handleChange}
            />
          </Form.Item>
        </div>
        {/* cellPhone */}
        <CellPhone />

        {/* Search Address */}
        <div>
          <Form.Item label='Type Address'>
            <GooglePlacesHook />
          </Form.Item>
        </div>
        {/* apartment */}
        <div>
          <Form.Item label='Apartment'>
            <Input
              size='large'
              type='text'
              value={apartment}
              name='apartment'
              onChange={handleChange}
            />
          </Form.Item>
        </div>
        {/* house */}
        <div>
          <Form.Item label='House'>
            <Input
              size='large'
              type='text'
              value={house}
              name='house'
              onChange={handleChange}
            />
          </Form.Item>
        </div>
        {/* street */}
        <div>
          <Form.Item label='Street'>
            <Input
              size='large'
              type='text'
              value={street}
              name='street'
              onChange={handleChange}
            />
          </Form.Item>
        </div>
        {/* city */}
        <div>
          <Form.Item label='City'>
            <Input
              size='large'
              type='text'
              value={city}
              name='city'
              onChange={handleChange}
            />
          </Form.Item>
        </div>
        {/* region */}
        <div>
          <Form.Item label='Region'>
            <Input
              size='large'
              type='text'
              value={region}
              name='region'
              onChange={handleChange}
            />
          </Form.Item>
        </div>
        {/* province */}
        <div>
          <Form.Item label='Province'>
            <Input
              size='large'
              type='text'
              value={province}
              name='province'
              onChange={handleChange}
            />
          </Form.Item>
        </div>
        {/* country */}
        <div>
          <Form.Item label='Country'>
            <Input
              size='large'
              type='text'
              value={country}
              name='country'
              onChange={handleChange}
            />
          </Form.Item>
        </div>
        {/* postalCode */}
        <div>
          <Form.Item label='Postal Code'>
            <Input
              size='large'
              type='text'
              value={postalCode}
              name='postalCode'
              className='postalCode'
              onChange={handleChange}
            />
          </Form.Item>
        </div>

        {/* update */}
        <Form.Item>
          <Button
            className='update'
            type='primary'
            htmlType='submit'
            size='large'
            loading={isUpdating}
          >
            Update
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
    width: 110px;
  }
  input {
    // first letter capital
    text-transform: capitalize;
  }
  .postalCode,
  .input-email {
    text-transform: uppercase;
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

export default ContactDetails
