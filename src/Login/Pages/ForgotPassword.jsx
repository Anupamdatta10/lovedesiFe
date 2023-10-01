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


const ForgotPassword = (props) => {

    const [username, setusername] = useState("")
    const [phone_number, setphone_number] = useState("")

    const [state, setState] = useState({

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
            //console.log("emailValidate===",emailValidate)
            if (emailValidate) {
                setusername(e.target.value)
            } else {
                // let phoneValidate = ProfileUtility.validate_Phone_Number(e.target.value);
                // if(phoneValidate){
                setphone_number(e.target.value)
                /* }else{
                     setState(prev => ({
                         ...prev,
                         usernameError: `${t("emailError")}`
                     }))
                 }*/

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

        if (e.target.name != "username") {
            setState(prev => ({
                ...prev,
                [e.target.name]: e.target.value
            }))
        }
    }

    const forgotPassword = async () => {
        //console.log("username========",username)
        //console.log("phone_number========",phone_number)


        if (validationForEmail()) {
            try {
                /*const user = await Auth.forgotPassword(username);
                Utility.toastNotifications(`Verification code sent successfully to ${username}`, "Success", "success")
                this.setState({
                    hideShowChangePasswordPanel: false
                })*/

                let data = {}
                if (username != "") {
                    data['username'] = username;
                }
                if (username == "") {
                    data['username'] = phone_number;
                }
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
        const { passwordResetCode, password } = state;
        //const { history, loaderStateTrue, loaderStateFalse, logOutApp } = props;
        if (validationForPasswordChange()) {
            try {
                let data = {}

                if (username != "") {
                    data['email'] = username;
                }
                if (username == "") {
                    data['email'] = phone_number;
                }


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
        //const { username, password, phone_number } = state;
        let emailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username);
        if (emailValidate || phone_number != "") {
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
                passwordError: "Password doesn't match",
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

    const lanOnSelect = (lng) => {
        let confirmation = false;
        confirmation = window.confirm('Are you sure, you want to reload?');
        if (confirmation) {
            i18n.changeLanguage(lng);
            let splitUrl = props.match.url.split('/');
            props.history.push(`/${lng}/${splitUrl[2]}`);
            window.location.reload();
        }

    }

    return (
        <div className="appContainer">
            <div className="loginBackground ForgotPage">
                <div className={hideShowChangePasswordPanel == false ? "appContainerInner appContainerInnerForgot" : "appContainerInner appContainerInnerForgot appContainerInnerRetype"}>
                    <div className="left_section login_box_inner white_background forgotpass">
                        <div className="logo-box-inner">
                            <div className="titleposition">
                                <img src={require('../../Utility/Public/images/logoNew.png')} className="logoInner" />
                                <h3 className="titletwo">Dashboard</h3>
                            </div>
                        </div>
                        <div className="itemsContainer login_left_inner">
                            <div className="forgotFormDiv">
                                {hideShowChangePasswordPanel == false ?
                                    <div>
                                        <CustomInput
                                            parentClassName="loginFormInnerDiv input_field_small_size emaillabel"
                                            onChange={handleChange}
                                            name="username"
                                            value={username != "" ? username : phone_number}
                                            labelName='User Name'
                                            errorLabel={state.usernameError}
                                            labelPresent={true}
                                            requiredStar={false}
                                        //placeholder="Nom ou adresse email"
                                        />
                                        <div className="forgor_btn_inner_div">
                                            <button className="login-btn btn btn-primary" onClick={forgotPassword}>Reset Password</button>
                                        </div>
                                        <div className="back_inner_div">
                                            <p className="backtolog" onClick={back_to_login}><span>Back to log in screen</span></p>
                                        </div>
                                    </div> :
                                    <div>
                                        <CustomInput
                                            parentClassName="loginFormInnerDiv input_field_small_size email_disable_field"
                                            name="username"
                                            value={state.username}
                                            //labelName="Mail"
                                            //errorLabel={this.state.usernameError}
                                            readOnly={true}
                                            //labelPresent={true}
                                            placeholder='Email Id'
                                        />
                                        <CustomInput
                                            parentClassName="loginFormInnerDiv input_field_small_size"
                                            onChange={handleChange}
                                            name="passwordResetCode"
                                            value={state.passwordResetCode}
                                            //labelName="Verification code"
                                            placeholder='Verification code'
                                            errorLabel={state.passwordResetCodeError}
                                        //labelPresent={true}
                                        />
                                        <CustomInput
                                            parentClassName="loginFormInnerDiv input_field_small_size"
                                            onChange={handleChange}
                                            name="password"
                                            type="password"
                                            value={state.password}
                                            //labelName="New password"
                                            errorLabel={state.passwordError}
                                            //labelPresent={true}
                                            placeholder='New password'
                                        />
                                        <CustomInput
                                            parentClassName="loginFormInnerDiv input_field_small_size"
                                            onChange={handleChange}
                                            name="retypePassword"
                                            type="password"
                                            value={state.retypePassword}
                                            //labelName="Retype new password"
                                            placeholder='Repeat new password'
                                            errorLabel={state.retypePasswordError}
                                        //labelPresent={true}
                                        />
                                        <div className="forgor_btnBoxes forgotpassmodify">
                                            <div className="forgor_btn_inner_div bottom15">
                                                <button className="login-btn btn btn-primary" onClick={requestForNewPassword}>Change Password</button>
                                            </div>
                                            <div className="forgor_btn_inner_div resendcodebtn">
                                                <button className="login-btn btn btn-primary resendverificationbtn" onClick={forgotPassword}>Resend verification code</button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="loglan langdropdown">
                            {/* <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" >
                                <span>EN</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="en">EN</Dropdown.Item>
                                <Dropdown.Item eventKey="fr">FR</Dropdown.Item>
                            </Dropdown.Menu>
                       </Dropdown>*/}
                            {/* <Dropdown onSelect={lanOnSelect}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                                    {localStorage.getItem('i18nextLng').toUpperCase()}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="en">EN</Dropdown.Item>
                                    <Dropdown.Item eventKey="fr">FR</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> */}
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

export default connect(mapStateToProps, { loaderStateTrue, loaderStateFalse, setToken, logOutApp })(withRouter(ForgotPassword));