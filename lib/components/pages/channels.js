import React, { PropTypes } from 'react'
import Relay from 'react-relay'
import { Link } from 'react-router'

class Channels extends React.Component {

  static propTypes = {
    channels: PropTypes.object
  }

  render () {
    const { channels: { results } } = this.props
    return (
      <ul>
        {results.map(ch => {
          return (
            <li key={ch.id}>
              <Link to={`/channel/${ch.id}`}>{ch.key}</Link>
            </li>
          )
        })}
      </ul>
    )
  }
}

export default Relay.createContainer(Channels, {
  fragments: {
    channels: () => Relay.QL`
      fragment on ChannelQueryResult {
        results {
          id, key
        }
      }
    `
  }
})

export const queries = {
  channels: () => Relay.QL`query { channels }`
}
