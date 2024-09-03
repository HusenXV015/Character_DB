import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "toastify-js/src/toastify.css"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from "react-redux";
import { store } from './app/Store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <GoogleOAuthProvider clientId="635959090114-fqa24kd73k2vbdnt134qq3g1ohuspkm0.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>,
)
