import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/store.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom'
import LoaderScreen from './components/LoaderScreen.jsx'

import './App.scss'
import App from './App.jsx'
import { useGetProfileQuery } from './features/api/authApi.js'


const CustomLoader = ({ children }) => {

  const { isLoading } = useGetProfileQuery()
  return (
    <>
      {
        isLoading ? <LoaderScreen /> : <>{children}</>
      }
    </>
  )
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <CustomLoader>
        <BrowserRouter>
          <App />
          <ToastContainer />
        </BrowserRouter>
      </CustomLoader>
    </Provider>
  </StrictMode>,
)
