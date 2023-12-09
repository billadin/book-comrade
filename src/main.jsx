import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router'
import '@smastrom/react-rating/style.css'
import AuthProvider from './provider/AuthProvider'
import { SnackbarProvider } from 'notistack'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient =  new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <div>
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <SnackbarProvider>
    <RouterProvider router={router}/>
    </SnackbarProvider>
    </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  </div>
)
