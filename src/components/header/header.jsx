import { Button, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

const Header = () => {
  const { Title } = Typography

  return (
    <Wrapper>
      <Title level={1}>Header</Title>
      {/* Header home page */}
      <Button type='primary'>Button</Button>
      <Button type='primary'>Button</Button>
      <Link to='/'>Home</Link>
      <Link to='/about'>About</Link>
      <Link to='/dashboard'>Dashboard</Link>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  min-height: 100px;
`
export default Header
