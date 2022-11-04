import React from 'react'
import alertDev from './dev/alert'

class ErrorBoundary extends React.Component {
   constructor(props) {
      super(props)
      this.state = { hasError: false }
   }

   componentDidCatch(err) {
      // RIP
      alertDev(err)
      this.setState({ hasError: true })
   }

   render() {
      if (this.state.hasError) {
         return <h1>Something wrong just happened</h1>
      }

      return this.props.children
   }
}

export default ErrorBoundary
