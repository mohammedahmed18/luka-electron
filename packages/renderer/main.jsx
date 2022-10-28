import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import MainLayout from './layouts/main-layout'
import { LocaleProvider } from './contexts/LocaleContext'

import './index.css'
// import the translation
import './locale/i18n'

ReactDOM.createRoot(document.getElementById('root')).render(
   // <React.StrictMode>
   <LocaleProvider>
      <MainLayout>
         <App />
      </MainLayout>
   </LocaleProvider>
   // </React.StrictMode>
)
