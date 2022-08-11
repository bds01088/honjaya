import React from "react";
import { Route} from "react-router-dom";
import isAuthenticated from "../api/isAuthenticated";

const PublicRoute = ({ component: Component }) => {
    return (
        isAuthenticated() ? <Route to="/main" /> : Component
        )
    }
  export default PublicRoute;