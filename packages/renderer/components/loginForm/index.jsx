import styles from './LoginForm.module.css'
import useApp from './../../contexts/AppContext'
import { useRef } from 'react'
const LoginForm = () => {
   const { login } = useApp()
   const username = useRef()
   const password = useRef()

   const handleSubmit = e => {
      e.preventDefault()
      // TODO: add validation for username and password
      login(username.current.value, password.current.value)
   }
   return (
      <div className={styles.container}>
         <form className="max-w-sm w-full mx-auto bg-gray-600 p-8 px-8 rounded-lg">
            <h2 className="text-4xl dark:text-white font-bold text-center">
               Sign IN
            </h2>
            <div>
               <label className="flex flex-col text-gray-300 py-2">
                  Username
               </label>
               <input
                  ref={username}
                  className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full text-white"
                  type="text"
               />
            </div>
            <div>
               <label className="flex flex-col text-gray-300 py-2">
                  Password
               </label>
               <input
                  ref={password}
                  className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full text-white"
                  type="password"
               />
            </div>
            <button
               onClick={handleSubmit}
               className="w-full my-5 py-5 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-400/70 text-white font-semibold rounded-2xl duration-500 "
            >
               Sign In
            </button>
         </form>
      </div>
   )
}

export default LoginForm
