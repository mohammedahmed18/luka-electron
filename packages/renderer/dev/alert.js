const alertDev = value => {
   if (process.env.NODE_ENV === 'development')
      alert(JSON.stringify(value, null, 2))
}
export default alertDev
