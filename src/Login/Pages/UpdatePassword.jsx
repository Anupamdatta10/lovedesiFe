import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loaderStateTrue, loaderStateFalse, handleActiveLink } from '../../Actions/AllAction';
import { setToken, setUserCredentials, logOutApp } from '../Actions/LoginAction';

import { withRouter } from 'react-router';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import * as LoginController from '../Controller/LoginController';
import { Modal } from 'react-bootstrap';
import Utility from '../../Utility/Utility'

class UpdatePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //modal
            modalShow: false,
            updatedPasswordSession: "",
            challangeName: "",
            userName: "",
            email: "",
            password: ""
        }
    }

    componentDidMount() {
        this.setParam();
    }

    setParam = () => {
        this.setState({
            email: this.props.match.params.email,
            password: this.props.match.params.password
        }, () => {
            this.login()
        })
    }

    login = () => {
        const { loaderStateTrue, loaderStateFalse, logOutApp, t } = this.props;

        const { email, password } = this.state;
        loaderStateTrue();
        let data = {}
        data["email"] = email
        data["password"] = password
        LoginController.loginGetApi(data).then((response) => {
            loaderStateFalse();
            if (response) {
                if (response.success) {
                    //new password set
                    if (response.data.challengeName == "NEW_PASSWORD_REQUIRED") {
                        this.setState({
                            modalShow: true,
                            updatedPasswordSession: response.data.session,
                            challangeName: response.data.challengeName,
                            userName: response.data.username
                        })
                    }
                } else {
                    if (response.message == "User does not exist.") {
                        Utility.toastNotifications('Incorrect  email/ password. Please try again.', "Error", "error")
                    } else {
                        Utility.toastNotifications('Something went wrong !', "Error", "error")
                    }

                }
            }
        }).catch((error) => {
            loaderStateFalse();

        });


    }

    handleClose = () => {
        loaderStateFalse();
        this.setState({
            modalShow: false,
            updated_password: "",
            updated_confirm_password: ""
        })
    }

    handleChange = (event) => {

        if (event.target.name == "updated_password") {
            this.setState({
                updated_passwordError: ""
            })
        }
        if (event.target.name == "updated_confirm_password") {
            this.setState({
                updated_comfirm_passwordError: ""
            })
        }
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    updatePassword = () => {
        const { updated_password, updated_confirm_password, userName, updatedPasswordSession, challangeName } = this.state;
        let valid = this.updatePasswordCheck();
        if (valid) {
            loaderStateTrue();
            let header = {};
            header["session"] = updatedPasswordSession;
            let data = {
                "email": userName,
                "password": updated_password,
                //session:session,
                "challengeName": challangeName
            }
            LoginController.forcePasswordChange(data, header).then((response) => {
                if (response) {
                    if (response.success) {
                        Utility.toastNotifications(response.message, "Success", "success")
                        Utility.toastNotifications(response.message, "Success", "success")
                        const finalIdToken = response.data.tokenType + ' ' + response.data.idToken;
                        const accessToken = response.data.accessToken
                        const refreshToken = response.data.refreshToken
                        const expiresIn = LoginUtility.getExpiryDetails(response.data.expiresIn)
                        this.props.setToken(finalIdToken, accessToken, expiresIn, refreshToken).then(() => {
                            this.props.logOutApp().then(
                                () => history.push("/")
                            );
                        })
                    } else {
                        loaderStateFalse();
                    }
                }
            }).catch((error) => {
                //Utility.toastNotifications(error.message, "Error", "error")
                this.props.logOutApp().then(
                    () => history.push("/")
                );
            });
        }
    }

    updatePasswordCheck = () => {
        let valid = true;
        const { updated_password, updated_confirm_password } = this.state;

        let passwordValidate = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-+“!@#%&/,><\’:;|_~`])\S{6,99}$/.test(updated_password);

        if (passwordValidate) {
            this.setState({
                updated_passwordError: ''
            })
        } else {
            valid = false;
            this.setState({
                updated_passwordError: 'This field is invalid'
            })
            Utility.toastNotifications(`<ul className='password-inner-box'>
            <li><b>Minimum length</b>, which must be at least 6 characters but fewer than 99 characters</li>
            <li><b>Require numbers</b></li>
            <li><b>Require a special character</b> from this set: = + - ^ $ * . [ ] { } ( ) ?  ! @ # % & / \ , > < ' : ; | _ ~ </li>
            <li><b>Require uppercase letters</b></li>
            <li><b>Require lowercase letters</b></li>
          </ul>`, "Password error", "longError");
        }


        let CpasswordValidate = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-+“!@#%&/,><\’:;|_~`])\S{6,99}$/.test(updated_confirm_password);

        if (CpasswordValidate) {
            this.setState({
                updated_comfirm_passwordError: ''
            })
        } else {
            valid = false;
            this.setState({
                updated_comfirm_passwordError: 'This field is invalid'
            })
            Utility.toastNotifications(`<ul className='password-inner-box'>
            <li><b>Minimum length</b>, which must be at least 6 characters but fewer than 99 characters</li>
            <li><b>Require numbers</b></li>
            <li><b>Require a special character</b> from this set: = + - ^ $ * . [ ] { } ( ) ?  ! @ # % & / \ , > < ' : ; | _ ~ </li>
            <li><b>Require uppercase letters</b></li>
            <li><b>Require lowercase letters</b></li>
          </ul>`, "Confirm password error", "longError");
        }

        if (updated_password == updated_confirm_password && updated_password != "" && updated_confirm_password != "") {
            this.setState({
                updated_passwordError: '',
                updated_comfirm_passwordError: ''
            })
        } else {
            valid = false;
            Utility.toastNotifications("Password and Confirm password does not match", "Error", "error");
        }

        return valid;

    }


    render() {
        const { t } = this.props;
        return (
            <div className="homepagecontainer dashboardcontainer">
                <Modal
                    show={this.state.modalShow}
                    onHide={this.handleClose}
                    //backdrop="static"
                    //keyboard={false}
                    className="forcePasswordChange"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Change Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="passwordRow">
                            <input type={this.state.passtype} onChange={this.handleChange} name="updated_password" value={this.state.updated_password} placeholder='Update password' className="input__fields_property" />
                            <div className="col-md-12 errorClass error_div">{this.state.updated_passwordError}</div>
                        </div>
                        <div className="passwordRow">
                            <input type={this.state.confirmPasstype} onChange={this.handleChange} name="updated_confirm_password" value={this.state.updated_confirm_password} placeholder='Confirm Updated Password' className="input__fields_property" />
                            <div className="col-md-12 errorClass error_div">{this.state.updated_comfirm_passwordError}</div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}




const mapStateToProps = (globalState) => {
    return {
        userCredentials: globalState.mainReducerData.userCredentials,
        token: globalState.mainReducerData.token,
        access_token: globalState.mainReducerData.access_token
    };
}


export default withRouter(connect(mapStateToProps, { handleActiveLink, loaderStateTrue, loaderStateFalse, setToken, setUserCredentials, logOutApp })
    (withTranslation()(UpdatePassword)));