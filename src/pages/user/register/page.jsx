import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input } from 'antd'
import Cookies from 'js-cookie'
import { styled } from 'styled-components'
import { Typography } from 'antd'
import { Link } from 'react-router-dom'
import { MailOutlined } from '@ant-design/icons'
import { customFetch } from '../../../../lib/axios/customFetch'
import { App } from 'antd'
import { useState } from 'react'
const initialState = {
  isLoading: false,
}
const Register = () => {
  const [state, setState] = useState(initialState)
  const { Title } = Typography
  const { notification, message } = App.useApp()

  const onFinish = async (values) => {
    try {
      setState({ ...state, isLoading: true })
      const response = await customFetch.post('users', values)
      setState({ ...state, isLoading: false })
      message.success('Registration Successful!')
      const { firstName, role, token } = response.data
      // set cookies
      Cookies.set('token', token, { expires: 7 })
      Cookies.set('name', firstName, { expires: 7 })
      Cookies.set('role', role, { expires: 7 })
      // redirect to home page
      window.location.href = '/dashboard'
    } catch (error) {
      setState({ ...state, isLoading: false })
      notification.error({
        message: error?.response?.data?.message || 'Something went wrong!',
      })
    }
  }
  return (
    <Wrapper>
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Title level={2}>Register</Title>
        <Form.Item
          name='firstName'
          rules={[
            {
              required: true,
              message: 'Please input your Name!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Name'
            size='large'
          />
        </Form.Item>
        <Form.Item
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className='site-form-item-icon' />}
            placeholder='Email'
            type='email'
            size='large'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            { min: 8, message: 'Minimum 8 Characters.' },
            {
              pattern: new RegExp('^(?=.*[a-z])'),
              message: 'Lowercase Letter!',
            },
            {
              pattern: new RegExp('^(?=.*[A-Z])'),
              message: 'Uppercase Letter!',
            },
            {
              pattern: new RegExp('^(?=.*\\d)'),
              message: 'Number!',
            },
            {
              pattern: new RegExp('^(?=.*[!@#$%^&*()_+])'),
              message: 'Special Character!',
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='Password'
            size='large'
          />
        </Form.Item>

        <Form.Item
          name='confirm'
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  'The two passwords that you entered do not match!'
                )
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='Confirm Password'
            size='large'
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Link className='login-form-forgot' to='/recover'>
            Forgot password
          </Link>
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
            loading={state.isLoading}
          >
            Register
          </Button>
          Or <Link to='/'>Login now!</Link>
        </Form.Item>
      </Form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  /* place grid in center */
  display: grid;

  place-items: center;
  max-width: 90vw;
  margin: 0 auto;

  .ant-form {
    width: 100%;
    border: 1px solid #ccc;
    padding: 2rem;
    border-radius: 0.5rem;
  }
  @media (max-width: 768px) {
    margin-top: 6rem;
  }

  @media (min-width: 768px) {
    max-width: 600px;
    min-height: 100vh;
  }
`
export default Register
