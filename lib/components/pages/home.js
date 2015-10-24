import React, { PropTypes } from 'react'
import Relay from 'react-relay'

class Home extends React.Component {

  static propTypes = {
    channels: PropTypes.object
  }

  render () {
    const { channels } = this.props
    return (
      <pre>
        <code>{JSON.stringify(channels, null, 2)}</code>
      </pre>
    )
  }
}

export default Relay.createContainer(Home, {
  fragments: {
    channels: () => Relay.QL`
      fragment on ChannelQueryResult {
        results {
          id, key, roles
        }
      }
    `
  }
})

export const queries = {
  channels: () => Relay.QL`query { channels }`
}
