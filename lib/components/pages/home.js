import React, { PropTypes } from 'react'
import Relay from 'react-relay'

class Home extends React.Component {

  static propTypes = {
    rebels: PropTypes.object
  }

  render () {
    const { rebels } = this.props
    return (
      <pre>
        <code>{JSON.stringify(rebels, null, 2)}</code>
      </pre>
    )
  }
}

export default Relay.createContainer(Home, {
  fragments: {
    rebels: () => Relay.QL`
      fragment on Faction {
        name
        ships(first: 1) {
          edges {
            node {
              name
            }
          }
        }
      }
    `
  }
})

export const queries = {
  rebels: () => Relay.QL`query { rebels }`
}
