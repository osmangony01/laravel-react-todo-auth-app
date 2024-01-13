import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './routes/Route.jsx'
import AuthProvider from './provider/AuthProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='max-w-[1400px] mx-auto'>
      <AuthProvider>
          <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </div>
  </React.StrictMode>,
)
