import React from 'react'
import PropTypes from 'prop-types'

const Layout = ({ className, children }) => {
  return (
      <main className={className}>{children}</main>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
