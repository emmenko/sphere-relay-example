import React, { PropTypes } from 'react'

export default class Application extends React.Component {

  static propTypes = {
    children: PropTypes.any
  }

  render () {
    return (
      <div>
        {/* this will render the child routes */}
        {this.props.children}
      </div>
    )
  }
}
