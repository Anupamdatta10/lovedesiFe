import React, { Component, lazy, Suspense } from 'react';
import { createHashHistory } from 'history';
import { Switch, Redirect, Route } from "react-router-dom";
import Auth from "../../Layout/Auth";
import '../../Home/Assets/css/homedoc.scss';
const HomePage = lazy(() => import('../Pages/HomePage'))
import LoginSuccessRedirectPage from '../../Home/Pages/LoginSuccessRedirectPage';

class HomeRoute extends Component {
  render() {
    const history = createHashHistory();
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Auth history={history} allowedRoles={['app_admin', 'admin', 'user']}>
              <LoginSuccessRedirectPage history={history} location={location} />
            </Auth>
          )}
        />
        <Route
          exact
          path="/:lng/home"
          render={() => (
            <Auth history={history} allowedRoles={['app_admin', 'admin', 'user']}>
              <Suspense fallback={<Loading />}>
                <HomePage history={history} location={location} />
              </Suspense>
            </Auth>
          )}
        />
      </Switch>
    );
  }
}
export default HomeRoute;

function Loading() {
  return (
    <>
      <div className="wrapper">
        <span>Loading...</span>
      </div>
    </>
  );
}
