import React from "react"
import { Navigate } from "react-router-dom"
import isAuthenticated from "../api/isAuthenticated"

const PrivateRoute = ({ component: Component }) => {
    return (
        isAuthenticated() ? Component : <Navigate to="/" />
        )
    }
  export default PrivateRoute