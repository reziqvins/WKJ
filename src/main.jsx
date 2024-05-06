import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './Context/AuthContext.jsx'
import { ChatContextProvider } from './Context/ChatContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChatContextProvider>
      <App />
        </ChatContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
