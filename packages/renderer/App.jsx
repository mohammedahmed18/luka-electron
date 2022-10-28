import { ipcRenderer } from 'electron'
import { useEffect } from 'react'
import Router from './Router'
function App() {
   useEffect(() => {
      // app is ready

      setTimeout(() => {
         ipcRenderer.invoke('ADD_USER', {
            username: 'mody',
            password: '123456',
            name: 'mahmoud'
         })
      }, 1000)
   }, [])

   return (
      <>
         <Router />
      </>
   )
}

export default App
