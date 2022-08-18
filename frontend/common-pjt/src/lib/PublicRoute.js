import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import isAuthenticated from '../api/isAuthenticated'

export default function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? <Redirect to="/main" /> : <Component {...props} />
      }
    />
  )
}
