import { GoHome } from 'react-icons/go'
import { HiOutlineCurrencyDollar } from 'react-icons/hi'
import { FiUser } from 'react-icons/fi'
import { IoIosList } from 'react-icons/io'
import { MdOutlineDashboardCustomize } from 'react-icons/md'
import useLocale from '../../contexts/LocaleContext'

import styles from './style.module.css'
import SidebarIcon from '../sidebarIcon'
import { Link } from 'react-router-dom'

const Sidebar = () => {
   const { t } = useLocale()
   return (
      <div className={styles.sidebar}>
         <SidebarIcon Icon={GoHome} label={t('home')} />
         <Link to="Login">
            <SidebarIcon Icon={HiOutlineCurrencyDollar} label={t('sales')} />
         </Link>
         <SidebarIcon Icon={IoIosList} label={t('categories')} />
         <SidebarIcon
            Icon={MdOutlineDashboardCustomize}
            label={t('dashboard')}
         />
         <SidebarIcon Icon={FiUser} label={t('admin')} />
      </div>
   )
}

export default Sidebar
