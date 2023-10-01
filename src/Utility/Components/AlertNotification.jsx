import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { loaderStateTrue, loaderStateFalse, handleActiveLink, connectToWebsocket, disconnectToWebsocket } from '../../Actions/AllAction';
import { showNotification } from '../Controller/UtilityController';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import renderHTML from 'react-render-html';


function AlertNotification(props) {

  if (props.show) {
    return (
      <>
        {props.notificationData.map((error) => (
          <div key={error.id} className='notification-alert-box'>
            <Alert.Heading>{renderHTML(error?.message)}</Alert.Heading>
            <Alert variant="danger" onClose={() => props.handleCrossButtonClick(error.id)} dismissible></Alert>
          </div>
        ))}
      </>
    );
  }
  return null;
}

const mapStateToProps = (globalState) => {
  return {
    userCredentials: globalState.LoginReducer.userCredentials,
    token: globalState.LoginReducer.token
  };
}

export default connect(mapStateToProps, { handleActiveLink, loaderStateTrue, loaderStateFalse, })(withRouter(AlertNotification));

