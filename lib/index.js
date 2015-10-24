import React from 'react'
import ReactDOM from 'react-dom'
import Relay from 'react-relay'
import { IndexRoute, Router, Route } from 'react-router'
import ReactRouterRelay from 'react-router-relay'
import { http } from 'sphere-node-sdk'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import createHashHistory from 'history/lib/createHashHistory'
import Application from './components/application'
import Channels, { queries as channelsQueries }
  from './components/pages/channels'
import Channel, { queries as channelQueries }
  from './components/pages/channel'

// Use hash location for Github Pages
// but switch to HTML5 history locally.
const history = process.env.NODE_ENV === 'production' ?
  createHashHistory() :
  createBrowserHistory()

const url = `https://api.sphere.io/${process.env.SPHERE_PROJECT_KEY}/graphql`
const headers = {
  'Authorization': `Bearer ${process.env.SPHERE_ACCESS_TOKEN}`
}
const fetch = http({ auth: {}, request: {} })
const dnl = new Relay.DefaultNetworkLayer(url, { headers })
// FIXME: remove when SPHERE.IO graphql endpoint fixes
// parsing of `variables`
dnl._sendQuery = request => {
  return fetch(url, {
    body: JSON.stringify({
      query: request.getQueryString(),
      variables: JSON.stringify(request.getVariables())
    }),
    headers: Object.assign({}, headers, {
      'Content-Type': 'application/json'
    }),
    method: 'POST'
  })
}
Relay.injectNetworkLayer(dnl)

ReactDOM.render(
  <Router
    createElement={ReactRouterRelay.createElement} history={history}>
    <Route path="/" component={Application}>
      <IndexRoute
        component={Channels}
        queries={channelsQueries}
        renderFailure={(error, retry) => {
          return error.json().then(result => {
            return (
              <div>
                <p>{result.errors}</p>
                <p><button onClick={retry}>Retry?</button></p>
              </div>
            )
          })
        }} />
      <Route path="/channel/:id"
        component={Channel}
        queries={channelQueries} />
    </Route>
  </Router>
, document.getElementById('app'))
