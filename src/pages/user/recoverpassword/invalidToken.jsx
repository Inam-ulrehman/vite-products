import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

const { VITE_APP_BASE_URL } = import.meta.env

const InvalidToken = () => {
  return (
    <Wrapper>
      <div className='div'>
        <h1>Your token is not valid!</h1>
        <Button type='primary'>
          <Link to={`${VITE_APP_BASE_URL}/recover`}>
            Go to recover password
          </Link>
        </Button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  place-content: center;
  text-align: center;
  /* make this h1 look like a card */
  div {
    padding: 20px;
    border-radius: 5px;
    background-color: #f5f5f5;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`
export default InvalidToken
