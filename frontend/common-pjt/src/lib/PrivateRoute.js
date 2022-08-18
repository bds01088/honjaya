import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import isAuthenticated from '../api/isAuthenticated'

export default function PrivateRoute({ component: Component, ...rest }) {
  if (isAuthenticated() === false) {
    alert('로그인이 필요합니다')
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  )
}
