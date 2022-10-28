import styles from './sidebarIcon.module.css'
const SidebarIcon = ({ Icon, label, link }) => {
   return (
      <>
         <div className={styles.sidebar_icon + ' group'}>
            <Icon size="30" />
            <span className={styles.sidebar_tooltip + ' group-hover:scale-100'}>
               {label}
            </span>
         </div>

         <div className={styles.sidebar_hr}></div>
      </>
   )
}

export default SidebarIcon
