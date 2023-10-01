import React, { Component } from 'react';
import { createHashHistory } from 'history';
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Default from "../../../Layouts/Default";
import Auth from "../../../Layouts/Auth";
//import HomePage from '../Pages/HomePage';


class HomeRoute extends Component {
  render() {
    const history = createHashHistory();
    const { allowedRoles } = this.props;
    return (

      <Switch>

        {/*****************Home****************/}
			{/*<Route
          exact
          path="/:lng/home"
          render={() => (
            <Auth history={history} allowedRoles={allowedRoles}>
              <HomePage history={history} location={location} />
            </Auth>
          )}
			/>*/}
        {/*****************Home****************/}

      </Switch>
    );
  }
}
export default HomeRoute;
