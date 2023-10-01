import React, { Component } from 'react';
import CustomInput from '../Components/CustomInput';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { setToken, logOutApp } from '../../Login/Actions/LoginAction';
import { loaderStateTrue, loaderStateFalse } from '../../Actions/AllAction';
import * as UtilityController from '../Controller/UtilityController';
import Utility from '../Utility'


class ChangePasswordContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userEmail: "",
			password: "",
			newPassword: "",
			confirmPassword: "",
			userEmailError: "",
			passwordError: "",
			newPasswordError: "",
			confirmPasswordError: ""
		}
	}

	handleChangeUserData = (event, type) => {
		/*if (type == "userEmail") {
			if (event != "") {
				this.setState({
					userEmail: event.target.value,
					userEmailError: "",
				})
			} else {
				this.setState({
					userEmail: event.target.value,
					userEmailError: "Required field"
				})
			}
		}*/
		if (type == "password") {
			if (event != "") {
				this.setState({
					password: event.target.value,
					passwordError: "",
				})
			} else {
				this.setState({
					password: event.target.value,
					passwordError: "Required field"
				})
			}
		}
		if (type == "newPassword") {
			if (event != "") {
				this.setState({
					newPassword: event.target.value,
					newPasswordError: "",
				})
			} else {
				this.setState({
					newPassword: event.target.value,
					newPasswordError: "Required field"
				})
			}
		}
		if (type == "confirmPassword") {
			if (event != "") {
				this.setState({
					confirmPassword: event.target.value,
					confirmPasswordError: "",
				})
			} else {
				this.setState({
					confirmPassword: event.target.value,
					confirmPasswordError: "Required field"
				})
			}
		}
		this.setState({
		}, () => {
			//console.log("onchange password========", this.state.password)
			//console.log("onchange newPassword========", this.state.newPassword)
			//console.log("onchange confirmPassword========", this.state.confirmPassword)
		})
	}

	validchangePasswordForm = () => {
		const { t } = this.props;
		let valid = true;

		if (this.state.password == "") {
			valid = false;
			this.setState({
				passwordError: 'Required field'
			})
		}
		if (this.state.newPassword == "") {
			valid = false;
			this.setState({
				newPasswordError: 'Required field'
			})
		}
		if (this.state.confirmPassword == "") {
			valid = false;
			this.setState({
				confirmPasswordError: 'Required field'
			})
		}

		if (this.state.newPassword != "" && this.state.confirmPassword != "") {

			let passwordValidate = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-+“!@#%&/,><\’:;|_~`])\S{6,99}$/.test(this.state.newPassword);

			if (passwordValidate) {
				this.setState({
					newPasswordError: ''
				})
			} else {
				valid = false;
				this.setState({
					newPasswordError: 'This field is invalid'
				})
				Utility.toastNotifications(`<ul className='password-inner-box'>
				<li><b>Minimum length</b>, which must be at least 6 characters but fewer than 99 characters</li>
				<li><b>Require numbers</b></li>
				<li><b>Require a special character</b> from this set: = + - ^ $ * . [ ] { } ( ) ?  ! @ # % & / \ , > < ' : ; | _ ~ </li>
				<li><b>Require uppercase letters</b></li>
				<li><b>Require lowercase letters</b></li>
				</ul>`, `Password error`, "longError");
			}


			let CpasswordValidate = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-+“!@#%&/,><\’:;|_~`])\S{6,99}$/.test(this.state.confirmPassword);

			if (CpasswordValidate) {
				this.setState({
					confirmPasswordError: ''
				})
			} else {
				valid = false;
				this.setState({
					confirmPasswordError: 'This field is invalid'
				})
				Utility.toastNotifications(`<ul className='password-inner-box'>
				<li><b>Minimum length</b>, which must be at least 6 characters but fewer than 99 characters</li>
				<li><b>Require numbers</b></li>
				<li><b>Require a special character</b> from this set: = + - ^ $ * . [ ] { } ( ) ?  ! @ # % & / \ , > < ' : ; | _ ~ </li>
				<li><b>Require uppercase letters</b></li>
				<li><b>Require lowercase letters</b></li>
				</ul>`, `Confirm password error`, "longError");
			}

			if (this.state.newPassword == this.state.confirmPassword && this.state.newPassword != "" && this.state.confirmPassword != "") {
				this.setState({
					newPasswordError: '',
					confirmPasswordError: ''
				})
			} else {
				valid = false;
				Utility.toastNotifications('Password and Confirm password does not match', "Error", "error");
			}
		}



		return valid;
	}

	changePasswordfromSubmitData = () => {
		let valid = this.validchangePasswordForm();
		//console.log("valid------------>>>>>>",valid)
		if (valid) {
			const { loaderStateTrue, loaderStateFalse } = this.props;
			let data = {

				"pre_password": this.state.password,

				"new_password": this.state.newPassword

			};
			//return false;
			loaderStateTrue();
			UtilityController.userNewPasswordChange(data).then((response) => {
				//console.log("response---------->", response)
				loaderStateFalse();
				if (response.success) {
					//console.log("response.success===============>>>>>", response.success)
					Utility.toastNotifications(response.message, "Success", "success");
					this.props.closeChangePassword();
				}

			}).catch((error) => {
				console.error("************error*************", error)
				if (error) {
					//Utility.toastNotifications(error.message, "Error", "error");
				}
				loaderStateFalse();
				if (error.message == "Network Error") {
					/*Utility.toastNotifications("Please login", "Error", "error");
					this.props.logOutApp().then(
						() => this.props.history.push("/")
					);*/
				}
			});
		}
	}
	render() {
		const { t, closeChangePassword, userCredentials } = this.props;
		let user_email = "";
		if (userCredentials && userCredentials.user_details && userCredentials.user_details.user_email != "") {
			user_email = userCredentials.user_details.user_email
		}

		if (user_email == "" && userCredentials && userCredentials.user_details && userCredentials.user_details.contact_number != "") {
			user_email = userCredentials.user_details.contact_number
		}
		return (
			<>
				<div className="modalinnerbody">
					<div className="change_password_row_body">
						<div className="change_password_row">
							<CustomInput
								parentClassName="comment_input_field"
								//errorLabel={this.state.userEmailError}
								name="userEmail"
								type="text"
								value={user_email}
								//labelPresent={true}
								onChange={(e) => this.handleChangeUserData(e, "userEmail")}
								readOnly={true}
							/>
						</div>
						<div className="change_password_row">
							<CustomInput
								parentClassName="comment_input_field"
								errorLabel={this.state.passwordError}
								name="password"
								type="password"
								value={this.state.password}
								//labelPresent={true}
								onChange={(e) => this.handleChangeUserData(e, "password")}
								placeholder='Enter Current Password'
							//readOnly={true}
							/>
						</div>
						<div className="change_password_row">
							<div className="input-field-full-box">
								<CustomInput
									parentClassName="comment_input_field"
									errorLabel={this.state.newPasswordError}
									name="newPassword"
									type="password"
									value={this.state.newPassword}
									//labelPresent={true}
									onChange={(e) => this.handleChangeUserData(e, "newPassword")}
									placeholder='Enter New Password'
								//readOnly={true}
								/>
							</div>
						</div>
						<div className="change_password_row">
							<div className="input-field-full-box">
								<CustomInput
									parentClassName="comment_input_field"
									errorLabel={this.state.confirmPasswordError}
									name="confirmPassword"
									type="password"
									value={this.state.confirmPassword}
									//labelPresent={true}
									onChange={(e) => this.handleChangeUserData(e, "confirmPassword")}
									placeholder='Re-Enter Password'
								//readOnly={true}
								/>
							</div>
						</div>
					</div>
					<div className="col-md-12 modfooterbtn">
						<button type="button" className="savebtn" onClick={this.changePasswordfromSubmitData}>Submit</button>
						<button type="button" className="cancelbtn" onClick={this.props.closeChangePassword}>Cancel</button>
					</div>
				</div>
			</>
		);
	}
}

ChangePasswordContent.propTypes = {
	show: PropTypes.bool,
	onHide: PropTypes.func,
	className: PropTypes.string,
	headerclassName: PropTypes.string,
	bodyClassName: PropTypes.string,
	headerContent: PropTypes.string,
	formData: PropTypes.object,
	errorData: PropTypes.object,
	handleChange: PropTypes.func,
	submit: PropTypes.func
}

ChangePasswordContent.defaultProps = {
	className: "change_password_modal",
	headerclassName: "close_btn_icon",
	buttonClassName: "btn btn-primary",
	headerContent: "Change Password",
	BodyContent: "",
	buttonContent: "",
	bodyClassName: ""
}

const mapStateToProps = (globalState) => {
	return {
		userCredentials: globalState.LoginReducer.userCredentials
	};
}


export default withRouter(connect(mapStateToProps, { loaderStateTrue, loaderStateFalse, setToken })
	(withTranslation()(ChangePasswordContent)));