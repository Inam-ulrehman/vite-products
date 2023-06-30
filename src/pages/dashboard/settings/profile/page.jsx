import { Button, Form, Input } from 'antd'
import { styled } from 'styled-components'
import Gender from './form-gender'
import DateOfBirth from './form-dob'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getStateValues,
  userProfileThunk,
  userProfileUpdateThunk,
} from '../../../../../features/users/userSlice'
import ApiLoading from '../../../../components/singleComponent/apiLoading'

const Profile = () => {
  const { firstName, lastName, dob, gender, isLoading, isUpdating } =
    useSelector((state) => state.user)

  const dispatch = useDispatch()

  const onFinish = async () => {
    const updatedProfile = {}

    if (firstName) {
      updatedProfile.firstName = firstName
    }
    if (lastName) {
      updatedProfile.lastName = lastName
    }
    if (dob) {
      updatedProfile.dob = dob
    }
    if (gender) {
      updatedProfile.gender = gender
    }

    dispatch(userProfileUpdateThunk(updatedProfile))
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValues({ name, value }))
  }

  // get data from server and set it to state
  useEffect(() => {
    dispatch(userProfileThunk())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) return <ApiLoading />
  return (
    <Wrapper>
      <Form
        name='basic'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        initialValues={{ firstName, lastName, gender, dob }}
      >
        <h1>Profile</h1>

        {/* name */}
        <Form.Item
          label='Name'
          name='firstName'
          // how to add initial value to form item

          rules={[
            {
              required: true,
              message: 'Please input your Name!',
            },
          ]}
        >
          <Input
            name='firstName'
            size='large'
            value={firstName}
            onChange={handleChange}
          />
        </Form.Item>
        {/* lastName */}
        <Form.Item label='Last Name' name='lastName'>
          <Input
            size='large'
            name='lastName'
            value={lastName}
            onChange={handleChange}
          />
        </Form.Item>

        {/* Date Of Birth */}
        <DateOfBirth />

        {/* Gender */}
        <Gender />

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
  min-height: 150vh;
  .ant-form {
    width: 100%;
    border: 1px solid #ccc;
    padding: 2rem;
    border-radius: 0.5rem;
  }
  label {
    width: 110px;
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

export default Profile
