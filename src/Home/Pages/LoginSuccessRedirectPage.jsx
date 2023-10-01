import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
const LoginSuccessRedirectPage = (props) => {
    const [state, setState] = useState({

    })
    const setLanguage = () => {
        if (props.token && props.token != "" && props.token != null) {
            props.history.push(`/${localStorage.getItem('i18nextLng')}/home`);
        } else {
            props.history.push('/en/login');
        }


    }
    useEffect(() => {

        //console.log("Entry app landing page")
        setLanguage();
    }, [state.loginCredentials]);

    return (
        <></>
    );
}


//export default (withRouter(AppLandingPage));

const mapStateToProps = (globalState) => {
    // console.log("globalState=========applanding page", globalState)
    return {
        token: globalState.LoginReducer.token
    };
}

export default connect(mapStateToProps)(withRouter(LoginSuccessRedirectPage));


