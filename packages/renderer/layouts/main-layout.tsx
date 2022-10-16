import React from 'react'
import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'

type props = {
   children: React.ReactNode
}

const MainLayout = ({ children }: props) => {
   return (
      <div className="h-screen flex w-full">
         <Sidebar />
         <div className="flex flex-col w-full">
            <Navbar />
            <div className="flex-1 overflow-y-auto p-7 bg-gray-800">
               {children}
            </div>
         </div>
      </div>
   )
}

export default MainLayout
