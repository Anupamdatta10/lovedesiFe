import React, { Component } from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from "react-router-dom";
import { createHashHistory } from 'history';
//import HomeRoute from '../Home/Routes/HomeRoute';
//import NotFoundPage from '../Utility/Pages/NotFound';
import { connect } from 'react-redux';
class index extends Component {
  render() {
    const history = createHashHistory();
    return (
      <>
        <Switch>
          {/* Global routes */}
          {/* <Route exact path="/" component={HomeRoute} />
          <Route exact path="/:lng/home" component={HomeRoute} /> */}
          <Route path="/404" component={NotFoundPage} />
          <Redirect to="/404" />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = (globalState) => {
  return {
    token: globalState.LoginReducer.token
  };
}

export default connect(mapStateToProps)(index);
