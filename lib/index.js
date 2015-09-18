import React from 'react'
import { Router, Route } from 'react-router'
import ReactRouterRelay from 'react-router-relay'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import createHashHistory from 'history/lib/createHashHistory'
import Application from './components/application'
import Home, { queries as homeQueries } from './components/pages/home'

// Use hash location for Github Pages
// but switch to HTML5 history locally.
const history = process.env.NODE_ENV === 'production' ?
  createHashHistory() :
  createBrowserHistory()

React.render(
  <Router
    createElement={ReactRouterRelay.createElement} history={history}>
    <Route component={Application}>
      <Route path="/" component={Home} queries={homeQueries} />
    </Route>
  </Router>
, document.getElementById('app'))
