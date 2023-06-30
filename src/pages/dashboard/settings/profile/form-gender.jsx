import { Form, Select } from 'antd'
import { capitalizeFirstLetter } from '../../../../../lib/helper'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStateValues } from '../../../../../features/users/userSlice'

const Gender = () => {
  const { gender } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const genderOptions = ['male', 'female', 'other']
  const [selectedGender, setSelectedGender] = useState('')

  const handleGenderChange = (value) => {
    setSelectedGender(value)
    dispatch(getStateValues({ name: 'gender', value }))
  }

  return (
    <div>
      <Form.Item label='Gender'>
        <Select
          placeholder='Select gender'
          onChange={handleGenderChange}
          value={gender || selectedGender}
          size='large'
        >
          {genderOptions.map((option) => (
            <Select.Option key={option} value={option}>
              {capitalizeFirstLetter(option)}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  )
}

export default Gender
