import { ipcRenderer } from 'electron'
import { useContext, useReducer, createContext } from 'react'

import AppReducer from '../reducers/AppReducer'
import channels from './../../shared/lib/ipc-channels'

export const AppContext = createContext(null)

const initialState = {
   categories: [],
   authUser: {
      avatar: '/',
      accessToken: null
   }
}

export const AppProvider = ({ children }) => {
   const [state, dispatch] = useReducer(AppReducer, initialState)

   const login = async (username, password) => {
      // await ipcRenderer.invoke(channels.ADD_USER, {
      //    username: 'mody',
      //    password: '123'
      // })

      const res = await ipcRenderer.invoke(channels.LOG_IN, {
         username,
         password
      })
      if (res.error) alert(res.error) //TODO: show toast notification instead of the alert

      dispatch({ type: 'SET_ACCESS_TOKEN', payload: res })
   }
   return (
      <AppContext.Provider value={{ ...state, login }}>
         {children}
      </AppContext.Provider>
   )
}

const useApp = () => useContext(AppContext)
export default useApp
