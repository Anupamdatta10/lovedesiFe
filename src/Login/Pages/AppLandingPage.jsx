import React, { useState, useEffect, useRef } from 'react';
import '../Assets/css/logindoc.scss';
import '../Assets/css/loginresponsivedoc.scss';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
const AppLandingPage = (props) => {
	const [state, setState] = useState({

	})
	const setLanguage = () => {
		if (props.token && props.token != "" && props.token != null) {
			props.history.push(`/${localStorage.getItem('i18nextLng')}/home`);
		} else {
			var windowLocaation = window.location.href;
			//console.log("windowLocaation", windowLocaation)
			var splittedUrl = windowLocaation.split('?loginDetailsHash=');

			//console.log("splittedUrl===", splittedUrl)

			if (splittedUrl.length > 1) {
				var credentials = splittedUrl[1];
				//console.log("credentials===", credentials)
				props.history.push(`/${localStorage.getItem('i18nextLng')}/anotherloginurl/${credentials}`);
			} else {
				props.history.push('/en/login');
			}

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

export default connect(mapStateToProps)(withRouter(AppLandingPage));


