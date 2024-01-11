import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './routes/Route.jsx'
import TaskProvider from './provider/TaskProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='max-w-[1400px] mx-auto'>
      <TaskProvider>
        <RouterProvider router={router}></RouterProvider>
      </TaskProvider>
    </div>
  </React.StrictMode>,
)
