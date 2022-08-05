import React from "react";
import { Navigate } from "react-router-dom";
import isAuthenticated from "../api/isAuthenticated";

const PublicRoute = ({ component: Component }) => {
    return (
        isAuthenticated() ? <Navigate to="/main" /> : Component
        )
    }
  export default PublicRoute;