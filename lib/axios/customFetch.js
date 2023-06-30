import axios from 'axios'
import Cookies from 'js-cookie'

const token = Cookies.get('token')

const { VITE_PUBLIC_API } = import.meta.env
const customFetch = axios.create({
  baseURL: `${VITE_PUBLIC_API}/api/v1`,
})
const customFetchLocal = axios.create({
  baseURL: `http://localhost:5000/api/v1`,
})

customFetch.defaults.headers.common['Authorization'] = `Bearer ${token}`
customFetchLocal.defaults.headers.common['Authorization'] = `Bearer ${token}`

export { customFetch, customFetchLocal }
