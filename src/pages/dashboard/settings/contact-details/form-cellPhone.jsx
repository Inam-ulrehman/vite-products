import { Form } from 'antd'
import { useEffect, useState } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput, { formatPhoneNumberIntl } from 'react-phone-number-input'
import { styled } from 'styled-components'
import { isPossiblePhoneNumber } from 'react-phone-number-input'
import { useDispatch, useSelector } from 'react-redux'
import { getStateValues } from '../../../../../features/users/userSlice'

const CellPhone = () => {
  const { cellPhone } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [error, setError] = useState('')

  // console.log('country', parsePhoneNumber(mobile))
  const handleChange = (e) => {
    if (e !== undefined) {
      const value = e
      dispatch(getStateValues({ name: 'cellPhone', value }))
    }
  }

  useEffect(() => {
    if (cellPhone) {
      if (!isPossiblePhoneNumber(cellPhone)) {
        setError('Invalid phone number')
      } else {
        setError('')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cellPhone])
  return (
    <Wrapper>
      <Form.Item label='Cell Phone'>
        <PhoneInput
          className='mobile-input'
          defaultCountry='CA'
          country='CA'
          placeholder='555-123-4567'
          value={formatPhoneNumberIntl(cellPhone)}
          onChange={handleChange}
        />
        {error && <p style={{ color: 'red', margin: '0px' }}>{error}</p>}
      </Form.Item>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .mobile-input {
    width: 100%;
    height: 40px;
    padding: 0 11px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 8px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    font-size: 16px;
    // create hover color like antd input
    &:hover {
      border-color: #80bdff;
    }
  }
  input {
    border: none;
    // on focus remove outline
    &:focus {
      outline: none;
    }
  }
`
export default CellPhone
