import { MailOutlined } from '@ant-design/icons'
import { App, Button, Form, Input } from 'antd'
import { styled } from 'styled-components'
import { Typography } from 'antd'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import { customFetch } from '../../../../lib/axios/customFetch'

const initialState = {
  isLoading: false,
}
const Login = () => {
  const [state, setState] = useState(initialState)
  const formRef = useRef(null)
  const { notification } = App.useApp()
  const { Title } = Typography

  const onFinish = async (values) => {
    try {
      setState({ ...state, isLoading: true })
      const response = await customFetch.post('users/recover', values)
      setState({ ...state, isLoading: false })
      notification.success({
        message: response?.data?.message || 'Password reset link sent!',
      })
      // reset form fields
      formRef.current.resetFields()
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
        ref={formRef}
      >
        <Title level={2}> Recover Password </Title>
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
            placeholder='Please enter your email address'
            type='email'
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
export default Login
