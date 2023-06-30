import { Form, DatePicker } from 'antd'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from 'styled-components'
import { getStateValues } from '../../../../../features/users/userSlice'

const DateOfBirth = () => {
  const { dob } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const handleDateChange = (date, dateString) => {
    dispatch(getStateValues({ name: 'dob', value: dateString }))
  }

  return (
    <Wrapper>
      <Form.Item label='Date Of Birth'>
        <DatePicker
          value={dob ? moment(dob, 'YYYY-MM-DD') : null}
          onChange={handleDateChange}
          size='large'
          picker='date'
          placement='bottomLeft'
        />
      </Form.Item>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .ant-picker {
    width: 100%;
  }
`

export default DateOfBirth
