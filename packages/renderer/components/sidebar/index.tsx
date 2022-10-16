import { GoHome } from 'react-icons/go'
import { HiOutlineCurrencyDollar } from 'react-icons/hi'
import { FiUser } from 'react-icons/fi'
import { IoIosList } from 'react-icons/io'
import { MdOutlineDashboardCustomize } from 'react-icons/md'

import styles from './style.module.css'

const Sidebar = () => {
   return (
      <div
         className=" top-0 left-0 h-screen w-20 m-0
     flex flex-col
     bg-gray-900 text-white shadow-lg "
      >
         <div className={styles.sidebar_icon + ' group'}>
            <GoHome size="30" />
            <span className={styles.sidebar_tooltip}>Home</span>
         </div>
         <hr className={styles.sidebar_hr}></hr>
         <div className={styles.sidebar_icon + ' group'}>
            <HiOutlineCurrencyDollar size="30" />
            <span className={styles.sidebar_tooltip + ' group-hover:scale-100'}>
               Sales
            </span>
         </div>
         <div className={styles.sidebar_icon + ' group'}>
            <IoIosList size="30" />
            <span className={styles.sidebar_tooltip + ' group-hover:scale-100'}>
               Categories
            </span>
         </div>
         <div className={styles.sidebar_icon + ' group'}>
            <MdOutlineDashboardCustomize size="30" />
            <span className={styles.sidebar_tooltip + ' group-hover:scale-100'}>
               Dashboard
            </span>
         </div>
         <hr className={styles.sidebar_hr}></hr>
         <div className={styles.sidebar_icon + ' group'}>
            <FiUser size="30" />
            <span className={styles.sidebar_tooltip + ' group-hover:scale-100'}>
               Admin
            </span>
         </div>
      </div>
   )
}

export default Sidebar
