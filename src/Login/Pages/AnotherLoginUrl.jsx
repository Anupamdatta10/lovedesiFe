import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as LoginController from '../Controller/LoginController'; //../../../Actions/AllAction
import { loaderStateTrue, loaderStateFalse, roleWisePermission } from '../../Actions/AllAction';
import { setToken, setUserCredentials, logOutApp } from '../Actions/LoginAction';
import Utility from '../../Utility/Utility';
import LoginUtility from '../Utility/LoginUtility'

const AnotherLoginUrl = (props) => {
	const [state, setState] = useState({		
        loginCredentials: {},
	})

    const { loaderStateTrue, loaderStateFalse, history, logOutApp, setToken, setUserCredentials, roleWisePermission } = props;

    useEffect(()=>{
        //console.log("App land")
        //console.log("this.props.match.params.====",props.match.params)
        loginSuccess()
    })

    useEffect(() => {
		if (state.loginCredentials && Object.keys(state.loginCredentials).length > 0) {
			setUserCredentialsData();
		}
	}, [state.loginCredentials]);

    const setUserCredentialsData = async () => {
		const { loginCredentials } = state
		setUserCredentials(loginCredentials).then(() => {
			rolePermission(loginCredentials.user_details.role_id);
		})
	}

    const loginSuccess = () => {       
       
        let loginDetailsHash = JSON.parse(props.match.params.loginDetailsHash);   
        //let loginDetailsHash = props.match.params.loginDetailsHash;   
		
		// console.log("loginDetailsHash====",loginDetailsHash);
		//return false;

		const finalIdToken = loginDetailsHash.token;
		const accessToken = loginDetailsHash.accessToken
		const refreshToken = loginDetailsHash.refreshToken
		//const expiresIn =  loginDetailsHash.expiresIn
		const expiresIn = LoginUtility.getExpiryDetails(loginDetailsHash.expiresIn)

		// console.log("finalIdToken====",finalIdToken);
		// console.log("accessToken====",accessToken);
		// console.log("refreshToken====",refreshToken);
		// console.log("expiresIn====",expiresIn);

		setToken(finalIdToken, accessToken, expiresIn, refreshToken).then(() => {
			loaderStateTrue();
			LoginController.getCurrentUser().then((userResponse) => {
				loaderStateFalse();
				if (userResponse.success) {
					setState(prev => ({
						...prev,
						loginCredentials: userResponse.data
					}))
				} else {
					logOutApp().then(
						() => history.push("/")
					);
					Utility.toastNotifications(userResponse.message, "Error", "error")
				}
			})
		})
	}

    const rolePermission = (role_id) => {
		let data = [{ "resource_name": "RolesPermissions", "columns": ["id", "role_id", "eventKey", "read_write_permission", "is_enabled"], "column_filters": [{ "is_enabled": 1, "role_id": role_id }] }]
		let filter = {}
		filter['filters'] = JSON.stringify(data);
		LoginController.rolePermissionGetApi(filter).then((response) => {

			//console.log("response.data===",response.data)

			if (response.data.length > 0) {
				let permissionHash = {};
				response.data[0].RolesPermissions_data.map((value) => {
					permissionHash[value.eventKey] = value
				})
				roleWisePermission(permissionHash).then(() => {	
					const { loginCredentials } = state
					//console.log("loginCredentials",loginCredentials)
					let permission = ['app_admin','admin']				
					if(permission.includes(loginCredentials.user_details.role_name)){
						props.history.push(`/${localStorage.getItem('i18nextLng')}/home`);
					}else{
						props.history.push(`/${localStorage.getItem('i18nextLng')}/home`);
					}
					

				});
			}

		}).catch((error) => {
			Utility.toastNotifications(error.message, "Error", "error")
			logOutApp().then(
				() => history.push("/")
			);
		});
	}


	return (
		<></>
	);
}


const mapStateToProps = (globalState) => {	
	return {
		token: globalState.LoginReducer.token,
        userCredentials: globalState.LoginReducer.userCredentials
	};
}



export default connect(mapStateToProps, { loaderStateTrue, loaderStateFalse, setToken, setUserCredentials, logOutApp, roleWisePermission })(withRouter(AnotherLoginUrl));


