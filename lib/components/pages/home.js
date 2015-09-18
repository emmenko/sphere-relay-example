import React, { PropTypes } from 'react'
import Relay from 'react-relay'

class Home extends React.Component {

  static propTypes = {
    welcome: PropTypes.string
  }

  render () {
    const { welcome } = this.props
    return (
      <h1>{welcome || 'Welcome to Sangria-Relay example!'}</h1>
    )
  }
}

export default Relay.createContainer(Home, {
  fragments: {
    welcome: () => Relay.QL`
      fragment on Welcome {
        message
      }
    `
  }
})

export const queries = {
  welcome: () => Relay.QL`query { welcome }`
}
