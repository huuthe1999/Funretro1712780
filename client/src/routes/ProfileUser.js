
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthUser } from '../helper/authUser';

const ProfileUserRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthUser() ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }}
                    />
                )
        }
    >
    </Route>
);

export default ProfileUserRoute;