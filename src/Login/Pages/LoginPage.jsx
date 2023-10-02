import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Utility from '../../Utility/Utility';
import { loaderStateTrue, loaderStateFalse, roleWisePermission } from '../../Actions/AllAction';
import { setToken, setUserCredentials, logOutApp, setVersionList } from '../Actions/LoginAction';
import { Modal } from 'react-bootstrap';
import CommonLogin from '../Components/CommonLogin';
import * as LoginController from '../Controller/LoginController';
import '../Assets/css/logindoc.scss';
import '../Assets/css/loginresponsivedoc.scss';
import LoginUtility from '../Utility/LoginUtility'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import ModalGlobal from '../../Utility/Components/ModalGlobal';
import ConfirmationAlert from '../../Utility/Components/ConfirmationAlert';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { version } from 'react-dom/cjs/react-dom.production.min';
import Config from '../../Utility/Config';

const LoginPage = (props) => {
	const [email, setemail] = useState("")
	const [password, setpassword] = useState("")
	const [updated_password, setupdated_password] = useState("")
	const [updated_confirm_password, setupdated_confirm_password] = useState("")

	const [state, setState] = useState({
		//email: "",
		//password: "",
		//updated_password: "",
		//updated_confirm_password: "",
		emailError: "",
		passwordError: "",
		updated_passwordError: "",
		updated_comfirm_passwordError: "",
		passwordLock: false,
		confirmPasswordLock: false,
		passtype: "password",
		confirmPasstype: "password",
		loginCredentials: {},
		//modal
		modalShow: false,
		updatedPasswordSession: "",
		challangeName: "",
		userName: "",

		// Focus
		emailFocus: false,
		passwordFocus: false,

		// Language change
		langaugeConfirmModal: false,
		selectedLangauge: "",

	})
	//Check multi language
	const { t, i18n } = useTranslation();
	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
		props.history.push(`/${lng}/login`);
	};
	//Check multi language

	useEffect(() => {
		if (props.token && props.token != "" && props.token != null) {
			props.history.push(`/${localStorage.getItem('i18nextLng')}/home`);
		} else {
			props.history.push(`/en/login`);
		}
	}, [])


	const { loaderStateTrue, loaderStateFalse, history, logOutApp, setToken, setUserCredentials, roleWisePermission } = props;

	/*useEffect(()=>{
		//console.log("window.location.href====>>>",window.location.href);
		//console.log("console.log(window.location.pathname);",window.location.pathname);
		var url = window.location.href;
		let splittedUrl = url.split('?loginDetailsHash=');
		console.log("splittedUrl====;",splittedUrl);
	})*/

	const handleonFocus = (event) => {
		if (event.target.name == "email") {
			setState(prev => ({
				...prev,
				emailFocus: true
			}))
		}

		if (event.target.name == "password") {
			setState(prev => ({
				...prev,
				passwordFocus: true
			}))
		}

	}
	const handleonBlur = (event) => {
		setState(prev => ({
			...prev,
			emailFocus: false,
			passwordFocus: false
		}))
	}

	const handleChange = (event) => {
		if (event.target.name == "email") {
			if (event.target.value == "") {
				setState(prev => ({
					...prev,
					emailError: 'Please enter valid email'
				}))
				setemail(event.target.value)
			} else {
				setState(prev => ({
					...prev,
					emailError: "",
					//email:event.target.value
				}))
				setemail(event.target.value)
			}
		}
		if (event.target.name == "password") {
			if (event.target.value == "") {
				setState(prev => ({
					...prev,
					passwordError: 'Please enter password'
				}))
				setpassword(event.target.value)

			} else {
				setState(prev => ({
					...prev,
					passwordError: "",
					//password:event.target.value
				}))
				setpassword(event.target.value)
			}

		}
		if (event.target.name == "updated_password") {
			setState(prev => ({
				...prev,
				updated_passwordError: ""
			}))

			setupdated_password(event.target.value)
		}
		if (event.target.name == "updated_confirm_password") {
			setState(prev => ({
				...prev,
				updated_comfirm_passwordError: ""
			}))
			setupdated_confirm_password(event.target.value)
		}
		/*setState(prev => ({
			...prev,
			[event.target.name]: event.target.value
		}))*/
	}

	const validation = () => {
		let valid = true;

		if (email == "") {
			valid = false;
			setState(prev => ({
				...prev,
				emailError: 'Please enter valid email'
			}))
		} else {
			var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
			if (!expr.test(email)) {
				setState(prev => ({
					...prev,
					emailError: 'Enter valid email'
				}))
				valid = false;
			} else {
				setState({
					emailError: ""
				})
			}



		}

		if (password == "") {
			valid = false;
			setState(prev => ({
				...prev,
				passwordError: 'Enter Password'
			}))
		} else {
			setState(prev => ({
				...prev,
				passwordError: ""
			}))
		}
		return valid;
	}




	const forgotPassword = () => {
		props.history.push(`/${localStorage.getItem('i18nextLng')}/forgot_password`);
	}

	const handleKeyPress = (event) => {
		if (event.keyCode === 13)
			login();
	}
	const login = (e) => {
		let valid = validation();

		if (valid) {
			props.history.push(`/${localStorage.getItem('i18nextLng')}/home`);
			console.log("entry=======home")
			/*loaderStateTrue();
			let data = {}
			data["username"] = email
			data["password"] = password
			LoginController.loginGetApi(data).then((response) => {
				loaderStateFalse();
				if (response) {
					if (response.success) {
						if (response.data.challengeName == "NEW_PASSWORD_REQUIRED") {
							setState(prev => ({
								...prev,
								modalShow: true,
								updatedPasswordSession: response.data.session,
								challangeName: response.data.challengeName,
								userName: response.data.username
							}))
						} else {
							loginSuccess(response);
						}
					} else {
						if (response.message == "User does not exist.") {
							setState(prev => ({
								...prev,
								passwordError: 'Incorrect  email/ password. Please try again.'
							}))

						} else {
							setState(prev => ({
								...prev,
								passwordError: response.message,
								passtype: "password",
							}))
						}

					}
				}
			}).catch((error) => {
				loaderStateFalse();

			});*/
		}

	}

	useEffect(() => {
		if (state.loginCredentials && Object.keys(state.loginCredentials).length > 0) {
			setUserCredentialsData();
		}
	}, [state.loginCredentials]);

	const loginSuccess = (response) => {

		const finalIdToken = response.data.tokenType + ' ' + response.data.idToken;
		const accessToken = response.data.accessToken
		const refreshToken = response.data.refreshToken
		const expiresIn = LoginUtility.getExpiryDetails(response.data.expiresIn)
		setToken(finalIdToken, accessToken, expiresIn, refreshToken).then(() => {
			loaderStateTrue();
			LoginController.getCurrentUser().then((userResponse) => {
				// console.log("userResponse.data------------???????/----->",userResponse.data)
				// loaderStateFalse();
				if (userResponse.success) {
					Utility.toastNotificationsDismissAll();
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



	const setUserCredentialsData = async () => {
		const { loginCredentials } = state
		// console.log("loginCredentials===========2222222222====>",loginCredentials)
		setUserCredentials(loginCredentials).then(() => {
			props.history.push(`/${localStorage.getItem('i18nextLng')}/home`);

		})
	}





	const showText = () => {
		setState(prev => ({
			...prev,
			passwordLock: true,
			passtype: "text"
		}))
	}

	const showPassword = () => {
		setState(prev => ({
			...prev,
			passwordLock: false,
			passtype: "password"
		}))
	}

	const showUpdateConfirmText = () => {
		setState(prev => ({
			...prev,
			confirmPasswordLock: true,
			confirmPasstype: "text"
		}))
	}

	const showUpdateConfirmPassword = () => {
		setState(prev => ({
			...prev,
			confirmPasswordLock: false,
			confirmPasstype: "password"
		}))
	}

	const handleClose = () => {
		loaderStateFalse();
		setState(prev => ({
			...prev,
			modalShow: false,
			updated_password: "",
			updated_confirm_password: ""
		}))
	}

	const updatePassword = () => {
		const { updated_confirm_password, userName, updatedPasswordSession, challangeName } = state;
		let valid = updatePasswordCheck();
		//console.log("updatedPasswordSession", updatedPasswordSession)
		if (valid) {
			loaderStateTrue();
			let header = {};
			header["session"] = updatedPasswordSession;
			let data = {
				"username": userName,
				"password": updated_password,
				//session:session,
				"challengeName": challangeName
			}
			LoginController.forcePasswordChange(data, header).then((response) => {
				if (response) {

					if (response.success) {
						handleClose();

						Utility.toastNotifications(response.message, "Success", "success")
						const finalIdToken = response.data.tokenType + ' ' + response.data.idToken;
						const accessToken = response.data.accessToken
						const refreshToken = response.data.refreshToken
						const expiresIn = LoginUtility.getExpiryDetails(response.data.expiresIn)
						setToken(finalIdToken, accessToken, expiresIn, refreshToken).then(() => {
							logOutApp().then(
								() => history.push("/")
							);
						})

					} else {
						loaderStateFalse();
					}
				}
			}).catch((error) => {
				//Utility.toastNotifications(error.message, "Error", "error")
				logOutApp().then(
					() => history.push("/")
				);
			});
		}
	}

	const updatePasswordCheck = () => {
		let valid = true;
		//const { updated_password, updated_confirm_password } = state;

		let passwordValidate = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-+“!@#%&/,><\’:;|_~`])\S{6,99}$/.test(updated_password);

		if (passwordValidate) {
			setState(prev => ({
				...prev,
				updated_passwordError: ''
			}))
		} else {
			valid = false;
			setState(prev => ({
				...prev,
				updated_passwordError: 'This field is invalid'
			}))
			Utility.toastNotifications(`<ul className='password-inner-box'>
            <li><b>Minimum length</b>, which must be at least 6 characters but fewer than 99 characters</li>
            <li><b>Require numbers</b></li>
            <li><b>Require a special character</b> from this set: = + - ^ $ * . [ ] { } ( ) ?  ! @ # % & / \ , > < ' : ; | _ ~ </li>
            <li><b>Require uppercase letters</b></li>
            <li><b>Require lowercase letters</b></li>
          </ul>`, `Password error`, "longError");
		}


		let CpasswordValidate = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-+“!@#%&/,><\’:;|_~`])\S{6,99}$/.test(updated_confirm_password);

		if (CpasswordValidate) {
			setState(prev => ({
				...prev,
				updated_comfirm_passwordError: ''
			}))
		} else {
			valid = false;
			setState(prev => ({
				...prev,
				updated_comfirm_passwordError: 'This field is invalid'
			}))
			Utility.toastNotifications(`<ul className='password-inner-box'>
            <li><b>Minimum length</b>, which must be at least 6 characters but fewer than 99 characters</li>
            <li><b>Require numbers</b></li>
            <li><b>Require a special character</b> from this set: = + - ^ $ * . [ ] { } ( ) ?  ! @ # % & / \ , > < ' : ; | _ ~ </li>
            <li><b>Require uppercase letters</b></li>
            <li><b>Require lowercase letters</b></li>
          </ul>`, `Confirm password error`, "longError");
		}

		if (updated_password == updated_confirm_password && updated_password != "" && updated_confirm_password != "") {
			setState(prev => ({
				...prev,
				updated_passwordError: '',
				updated_comfirm_passwordError: ''
			}))
		} else {
			valid = false;
			Utility.toastNotifications('Password and Confirm password does not match', "Error", "error");
		}

		return valid;

	}

	const lanOnSelect = (lng) => {

		setState(prev => ({
			...prev,
			langaugeConfirmModal: true,
			selectedLangauge: lng
		}))

	}

	const confirmLangaugeChange = () => {
		const { selectedLangauge } = state;

		i18n.changeLanguage(selectedLangauge);
		let splitUrl = props.match.url.split('/');
		props.history.push(`/${selectedLangauge}/${splitUrl[2]}`);
		window.location.reload();
		setState(prev => ({
			...prev,
			langaugeConfirmModal: false,
		}))

	}

	const cancelLangaugeChange = () => {
		setState(prev => ({
			...prev,
			langaugeConfirmModal: false,
		}))
	}



	return (
		<div className="appContainer" id="login_container">


			<CommonLogin
				handleChange={handleChange}
				email={email}
				password={password}
				emailError={state.emailError}
				passwordError={state.passwordError}
				passtype={state.passtype}
				//passwordLock={state.passwordLock}
				//showText={showText}
				//showPassword={showPassword}
				login={login}
				forgotPassword={forgotPassword}

				handleonFocus={handleonFocus}
				handleonBlur={handleonBlur}
				emailFocus={state.emailFocus}
				passwordFocus={state.passwordFocus}

				passPlaceholder='Password'
				forgotTitle='Forgot your password?'
				submitTitle='Log in'
				user_name='User Name'
				lanOnSelect={lanOnSelect}
				handleKeyPress={handleKeyPress}
			/>

			<Modal
				show={state.modalShow}
				onHide={handleClose}
				//backdrop="static"
				//keyboard={false}
				className="forcePasswordChange"
			>
				<Modal.Header closeButton>
					<Modal.Title>Change Password</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="passwordRow">
						<input type="password" onChange={handleChange} name="updated_password" value={updated_password} placeholder='Update password' className="input__fields_property" />
						<div className="col-md-12 errorClass error_div">{state.updated_passwordError}</div>
					</div>
					<div className="passwordRow">
						<input type="password" onChange={handleChange} name="updated_confirm_password" value={updated_confirm_password} placeholder='Confirm Updated Password' className="input__fields_property" />
						<div className="col-md-12 errorClass error_div">{state.updated_comfirm_passwordError}</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					{/* <Button variant="primary" onClick={updatePassword} className="update_btn">Submit</Button> */}
				</Modal.Footer>
			</Modal>

			<ModalGlobal
				show={state.langaugeConfirmModal}
				onHide={cancelLangaugeChange}
				className="modalcustomize confirmationalertmodal"
				bodyClassName="cancelConfirmationbody"
				headerclassName="close_btn_icon"
				title='Language Change'
				footer={false}
				body={
					<ConfirmationAlert
						BodyFirstContent='Are you sure, you want to reload?'
						confirmationButtonContent='Confirm'
						deleteConfirmButton={confirmLangaugeChange}
						cancelButtonContent='Cancel'
						deleteCancleButton={cancelLangaugeChange}
					/>
				}
			/>

		</div>
	);
}

CommonLogin.propTypes = {
	handleChange: PropTypes.func,
	email: PropTypes.string,
	password: PropTypes.string,
	emailError: PropTypes.string,
	passwordError: PropTypes.string,
	passtype: PropTypes.string,
	passwordLock: PropTypes.bool,
	showText: PropTypes.func,
	showPassword: PropTypes.func,
	login: PropTypes.func,
	forgotPassword: PropTypes.func,
	backgroundImageUrl: PropTypes.string
}


const mapStateToProps = (globalState) => {

	return {
		userCredentials: globalState.LoginReducer.userCredentials,
		token: globalState.LoginReducer.token,
	};
}


export default connect(mapStateToProps, { loaderStateTrue, loaderStateFalse, setToken, setUserCredentials, logOutApp, roleWisePermission, setVersionList })(withRouter(LoginPage));


