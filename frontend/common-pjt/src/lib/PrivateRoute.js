import React from "react"
import { Route } from "react-router-dom"
import isAuthenticated from "../api/isAuthenticated"

const PrivateRoute = ({ component: Component }) => {
    return (
        isAuthenticated() ? Component : <Route to="/" />
        )
    }
  export default PrivateRoute