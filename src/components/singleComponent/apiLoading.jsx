import { Spin } from 'antd'

import styled from 'styled-components'

const ApiLoading = () => {
  return (
    <Wrapper className='loading-component'>
      <Spin tip='Loading' size='large'>
        <div className='content' />
      </Spin>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .content {
    padding: 50px;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    min-height: 100vh;
  }
`

export default ApiLoading
