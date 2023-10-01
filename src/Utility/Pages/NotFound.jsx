import React, { Component } from 'react';
import { logOutApp } from '../../Login/Actions/LoginAction';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class NotFound extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="not-found-container">
        <div className="containerBox">
          <h2>Oops!</h2>
          <h1 className="not-found-title">{this.props.permission ? "404 - Page Not Found" : "Permission Denied"}</h1>
          <p className="not-found-description">
            {this.props.permission ? "The page you are looking for does not exist. Please check the URL or navigate back to the homepage." : "You do not have permission to access this page."}


          </p>
          {this.props.token != "" ?
            <Link to={`/${localStorage.getItem('i18nextLng')}/home`} className="backToHome">Go to Home </Link>
            : <Link to={`/${localStorage.getItem('i18nextLng')}/login`} className="backToHome">Go to Login </Link>}
        </div>
      </div>

    );
  }
}
//export default NotFound;

NotFound.defaultProps = {
  permission: true,
}

const mapStateToProps = (globalState) => {
  return {
    userCredentials: globalState.mainReducerData.userCredentials,
    token: globalState.LoginReducer.token,
  };
}

export default connect(mapStateToProps, { logOutApp })(NotFound);
