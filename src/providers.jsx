import { App, ConfigProvider } from 'antd'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import store from '../store'
import { theme } from '../lib/styles/theme'

const Providers = ({ children }) => {
  return (
    <>
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <App>
            <ToastContainer />
            {children}
          </App>
        </ConfigProvider>
      </Provider>
    </>
  )
}

export default Providers
