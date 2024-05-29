import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './Context/AuthContext.jsx'
import { ChatContextProvider } from './Context/ChatContext.jsx'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import cartReducer, { getTotals } from "./Redux/CartSlice.jsx";
const store =configureStore({
  reducer:{
    cart : cartReducer,
  },
})
store.dispatch(getTotals());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChatContextProvider>
        <Provider store={store}>
      <App />
      </Provider>
        </ChatContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
