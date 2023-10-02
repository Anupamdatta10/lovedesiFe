import React, { useState, useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';

import { loaderStateTrue, loaderStateFalse } from '../src/Actions/AllAction';
import LoadingOverlay from 'react-loading-overlay';
//import BeatLoader from 'react-spinners/BeatLoader';
import FadeLoader from 'react-spinners/FadeLoader';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Popup from 'react-popup';
import Routes from '../src/Routes/index';

import LoginRoute from './Login/Routes/LoginRoute'

LoadingOverlay.propTypes = undefined;

const App = (props) => {
  const { loaderStateFalse } = props;
  useEffect(() => {
    loaderStateFalse();
  }, []);

  const { isLoading, userCredentials } = props;
  //console.log("userCredentials: ", userCredentials?.user_details?.version)
  return (
    <LoadingOverlay
      active={isLoading}
      className='lodingOverlayDiv'
      /*spinner={<BeatLoader
        color={'#6f737d !important'}
        size={30} margin='10px'
      />}*/
      spinner={<FadeLoader
        color={'#ccc !important'}
        size={50} margin='0px'
        speedMultiplier={0.3}
      />}
      styles={{
        overlay: (base) => ({
          ...base,
          background: 'rgba(255, 255, 255, 0.1)',
          zIndex: '9999999999999'
          //background: 'rgba(42, 167, 255, 0.1)'
        })
      }}
    >

      <Popup />
      <ToastContainer />
      <Router>
        {/* {
          userCredentials?.user_details?.version == 'v3' ?
            <Routes />
            : <LoginRoute />
        } */}
        <Routes />
        

      </Router>
    </LoadingOverlay>
  );
}

const mapStateToProps = (globalState) => {
  //console.log("globalState.LoginReducer.userCredentials===>", globalState.LoginReducer.userCredentials)
  return {
    isLoading: globalState.mainReducerData.loaderState,
    userCredentials: globalState.LoginReducer.userCredentials,
  };
}

export default connect(mapStateToProps, { loaderStateTrue, loaderStateFalse })(App);

