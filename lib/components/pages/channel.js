import React, { PropTypes } from 'react'
import Relay from 'react-relay'

class Channel extends React.Component {

  static propTypes = {
    channel: PropTypes.object
  }

  render () {
    const { channel } = this.props
    return (
      <div>
        <h1>Key: {channel.key}</h1>
        <small>{channel.createdAt}</small>
      </div>
    )
  }
}

export default Relay.createContainer(Channel, {
  fragments: {
    channel: () => Relay.QL`
      fragment on Channel {
        createdAt, key
      }
    `
  }
})

export const queries = {
  channel: () => Relay.QL`query { channel(id: $id) }`
}
