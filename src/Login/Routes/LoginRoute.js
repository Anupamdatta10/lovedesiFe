import React, { Component } from 'react';
import { createHashHistory } from 'history';
import Default from "../../Layout/Default";
import { Switch, Redirect, Route } from "react-router-dom";
//AppLandingPage
import AppLandingPage from '../Pages/AppLandingPage';
import AnotherLoginUrl from '../Pages/AnotherLoginUrl';
//Login Module
import LoginPage from '../Pages/LoginPage';
import ForgotPassword from '../Pages/ForgotPassword';
//import TimelinePage from '../Pages/TimelinePage';
import RenewPassword from '../Pages/RenewPassword';
import UpdatePassword from '../Pages/UpdatePassword';
import NotFoundPage from '../../Utility/Pages/NotFound'


class LoginRoute extends Component {
    render() {
        //console.log("entry login")
        const history = createHashHistory();
        return (

            <Switch>

                {/*****************Login Module Start****************/}


                <Route
                    exact
                    path="/"
                    render={() => (
                        <Default history={history}>
                            <AppLandingPage history={history} location={location} />
                        </Default>
                    )}
                />

                <Route
                    exact
                    path="/:lng/anotherloginurl/:loginDetailsHash"
                    render={() => (
                        <Default history={history}>
                            <AnotherLoginUrl history={history} location={location} />
                        </Default>
                    )}
                />

                <Route
                    exact
                    path="/:lng/login"
                    render={() => (
                        <Default history={history}>
                            <LoginPage history={history} location={location} />
                        </Default>
                    )}
                />

                <Route
                    exact
                    path="/:lng/forgot_password"
                    render={() => (
                        <Default history={history}>
                            <ForgotPassword history={history} location={location} />
                        </Default>
                    )}
                />
                {/* <Route
                    exact
                    path="/:lng/timeline"
                    render={() => (
                        <Default history={history}>
                            <TimelinePage history={history} location={location} />
                        </Default>
                    )}
                /> */}
                <Route
                    exact
                    path="/:lng/renewpassword"
                    render={() => (
                        <Default history={history}>
                            <RenewPassword history={history} location={location} />
                        </Default>
                    )}
                />
                <Route
                    exact
                    path="/:lng/updatepassword/:email/:password"
                    render={() => (
                        <Default history={history}>
                            <UpdatePassword history={history} location={location} />
                        </Default>
                    )}
                />


                <Route component={NotFoundPage} />

                {/*****************Login Module End****************/}

            </Switch>
        );
    }
}


export default LoginRoute;
