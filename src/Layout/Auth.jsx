import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Header from '../Utility/Components/Header'
import Footer from '../Utility/Components/Footer'
import Left from '../Utility/Components/Left'
import { logOutApp } from '../Login/Actions/LoginAction';
import NotFoundPage from '../Utility/Pages/NotFound';


const AuthLayout = (props) => {
  const { userCredentials, logOutApp, history, allowedRoles } = props
  useEffect(() => {
    //console.log("props.token==========",props.token)
    checkForUSerCrendentials()
  }, []);

  const checkForUSerCrendentials = () => {
    if (props.token == undefined || props.token == "") {
      history.push("/")
    }
  }
  return (
    <>
      {props.token && props.token != "" && allowedRoles.includes(userCredentials.user_details.role_name) ?
        <div className="page_customize">
          <div className="pagecontainer">
            <Header history={props.history} />
            <Left history={props.history} />
            <div className={props.leftbar ? 'content_open' : 'content_closed'} style={{ minHeight: '91vh', backgroundColor: '#f3f3f9', paddingTop: '0px', transition: 'padding .3s ease-in-out', display: 'flex', borderRadius: '0px 0px 15px 65px' }}>{props.children}</div>
          </div>
        </div>
        : <><NotFoundPage permission={false} /></>}
    </>
  );

}


const mapStateToProps = (globalState) => {
  //console.log("globalState====auth",globalState);
  return {
    leftbar: globalState.mainReducerData.leftbar,
    userCredentials: globalState.LoginReducer.userCredentials,
    token: globalState.LoginReducer.token,
  };

}

export default connect(mapStateToProps, { logOutApp })(AuthLayout);