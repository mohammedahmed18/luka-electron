import { useEffect } from 'react'
import { LocaleProvider } from './contexts/LocaleContext'
import Router from './Router'
import { AppProvider } from './contexts/AppContext'
import { BrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/main-layout'
function App() {
   useEffect(() => {
      // app is ready
   }, [])

   return (
      <AppProvider>
         <LocaleProvider>
            <BrowserRouter>
               <Router />
            </BrowserRouter>
         </LocaleProvider>
      </AppProvider>
   )
}

export default App
