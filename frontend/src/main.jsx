import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/AuthProvider.jsx'
import {store} from './redux/store.js'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
        <div className="dark:bg-slate-900 dark:text-white">
          <App />
        </div>
      </AuthProvider>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
