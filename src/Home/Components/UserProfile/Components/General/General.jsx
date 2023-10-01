import React, { Component } from 'react';
import CustomInput from '../../../../../Utility/Components/CustomInput';
import PhoneNumberWithCountryCode from '../../../../../Utility/Components/PhoneNumberWithCountryCode';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { loaderStateTrue, loaderStateFalse } from '../../../../../Actions/AllAction';
import { setToken, setUserCredentials, logOutApp, userrole } from '../../../../../Login/Actions/LoginAction';
import * as GeneralController from './Controller/GeneralController'
import Utility from '../../../../../Utility/Utility';
import moment from 'moment';
import HomeUtility from '../../../../Utility/Utility'
import Config from '../../../../../Utility/Config'
import ErrorBoundary from '../../../../../Utility/Components/ErrorBoundary';


class General extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mailAddress: "",
			contact_number: "",
			first_name: "",
			last_name: "",
			setEditDataSet: {},
			organisationList: [],
			contactNumberHandleChangeFlag: false,

			generalTabFormData: {
				mailAddress: "",
				contact_number: "",
				first_name: "",
				last_name: "",
			},
			mailAddressError: "",
			contact_number_error: "",
			offset: "",
			limit: "",
		}

	}


	componentDidMount = () => {
		this.props.detectChangesIndividualTab(false)
		this.props.detectChangesIndividualInnerTab(false)
		this.userDetails()
		this.organisation()
	}



	focusInput(callform, e) {
		if (callform == 'mailAddress') {
			document.getElementById("mailAddress").focus();
		}
	}

	userDetails = () => {
		const { loaderStateTrue, loaderStateFalse, userProfileId } = this.props;
		//let filters = {}
		//let dateHash = {}
		//dateHash["current_date_time"] = moment().format('YYYY-MM-DD HH:mm:ss');
		//filters['filters'] = dateHash
		loaderStateTrue();
		GeneralController.user_Details(userProfileId).then((response) => {
			//console.log("response------------------------------->>>>>", response)
			if (response.success) {
				this.setUserData(response.data[0])
			}
			loaderStateFalse();
		}).catch((error) => {
			console.error("************error*************", error)
			if (error) {
				//Utility.toastNotifications(error.message, "Error", "error");
			}
			loaderStateFalse();
			if (error.message == "Network Error") {

			}
		});
	}


	setUserData = (userData) => {
		const { selectedTrainer, selectedCoach, generalTabFormData } = this.state;
		let tempgeneralTabFormData = Object.assign({}, generalTabFormData)
		//console.log("userData========>", userData)
		tempgeneralTabFormData['mailAddress'] = userData.user_details.email;
		tempgeneralTabFormData['contact_number'] = userData.user_details.contact_number;
		tempgeneralTabFormData['first_name'] = userData.user_details.first_name;
		tempgeneralTabFormData['last_name'] = userData.user_details.last_name;
		this.setState({
			mailAddress: userData.user_details.email,
			contact_number: userData.user_details.contact_number,
			first_name: userData.user_details.first_name,
			last_name: userData.user_details.last_name,
			generalTabFormData: tempgeneralTabFormData
		}, () => {
		})

	}

	organisation = () => {
		// console.log('-------------enter----------------organisation--------------')
		const { loaderStateTrue, loaderStateFalse } = this.props;
		loaderStateTrue();
		GeneralController.organisation().then((response) => {
			if (response.success) {
				let organisationArry = [];
				response.data.map((endata) => {
					let organisationHash = {};
					organisationHash['label'] = endata.name;
					organisationHash['value'] = endata.id;
					organisationArry.push(organisationHash);
				})
				this.setState({
					organisationList: organisationArry
				}, () => {
					//this.department();
				})
			}
			loaderStateFalse();
		}).catch((error) => {
			console.error("************error*************", error)
			if (error) {
				//Utility.toastNotifications(error.message, "Error", "error");
			}
			loaderStateFalse();
			if (error.message == "Network Error") {
				// Utility.toastNotifications("Please login", "Error", "error");
				// this.props.logOutApp().then(
				//     () => this.props.history.push("/")
				// );
			}
		});
	}


	generalfromSubmitData = () => {
		// this.trainerAndCoachUpdate();
		this.updatePhoneNumberFn()

	}

	validGeneralContactNumber = (contactNumber) => {
		if (contactNumber != "") {
			if (!HomeUtility.validate_Phone_Number_without_plus(Config.phoneNumberWithoutPlus + contactNumber)) {
				this.setState({
					contact_number_error: 'Enter valid contact number'
				})
				return false;
			} else {
				this.setState({
					contact_number_error: ""
				})
				return true;
			}
		} else {
			return false;
		}
	}

	updatePhoneNumberFn = () => {
		const { contact_number } = this.state;
		let contactNumberValid = HomeUtility.validate_Phone_Number_without_plus(contact_number);
		if (contactNumberValid) {
			const { loaderStateTrue, loaderStateFalse } = this.props;
			let obj = {
				"contact_number": contact_number
			}
			let type = 'patch'
			loaderStateTrue();

			GeneralController.userContactNumberUpdate(obj, type, this.props.userProfileId).then((response) => {
				// console.log("response============>", response)
				loaderStateFalse();
				if (response) {
					if (response.success) {
						this.props.detectChangesIndividualTab(false)
						this.props.detectChangesIndividualInnerTab(false)
						//this.userRoleIDFetch()
						//this.enterprise()
						this.userDetails()
						this.props.userDetails()
						this.setState({
							contactNumberHandleChangeFlag: false
						}, () => {
						})
						Utility.toastNotifications(response.message, "Success", "success");
					} else {
						Utility.toastNotifications(response.message, "Error", "error")
					}
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



	validGeneralEmail = (email) => {
		if (email != "") {
			var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
			if (!expr.test(email)) {
				this.setState({
					mailAddressError: 'Enter valid email'
				})
				return false;
			} else {
				this.setState({
					mailAddressError: ""
				})
				return true;
			}
		} else {
			return false;
		}
	}

	trainerAndCoachUpdate = () => {
		//alert("1")
		const { mailAddress } = this.state;
		let emailvalid = this.validGeneralEmail(mailAddress);
		if (emailvalid) {
			const { loaderStateTrue, loaderStateFalse } = this.props;
			let obj = {
				"email": mailAddress
			}

			let type = 'patch'

			loaderStateTrue();
			GeneralController.userTrainerAndCoachUpdate(obj, type, this.props.userProfileId).then((response) => {
				//console.log("response============>",response)
				loaderStateFalse();
				if (response) {
					if (response.success) {
						this.props.detectChangesIndividualTab(false)
						this.props.detectChangesIndividualInnerTab(false)
						//this.userRoleIDFetch()
						//this.enterprise()
						this.userDetails()
						this.props.userDetails()
						Utility.toastNotifications(response.message, "Success", "success");
					} else {
						Utility.toastNotifications(response.message, "Error", "error")
					}
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

	validgeneralTab = () => {
		const { generalTabFormData } = this.state;
		//console.log("generalTabFormData======", generalTabFormData)
		let valid = true;

		if (generalTabFormData.role == "") {
			valid = false;
			this.setState({
				roleError: 'Required field'
			})
		}


		return valid;
	}

	cancelChangesGeneralTab = () => {
		// this.props.detectChangesIndividualTab(false)
		// this.props.detectChangesIndividualInnerTab(false)
		// //this.userRoleIDFetch();
		this.props.detectChangesIndividualTab(false)
		this.props.detectChangesIndividualInnerTab(false)
		this.userDetails()
		this.organisation()
		this.setState({
			contactNumberHandleChangeFlag: false,
			contact_number_error: ""
		}, () => { })
	}


	closeRolesModal = () => {
		this.setState({
			setEditDataSet: {},

		})
	}

	genHandleChange = (e) => {
		// console.log(e.target.value)
		this.props.detectChangesIndividualTab(true)
		this.props.detectChangesIndividualInnerTab(true)
		const { name, value } = e.target;
		const { generalTabFormData } = this.state;
		if (name == "mailAddress") {
			generalTabFormData['mailAddress'] = value;
			this.setState({
				mailAddress: value,
				mailAddressError: "",
				generalTabFormData
			}, () => {
				// console.log("mailAddress-------->>>>>", this.state.mailAddress)
			})
		}
		if (name == "contactNumber") {
			// console.log('value-------------------------->', value)
			if (value != '') {
				let phoneValidate = HomeUtility.validate_Phone_Number(value);
				// console.log('phoneValidate-------------------------->', phoneValidate)
				if (phoneValidate) {
					generalTabFormData['contact_number'] = value;
					this.setState({
						contact_number: value,
						contact_number_error: "",
						generalTabFormData
					}, () => {
						// console.log("contact_number-------->>>>>", this.state.contact_number)
					})
				} else {
					this.setState({
						contact_number: value,
						contact_number_error: "Enter valid contact number"
					}, () => {

					})

				}

			} else {
				generalTabFormData['contact_number'] = value;
				this.setState({
					contact_number: value,
					contact_number_error: "Required field",
					generalTabFormData
				}, () => {
					// console.log("contact_number-------->>>>>", this.state.contact_number)
				})
			}
			this.setState({
				contactNumberHandleChangeFlag: true
			}, () => {
				// console.log("contactNumberHandleChangeFlag-------->>>>>", this.state.contactNumberHandleChangeFlag)
			})
		}
	}


	phoneNumberInputHandleChangeFn = (phone_number) => {
		const { contact_number, generalTabFormData } = this.state;
		let phoneNumberTemp = contact_number
		if (phone_number != "") {
			let phoneValidate = HomeUtility.validate_Phone_Number_without_plus(phone_number);
			// console.log("phoneValidate======", phoneValidate)
			if (phoneValidate) {
				generalTabFormData['contact_number'] = phone_number;
				this.setState({
					contact_number: phone_number,
					contact_number_error: "",
					generalTabFormData
				}, () => {
					// console.log("contact_number-------->>>>>", this.state.contact_number)
				})
				phoneNumberTemp = phone_number;
				this.setState({
					contact_number_error: ""
				}, () => {
				})
			} else {
				phoneNumberTemp = phone_number;
				this.setState({
					contact_number_error: "Enter valid phone number",
				})
			}
		} else {
			// generalTabFormData['contact_number'] = phone_number;
			phoneNumberTemp = "";
			// generalTabFormData
		}
		this.setState({
			contact_number: Config.phoneNumberWithOrwithoutPlus + '' + phoneNumberTemp,
			contactNumberHandleChangeFlag: true
		}, () => {
			// generalTabFormData['contact_number'] = Config.phoneNumberWithOrwithoutPlus + '' + phoneNumberTemp,

		})
	}


	readWritePermissionToppriority = (eventKey) => {
		//priority W->R->''/None
		const { t, roleWisePermission } = this.props;
		let permission_str = roleWisePermission[eventKey].read_write_permission.toString();
		if (permission_str.toUpperCase().split("").includes("W")) return "W"
		return "R"
	}

	render() {
		// console.log('props-------organisationList--------------->', this.props.selectedRowsData.user_type);
		const { t, roleWisePermission } = this.props;
		let roleName = this.props.userCredentials.hasOwnProperty('user_details') && this.props.userCredentials.user_details && this.props.userCredentials.user_details.hasOwnProperty('role_name') && this.props.userCredentials.user_details.role_name;

		return (
			<div className="profilecontainer profilepersonalcon userWrite general_profilepersonalcon">
				<div className="inputviewinner">
					<div className="jbssadn_en_ndassbj">
						<div className="inputrowbox inputrowboxodd">
							<div className="inputlabelview">First name</div>
							<div className="inputfieldview">
							<ErrorBoundary title="CustomInput Error">
								<CustomInput
									parentClassName="input_field_inner"
									//errorLabel={this.props.genRoleError}
									//name="mailAddress"
									type="text"
									//value={this.props.userEmail}
									value={this.state.first_name}
									//labelPresent={true}
									onChange={this.genHandleChange}
									//placeholder=""
									readOnly={true}
								//id="mailAddress"
								/>
								</ErrorBoundary>
							</div>
							{/* <div className="editicon"><i className="fa fa-pencil" aria-hidden="true"></i></div> */}
						</div>
						<div className="inputrowbox inputrowboxodd">
							<div className="inputlabelview">Last Name</div>
							<div className="inputfieldview">
							<ErrorBoundary title="CustomInput Error">
								<CustomInput
									parentClassName="input_field_inner"
									//errorLabel={this.props.genRoleError}
									//name="mailAddress"
									type="text"
									value={this.state.last_name}
									//value={this.state.mailAddress}
									//labelPresent={true}
									onChange={this.genHandleChange}
									//placeholder=""
									readOnly={true}
								//id="mailAddress"
								/>
								</ErrorBoundary>
							</div>
							{/* <div className="editicon"><i className="fa fa-pencil" aria-hidden="true"></i></div> */}
						</div>
						<div className={this.state.mailAddressError != "" ? "inputrowbox inputrowboxodd  showerror" : "inputrowbox inputrowboxodd "}>
							<div className="inputlabelview">Mail address</div>
							<div className="inputfieldview">
							<ErrorBoundary title="CustomInput Error">
								<CustomInput
									parentClassName="input_field_inner"
									//errorLabel={this.props.genRoleError}
									name="mailAddress"
									type="text"
									//value={this.props.userEmail}
									value={this.state.mailAddress}
									//labelPresent={true}
									//onChange={genHandleChange}
									onChange={this.genHandleChange}
									//placeholder=""
									readOnly={true}
									id="mailAddress"
								/>
								</ErrorBoundary>
							</div>
							{/* <div className="editicon" onClick={this.focusInput.bind(this, 'mailAddress')}><i className="fa fa-pencil" aria-hidden="true"></i></div> */}
						</div>
						<div className="inputrowbox inputrowboxodd">
							<div className="inputlabelview">Phone Number</div>
							<div className="inputfieldview ">
							<ErrorBoundary title="PhoneNumberWithCountryCode Error">
								<PhoneNumberWithCountryCode
									disabled={roleName == "app_admin" || this.props.userProfileId == this.props.userCredentials.id ? false : true}
									country={Config.phoneNumberCountrySeet}
									value={this.state.contact_number}
									onChange={this.phoneNumberInputHandleChangeFn}
									error={this.state.contact_number_error}
									labelShow={false}
								/>
								</ErrorBoundary>
							</div>
							{roleName == "app_admin" || this.props.userProfileId == this.props.userCredentials.id ?
								<div className="editicon"><i className="fa fa-pencil" aria-hidden="true"></i></div> : <div></div>}
						</div>

						<div className="inputrowbox inputrowboxodd">
							<div className="inputlabelview">Role</div>
							<div className="inputfieldview ">
							<ErrorBoundary title="CustomInput Error">
								<CustomInput
									parentClassName="input_field_inner"
									// errorLabel={this.state.contact_number_error}
									name="Role"
									type="text"
									value={this.props.selectedRowsData.hasOwnProperty('user_type') && this.props.selectedRowsData.user_type != "" && this.props.selectedRowsData.user_type != null ? (this.props.selectedRowsData.user_type).charAt(0).toUpperCase() + (this.props.selectedRowsData.user_type).slice(1) : ""}
									//labelPresent={true}
									onChange={this.genHandleChange}
									//placeholder=""
									readOnly={true}
								//id="mailAddress"
								/>
									</ErrorBoundary>
								{/* <div className="errorClass error_div">{this.state.contact_number_error}</div> */}
							</div>
							{/* {roleName == "app_admin" || this.props.userProfileId == this.props.userCredentials.id ?
								<div className="editicon"><i className="fa fa-pencil" aria-hidden="true"></i></div> : <div></div>} */}
						</div>

					</div>
				</div>
				<div className="rightsideview">
					{this.state.contactNumberHandleChangeFlag
						?
						<button type="button" className="submitbtnprofile" onClick={this.generalfromSubmitData}>Submit</button>
						: null}
					{this.state.contactNumberHandleChangeFlag
						?
						<button type="button" className="cancelbtn" onClick={this.cancelChangesGeneralTab}>Cancel</button>
						: null}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (globalState) => {
	return {
		userCredentials: globalState.LoginReducer.userCredentials,
		roleWisePermission: globalState.mainReducerData.roleWisePermission

	};
}

export default withRouter(connect(mapStateToProps, { loaderStateTrue, loaderStateFalse, setToken, setUserCredentials, logOutApp })
	(withTranslation()(General)));