import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { store } from './rtk/Store.jsx'
import { Provider } from 'react-redux'
import { StrictMode } from 'react'
import App from './App.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
) 
