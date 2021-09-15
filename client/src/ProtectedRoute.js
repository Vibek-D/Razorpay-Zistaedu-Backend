import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthRegister from "./AuthRegister";

export const ProtectedRoute = ({
    component: Component,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (AuthRegister.isAuthenticated()) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    );
};