import React, { useState, useEffect } from 'react';
import CustomInput from '../../Utility/Components/CustomInput';
import Utility from '../../Utility/Utility';
import { loaderStateTrue, loaderStateFalse } from '../../Actions/AllAction';
import { setToken, logOutApp } from '../Actions/LoginAction';
import { connect } from 'react-redux';
import * as LoginController from '../Controller/LoginController'
import '../Assets/css/logindoc.scss';
import '../Assets/css/loginresponsivedoc.scss';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { withRouter } from 'react-router';


const RenewPassword = (props) => {
    const [state, setState] = useState({
        username: "",
        passwordResetCode: "",
        password: "",
        retypePassword: "",

        usernameError: "",
        passwordResetCodeError: "",
        passwordError: "",
        retypePasswordError: "",

        hideShowChangePasswordPanel: false
    })
    const { t, i18n } = useTranslation();

    const { loaderStateTrue, loaderStateFalse, history, logOutApp } = props
    const handleChange = (e) => {
        if (e.target.name == "username") {
            let emailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value);
            if (emailValidate) {
                setState(prev => ({
                    ...prev,
                    usernameError: ""
                }))
            } else {
                setState(prev => ({
                    ...prev,
                    usernameError: `${t("emailError")}`
                }))
            }
        }

        //change password
        if (e.target.name == "password") {
            if (e.target.value == "") {
                setState(prev => ({
                    ...prev,
                    passwordError: `${t("passwordError")}`
                }))
            } else {
                setState(prev => ({
                    ...prev,
                    passwordError: ""
                }))
            }
        }
        if (e.target.name == "retypePassword") {
            if (e.target.value == "") {
                setState(prev => ({
                    ...prev,
                    retypePasswordError: `${t("retypepasswordError")}`
                }))
            } else {
                setState(prev => ({
                    ...prev,
                    retypePasswordError: ""
                }))
            }
        }
        if (e.target.name == "passwordResetCode") {
            if (e.target.value == "") {
                setState(prev => ({
                    ...prev,
                    passwordResetCodeError: `${t("enterverificationCode")}`
                }))
            } else {
                setState(prev => ({
                    ...prev,
                    passwordResetCodeError: ""
                }))
            }
        }
        setState(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const forgotPassword = async () => {
        const { username } = state;

        if (validationForEmail()) {
            try {
                /*const user = await Auth.forgotPassword(username);
                Utility.toastNotifications(`Verification code sent successfully to ${username}`, "Success", "success")
                this.setState({
                    hideShowChangePasswordPanel: false
                })*/

                let data = {}
                data['username'] = username;
                loaderStateTrue();
                LoginController.forgotPassword(data).then((response) => {
                    //console.log("responseresponseresponse==>",response)
                    if (response.success) {
                        Utility.toastNotifications(response.message, "Success", "success");
                        setState(prev => ({
                            ...prev,
                            hideShowChangePasswordPanel: true
                        }))
                        //console.log("forgotPassword===================================",response)
                    } else {
                        //console.log("responseresponseresponse==>",response.message)
                        Utility.toastNotifications(response.message, "Error", "error");
                    }
                    loaderStateFalse();
                }).catch((error) => {
                    /*if (error.response) {
                        if (error.response.status === 401) {
                            Utility.toastNotifications("Please login", "Error", "error");
                            logOutApp().then(
                                () => history.push("/")
                            );
                        }
                    }
                    if (error.message == "Network Error") {
                        Utility.toastNotifications("Please login", "Error", "error");
                        logOutApp().then(
                            () => history.push("/")
                        );
                    }*/
                    loaderStateFalse();
                });

            } catch (error) {
                if (error.code == "UserNotFoundException") {
                    Utility.toastNotifications("User not found", "Error", "error")
                } else {
                    Utility.toastNotifications(error.message, "Error", "error")
                }
                //console.log('error signing in', error.code);
            }
        }

    }
    /*requestForNewPassword = async () => {
        const { username, passwordResetCode, password } = this.state;
        const { history } = this.props;
        if (this.validationForPasswordChange()) {
            try {
                const user = await Auth.forgotPasswordSubmit(username, passwordResetCode, password);
                Utility.toastNotifications(`Your password for ${username} change successfully`, "Success", "success");
                history.push("/");
            } catch (error) {
                Utility.toastNotifications(error.message, "Error", "error")
                //console.log('error signing in', error);
            }
        }

    }*/
    const requestForNewPassword = async () => {
        const { username, passwordResetCode, password } = state;
        //const { history, loaderStateTrue, loaderStateFalse, logOutApp } = props;
        if (validationForPasswordChange()) {
            try {
                let data = {}
                data['username'] = username;
                data['password'] = password;
                data['confirmmation_code'] = passwordResetCode;
                loaderStateTrue();
                LoginController.changePassword(data).then((response) => {
                    loaderStateFalse();
                    //console.log("responseresponseresponse==>",response)
                    if (response.success) {
                        Utility.toastNotifications(response.message, "Success", "success");
                        history.push("/");
                    } else {
                        //console.log("responseresponseresponse==>",response.message)
                        Utility.toastNotifications(response.message, "Error", "error");
                    }

                }).catch((error) => {
                    /*if (error.response) {
                        if (error.response.status === 401) {
                            Utility.toastNotifications("Please login", "Error", "error");
                            logOutApp().then(
                                () => history.push("/")
                            );
                        }
                    }
                    if (error.message == "Network Error") {
                        Utility.toastNotifications("Please try again", "Error", "error");
                    }*/
                    loaderStateFalse();
                });

            } catch (error) {
                if (error.code == "UserNotFoundException") {
                    Utility.toastNotifications("User not found", "Error", "error")
                } else {
                    Utility.toastNotifications(error.message, "Error", "error")
                }
                //console.log('error signing in', error.code);
            }
        }

    }

    const validationForEmail = () => {
        let valid = true;
        const { username, password } = state;
        let emailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username);
        if (emailValidate) {
            setState(prev => ({
                ...prev,
                usernameError: ""
            }))
        } else {
            valid = false;
            setState(prev => ({
                ...prev,
                usernameError: 'Please enter valid email or phone number'
            }))
        }
        return valid;
    }
    const validationForPasswordChange = () => {
        let valid = true;
        const { passwordResetCode, password, retypePassword } = state;
        if (password == "") {
            valid = false;
            setState(prev => ({
                ...prev,
                passwordError: 'Please enter password'
            }))
        } else {
            setState(prev => ({
                ...prev,
                passwordError: ""
            }))
        }
        if (retypePassword == "") {
            valid = false;
            setState(prev => ({
                ...prev,
                retypePasswordError: 'Please retype password'
            }))
        } else {
            setState(prev => ({
                ...prev,
                retypePasswordError: ""
            }))
        }
        if ((password != "" && retypePassword != "") && password != retypePassword) {
            valid = false;
            setState(prev => ({
                ...prev,
                retypePasswordError: "Password doesn't match",
                passwordError: "Password doesn't match"
            }))
        }
        if (passwordResetCode == "") {
            valid = false;
            setState(prev => ({
                ...prev,
                passwordResetCodeError: 'Please enter verification code'
            }))
        } else {
            setState(prev => ({
                ...prev,
                passwordResetCodeError: ""
            }))
        }
        return valid;
    }
    const { hideShowChangePasswordPanel } = state;

    const back_to_login = () => {
		props.history.push("/")
	}

    return (
        <div className="appContainer">
            <div className="loginBackground ForgotPage renewpassword">
                <div className="appContainerInner appContainerInnerForgot">
                    <div className="left_section login_box_inner white_background forgotpass">
                        <div className="logo-box-inner">
                            <div className="iconposition">
                                <img src={require('../../Login/Assets/images/logo-new.png')}/>
                            </div>
                            <div className="titleposition">
                                <h2 className="titleone">Love</h2>
                                <h3 className="titletwo">Desi</h3>
                            </div>
                        </div>
                        <div className="itemsContainer login_left_inner">
                            <div className="forgotFormDiv">
                                <div>
                                    <CustomInput
                                    parentClassName="loginFormInnerDiv input_field_small_size"
                                        //onChange={handleChange}
                                        name="password"
                                        type="password"
                                        //value={state.password}
                                        //labelName="New password"
                                        //errorLabel={state.passwordError}
                                        //labelPresent={true}
                                        placeholder='New password'
                                    />
                                    <CustomInput
                                        parentClassName="loginFormInnerDiv input_field_small_size"
                                        //onChange={handleChange}
                                        name="retypePassword"
                                        type="password"
                                        //value={state.retypePassword}
                                        //labelName="Retype new password"
                                        placeholder='Repeat new password'
                                        //errorLabel={state.retypePasswordError}
                                        //labelPresent={true}
                                    />
                                
                                    <div className="forgor_btnBoxes">
                                        <div className="forgor_btn_inner_div bottom15">
                                            <button className="login-btn btn btn-primary" onClick={requestForNewPassword}>Update password</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

const mapStateToProps = (globalState) => {
    return {
        userCredentials: globalState.LoginReducer.userCredentials,
        token: globalState.LoginReducer.token
    };
}

export default connect(mapStateToProps, { loaderStateTrue, loaderStateFalse, setToken, logOutApp })(withRouter(RenewPassword));