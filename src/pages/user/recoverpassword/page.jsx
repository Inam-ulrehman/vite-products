import { LockOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'

import Cookies from 'js-cookie'
import { styled } from 'styled-components'
import { Typography } from 'antd'

import { customFetch } from '../../../../lib/axios/customFetch'
import { App } from 'antd'
import { useEffect, useState } from 'react'
import ApiLoading from '../../../components/singleComponent/apiLoading'
import InvalidToken from './invalidToken'
const initialState = {
  isLoading: false,
  isTokenValid: false,
  tokenLoading: true,
}
const RecoverPassword = () => {
  const [state, setState] = useState(initialState)
  const { Title } = Typography
  const { notification, message } = App.useApp()
  const queryParams = new URLSearchParams(location.search)
  const url_token = queryParams.get('token')

  const onFinish = async (values) => {
    try {
      setState({ ...state, isLoading: true })
      const response = await customFetch.put('users/reset', values, {
        headers: {
          Authorization: `Bearer ${url_token}`,
        },
      })
      setState({ ...state, isLoading: false })
      message.success('Password Changed Successfully!')

      const { name, role, token } = response.data
      // set cookies
      Cookies.set('token', token, { expires: 7 })
      Cookies.set('name', name, { expires: 7 })
      Cookies.set('role', role, { expires: 7 })
      // redirect to home page
      window.location.href = '/dashboard'
    } catch (error) {
      // console.log(error?.response?.data?.message)
      setState({ ...state, isLoading: false, isTokenValid: false })
      notification.error({
        message: error?.response?.data?.message || 'Something went wrong!',
      })
    }
  }

  // check token is valid
  // if valid then show form
  // else show error message

  useEffect(() => {
    const checkToken = async () => {
      try {
        await customFetch.get('authenticateUserToken', {
          headers: {
            Authorization: `Bearer ${url_token}`,
          },
        })

        setState({ ...state, tokenLoading: false, isTokenValid: true })
      } catch (error) {
        setState({ ...state, tokenLoading: false, isTokenValid: false })
      }
    }
    checkToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // loading
  if (state.tokenLoading) {
    return <ApiLoading />
  }
  // if token is not valid

  if (!state.isTokenValid) {
    return <InvalidToken />
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
        <Title level={2}>Change Password</Title>

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
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
            loading={state.isLoading}
          >
            Submit
          </Button>
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
export default RecoverPassword
