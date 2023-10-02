import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loaderStateTrue, loaderStateFalse, handleLeft } from '../../Actions/AllAction';

import { setToken, logOutApp, setUserCredentials } from '../../Login/Actions/LoginAction';


import ReactTooltip from 'react-tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import CustomInput from '../Components/CustomInput';
import Config from '../Config'
import * as UtilityController from '../Controller/UtilityController';
import { withRouter } from 'react-router';

import LoadingOverlay from 'react-loading-overlay';
import BeatLoader from 'react-spinners/BeatLoader';

import ModalGlobal from './ModalGlobal';
import ConfirmationAlert from './ConfirmationAlert';
import ChangePasswordContent from './ChangePasswordContent';
import AutosuggestComponent from '../Components/AutosuggestComponent';
import AlertNotification from '../Components/AlertNotification';

class Header extends Component {
	constructor(props) {
		super(props)
		this.handleBar = this.handleBar.bind(this);
		this.state = {
			subheaderShow: true,
			windowWidth: window.innerWidth,
			changePasswordModalOpen: false,
			formData: {
				userEmail: "",
				password: "",
				newPassword: "",
				confirmPassword: ""
			},
			errorData: {
				userEmailError: "",
				passwordError: "",
				newPasswordError: "",
				confirmPasswordError: ""
			},

			limit: 5,
			offset: 0,
			notificationsData: [],
			showLoadmore: false,
			showPopup: false,
			notificationVisible: false,
			langaugeConfirmModal: false,
			selectedLangauge: '',
			changePasswordFlag: false,
			unreadNotificationCount: 0,
			versionOption: [],
			selectedVersionValue: [],

			//alert notification
			show: true,
			notificationData: [],
			zoominzoomoutflag: "",
		}
		this.codeOutsideClickRef = React.createRef();
	}
	logout = () => {
		const { logOutApp, history } = this.props;
		logOutApp(this.props.accessToken, this.props.token).then(() => {
			localStorage.setItem("selectedTabName", "")
			history.push("/en/login");
		})
	}

	handleResize = (e) => {
		this.setState({ windowWidth: window.innerWidth });
	};


	componentDidMount = () => {

		document.body.addEventListener('mousedown', this.handleClickOutside.bind(this));
		// console.log("componentDidMount  header----------------")
		if (this.state.show) {
			this.showNotificationGetApiCall()
		}
		//this.setVersionData();
	}
	componentWillUnmount() {
		document.body.removeEventListener('mousedown', this.handleClickOutside.bind(this));
	}




	handleClickOutside(event) {
		const concernedElement = document.querySelector(".popover_notificationParrent");
		if (concernedElement && concernedElement.contains(event.target)) {
			//console.log("click inside");
		} else {
			this.setState({
				showPopup: false,
				notificationsData: [],
				offset: 0,
				limit: 5
			})
		}



	}

	notificationsUi = () => {
		const { notificationsData } = this.state;
		//console.log("notificationsData ++++++", notificationsData)
		let notiArry = []
		if (notificationsData.length > 0) {
			notificationsData.map((value, idx) => {
				let profileImage = value.profile_img_temp;

				if (value.is_read) {
					notiArry.push(
						<div className="popover_notification_row notidivider isread" key={idx} >
							<div className="noti_icon_box">
								<img className="noti_icon" src={profileImage} />
							</div>
							<div className="noti_user_box"><span>{value.job_info.name}<em>{value.job_info.subject}</em></span></div>
						</div>
					)
				} else {
					notiArry.push(
						<div className="popover_notification_row notidivider notisread" key={idx} onClick={() => this.notificationsRead(value.id)}>
							<div className="noti_icon_box">
								<img className="noti_icon" src={profileImage} />
							</div>
							<div className="noti_user_box"><span>{value.job_info.name}<em>{value.job_info.subject}</em></span></div>
						</div>
					)
				}
			})
		}

		return notiArry;
	}

	loadMore = () => {
		const { limit, offset } = this.state;
		this.setState({
			offset: offset + limit
		}, () => {
			this.userNotifications().then((res) => {
				if (res.length > 0) {
					this.setState({
						notificationsData: [...this.state.notificationsData, ...res],
						//showLoadmore: res.total > 5 ? true : false
					}, () => {
						//console.log("notificationsData===concat", this.state.notificationsData)
						this.notificationsUi();
					})
				} else {
					this.setState({
						showLoadmore: false
					})
				}
			})
		})

	}

	userNotifications = () => {
		let promise = new Promise((resolve, reject) => {
			const { loaderStateTrue, loaderStateFalse, userCredentials } = this.props;
			const { limit, offset } = this.state;
			//console.log("userCredentials==>>", userCredentials)
			let param = {}
			if (userCredentials.id == 1) {
				param = {
					"limit": limit,
					"offset": offset,
					"type": "notification",
					"user_id": userCredentials.id
				};
			} else {
				param = {
					"limit": limit,
					"offset": offset,
					"type": "notification",
					"user_id": userCredentials.id
				};
			}

			let filters = {};
			filters['filters'] = JSON.stringify(param);

			loaderStateTrue()
			UtilityController.notifications(filters).then((res) => {
				//console.log("res=======11111111", res)
				if (res.success) {
					this.setState({
						unreadNotificationCount: res.unread_notification,
						showLoadmore: res.total > 5 ? true : false,
						showPopup: true
					})

					let promiseArr = []
					res.data.map((item, index) => {
						let userId = item.job_info.user_id;
						//console.log("userId", userId)
						let promise = new Promise((resolve, reject) => {
							this.profileImageUi(userId).then((data) => {
								// tempUserProfileDetailsHash[item.id.toString()] = data
								item["profile_img_temp"] = data
								resolve(item)
							})

						})
						promiseArr.push(promise)
					})

					//console.log("promiseArr", promiseArr)

					Promise.all(promiseArr).then((values) => {
						//console.log("values==========>", values)
						resolve(values)
					});

				}

				loaderStateFalse()
			}).catch((error) => {
				console.error("************error*************", error)
				if (error) {
					//Utility.toastNotifications(error.message, "Error", "error");
				}

				if (error.message == "Network Error") {

				}
				loaderStateFalse()
			});
		})
		return promise

	}

	profileImageUi = (id) => {
		const promise = new Promise((resolve, reject) => {
			const { loaderStateTrue, loaderStateFalse, userProfileId } = this.props;
			loaderStateTrue();
			let data = {};
			data["filters"] = JSON.stringify(Config.thumbnailSize)
			UtilityController.user_Details(id, data).then((response) => {
				if (response.success) {
					//console.log("response.data[0]========", response.data[0])
					if (response.data.length > 0) {
						let responseUserDetails = response.data[0].profile_img
						if (responseUserDetails && Object.keys(responseUserDetails).length > 0) {
							resolve(responseUserDetails.file_obj)
						} else {
							resolve(require('../Public/images/usericon.png'))
						}
					} else {
						resolve(require('../Public/images/usericon.png'))
					}
				}
				loaderStateFalse();
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
		})
		return promise;
		/*promise.then((img) => {
			console.log("img===========>",img)
			return <div className="gridusericon"><img src={img} /></div>
		})*/

	}

	notificationsRead = (id) => {

		const { loaderStateTrue, loaderStateFalse } = this.props;
		loaderStateTrue();
		let ids = {

			"ids": [id]

		};
		UtilityController.notificationsUserId(ids, "patch").then((response) => {
			//console.log()
			if (response[0].success) {
				//this.userNotifications()
				//this.leaveSyncronization()
				//this.resetDataGrid();
				//this.closeLeaveRequestModal();
				//this.clearData()
				this.showPopup()
				//Utility.toastNotifications(response.message, "Success", "success");
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



	componentWillUnmount() {
		//document.body.removeEventListener('click', this.handleOutsideClickMenuleft.bind(this));
	}


	handleOutsideClickMenuleft(e) {


		if (e.target.offsetParent) {
			if (e.target.localName != "aside") {
				if (e.target.className != "nav-link") {
					this.props.handleLeft(false);
				}
			}
		} else {

			if (e.target.parentNode.className != "nav-link") {
				//console.log("header=========",3);
				if (e.target.parentNode.className.animVal != "float-right") {
					//console.log("header=========",4);				
					//this.props.handleLeft(false);
				}
			}
			if (e.target.className.animVal == "fa-bars-menu") {
				//console.log("header=========",5);
				this.props.handleLeft(false);
			}
			if (e.target.parentNode.className.animVal == "fa-bars-menu") {
				//console.log("header=========",6);
				this.props.handleLeft(false);
			}
		}

	}
	handleBar = () => {
		this.props.handleLeft(!this.props.leftbar)
	}

	lanOnSelect = (lng) => {
		this.setState({
			langaugeConfirmModal: true,
			selectedLangauge: lng,

		})
	}


	confirmLangaugeChange = () => {

		const { selectedLangauge } = this.state;
		this.props.i18n.changeLanguage(selectedLangauge);
		let splitUrl = this.props.match.url.split('/');
		this.props.history.push(`/${selectedLangauge}/${splitUrl[2]}`);
		window.location.reload();
		this.setState({
			langaugeConfirmModal: false
		})

	}

	cancelLangaugeChange = () => {
		this.setState({
			langaugeConfirmModal: false,
		})
	}

	popover = () => (
		<Popover className="popover_notification">
			<Popover.Content>

				<div className="popover_notification_row">
					<h3 className="notititle">Notifications</h3>
				</div>

				<div>
					{this.notificationsUi()}
					{this.state.showLoadmore ?
						<div onClick={this.loadMore}>load more</div>
						: null}
				</div>


			</Popover.Content>
		</Popover>
	);

	showPopup = () => {
		this.userNotifications().then((res) => {
			//console.log("res==========", res)
			this.setState({
				notificationsData: res,
			}, () => {
				this.notificationsUi();
			})
		})
	}


	changePassword = () => {
		this.setState({
			changePasswordFlag: true
		})
	}

	closeChangePassword = () => {
		this.setState({
			changePasswordFlag: false,
			zoominzoomoutflag: ""
		})
	}


	handleVersionChange = (event) => {
		let copyObject = Object.assign({}, this.props.userCredentials);
		copyObject["user_details"]["version"] = event.label.toLowerCase();
		copyObject["user_details"]["version_id"] = event.value;
		this.props.setUserCredentials(copyObject);
	}


	//alert notification
	handleCrossButtonClick = (id) => {
		this.setState((prevState) => ({
			notificationData: prevState.notificationData.filter((error) => error.id !== id)
		}));
	};

	showNotificationGetApiCall = () => {
		let filters = {};
		let globalQueryParamshash = {};
		globalQueryParamshash["status"] = true;
		filters['filters'] = globalQueryParamshash;
		this.props.loaderStateTrue();
		UtilityController.showNotification(filters).then((response) => {
			// console.log("response--------------->", response)
			if (response.success) {
				if (response.data != null && response.data.length > 0) {
					let responseDataTempArray = [];
					let responseDataTempObj = {};
					response.data.map((e, index) => {
						responseDataTempObj = {};
						responseDataTempObj["message"] = e.message;
						responseDataTempObj["id"] = index;
						responseDataTempArray.push(responseDataTempObj)
					})
					this.setState({
						notificationData: responseDataTempArray
					})

				} else {
					this.setState({
						notificationData: []
					})
				}

			} else {
				Utility.toastNotifications("Something went wrong !", "Error", "error")
			}
			this.props.loaderStateFalse();
		}).catch((error) => {
			//console.log('----------error-------', error);
			this.props.loaderStateFalse();
		});
	}

	zoominFunction = () => {
        //console.log("-----zoom in ------------")
        let zoominzoomoutflag = "zoominzoomoutclass"
        this.setState({
            zoominzoomoutflag: zoominzoomoutflag
        })
    }
    zoomoutFunction = () => {
        //console.log("-----zoom out ------------")
        let zoominzoomoutflag = ""
        this.setState({
            zoominzoomoutflag: zoominzoomoutflag
        })
    }


	render() {
		const { userCredentials } = this.props;
		const { subheaderShow, windowWidth, changePasswordModalOpen, formData, errorData } = this.state;
		/*let profileImageLink = require('../Public/images/no_found.png');
		if (userCredentials.hasOwnProperty("custom:testjson") && userCredentials.hasOwnProperty("picture") && userCredentials["picture"] != 'null') {
			userName = JSON.parse(userCredentials["custom:testjson"]).userName
			profileImageLink = JSON.parse(userCredentials["picture"])[0].link
		}*/
		// console.log('userCredentials.user_details+++++++????????//-------------------->', userCredentials)
		// console.log('userCredentials.user_details.profile_img_url.file_obj-------------------->', userCredentials.user_details.profile_img_url.file_obj)

		let user_email = "";
		if (userCredentials && userCredentials.user_details && userCredentials.user_details.user_email != "") {
			user_email = userCredentials.user_details.user_email
		}

		if (user_email == "" && userCredentials && userCredentials.user_details && userCredentials.user_details.contact_number != "") {
			user_email = userCredentials.user_details.contact_number
		}

		let user_profile_image = "";
		if (userCredentials && userCredentials.user_details && userCredentials.user_details.hasOwnProperty('profile_img_url') && userCredentials.user_details.profile_img_url && userCredentials.user_details.profile_img_url.hasOwnProperty('file_obj') && userCredentials.user_details.profile_img_url.file_obj) {
			user_profile_image = userCredentials.user_details.profile_img_url.file_obj
		}

		let user_first_name = userCredentials && userCredentials.user_details && userCredentials.user_details.first_name
		let user_last_name = userCredentials && userCredentials.user_details && userCredentials.user_details.last_name

		//let roleName = this.props.userCredentials?.user_details?.role_name

		let selectedVersion = { "value": this.props.userCredentials?.user_details?.version_id, "label": this.props.userCredentials?.user_details?.version.charAt(0).toUpperCase() + this.props.userCredentials?.user_details?.version.slice(1) };

		//console.log("roleName========", roleName)
		// console.log('version-------------ccccccccccc-->', this.props.version)
		//console.log("notificationData========", this.state.notificationData.length)
		return (
			<div className="header-top-inner">
				<header className="header_main" >
					{/* this.state.notificationData.length */}
					{/*<div className={this.props.leftbar ? "brand-w-button header_left left_border_open" : "brand-w-button header_left left_border_close"}>
						<svg width="15" height="15" viewBox="0 0 14 14" fill="none" onClick={this.handleBar} style={{ cursor: 'pointer' }}>
							<path d="M0.5 3.125H13.5C13.75 3.125 14 2.90625 14 2.625V1.375C14 1.125 13.75 0.875 13.5 0.875H0.5C0.21875 0.875 0 1.125 0 1.375V2.625C0 2.90625 0.21875 3.125 0.5 3.125ZM0.5 8.125H13.5C13.75 8.125 14 7.90625 14 7.625V6.375C14 6.125 13.75 5.875 13.5 5.875H0.5C0.21875 5.875 0 6.125 0 6.375V7.625C0 7.90625 0.21875 8.125 0.5 8.125ZM0.5 13.125H13.5C13.75 13.125 14 12.9062 14 12.625V11.375C14 11.125 13.75 10.875 13.5 10.875H0.5C0.21875 10.875 0 11.125 0 11.375V12.625C0 12.9062 0.21875 13.125 0.5 13.125Z" fill="white" fillOpacity="0.54" />
						</svg>
					</div>*/}

					<div className="header_right user_icon_innner" >
						<ul className="nav_ul">
							{/*<li style={{ color: '#fff', paddingTop: 1 }}>{userName}</li>*/}
							{/*<OverlayTrigger
								rootClose={true}
								trigger="click"
								placement="bottom"
								overlay={
									<Popover className="popover_action_inner">
										<Popover.Content>
											<div className="popover_action_row">
												<button className="popover_action_btn" onClick={this.changePassword}>Change Password</button>
											</div>
										</Popover.Content>
									</Popover>
								}
							>
							<li><i className="fa fa-cog" aria-hidden="true"></i></li>
							</OverlayTrigger>*/}
							<li style={{ display: 'none' }}>
								<div className="srchBox">
									<button type="button" className="btn btn-link search_btn_addon"><i className="fa fa-search"></i></button>
									<CustomInput
										parentClassName="comment_input_field"
										name="srchBox"
										type="text"
										placeholder='Search a admin'
									//onChange={this.handleSearchBar}
									/>
								</div>
							</li>


							{user_profile_image != "" ?
								<li><img className="user_icon" src={user_profile_image} /></li>
								:
								<li><div className="header_user_name" data-tip={`${user_first_name} ${user_last_name}`}>{user_first_name && user_first_name.charAt(0)}{user_last_name && user_last_name.charAt(0)}</div>
									<ReactTooltip place="bottom" />
								</li>

							}
							<OverlayTrigger
								rootClose={true}
								trigger="click"
								placement="bottom"
								overlay={
									<Popover className="popover_action_inner">
										<Popover.Content>
											<div className="popover_action_row">
												<button className="mailtext">{user_email}</button>
												<button className="changePasswordtext" onClick={this.changePassword}>Change Password</button>
												<button className="logouttext" onClick={this.logout}>Log off</button>
											</div>
										</Popover.Content>
									</Popover>
								}
							>
								<li className="logoutbox"><i className="fa fa-sort-desc" aria-hidden="true"></i></li>
							</OverlayTrigger>
							{/* <li className="langdropdown">

								<Dropdown onSelect={this.lanOnSelect.bind(this)}>
									<Dropdown.Toggle variant="success" id="dropdown-basic" >
										{localStorage.getItem('i18nextLng').toUpperCase()}
									</Dropdown.Toggle>

									<Dropdown.Menu>
										<Dropdown.Item eventKey="en">EN</Dropdown.Item>
										<Dropdown.Item eventKey="fr">FR</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>

							</li> */}

						</ul>
					</div>
					<ModalGlobal
						show={this.state.langaugeConfirmModal}
						onHide={this.cancelLangaugeChange}
						className="modalcustomize confirmationalertmodal"
						bodyClassName="cancelConfirmationbody"
						headerclassName="close_btn_icon"
						title='Language Change'
						footer={false}
						body={
							<ConfirmationAlert
								BodyFirstContent='Are you sure, you want to reload?'
								confirmationButtonContent='Confirm'
								deleteConfirmButton={this.confirmLangaugeChange}
								cancelButtonContent='Cancel'
								deleteCancleButton={this.cancelLangaugeChange}
							/>
						}
					/>

					<ModalGlobal
						show={this.state.changePasswordFlag}
						onHide={this.closeChangePassword}
						className={`${this.state.zoominzoomoutflag + ' ' + "modalcustomize changePasswordModal"}`}
						bodyClassName="cancelConfirmationbody"
						headerclassName="close_btn_icon"
						title='Change Password'
						footer={false}
						closeButton={true}
						zoominButton={this.state.zoominzoomoutflag != "" ? false : true}
						zoomoutButton={this.state.zoominzoomoutflag != "" ? true : false}
						zoomin={this.zoominFunction}
						zoomout={this.zoomoutFunction}
						body={
							<ChangePasswordContent
								closeChangePassword={this.closeChangePassword}
							/>
						}
					/>
				</header >
			</div>
		)
	}
}

const mapStateToProps = (globalState) => {
	//console.log("globalState.LoginReducer.version------------->", globalState.LoginReducer.version)
	return {
		userCredentials: globalState.LoginReducer.userCredentials,
		accessToken: globalState.LoginReducer.accessToken,
		token: globalState.LoginReducer.token,
		leftbar: globalState.mainReducerData.leftbar,
		version: globalState.LoginReducer.version
	};
}
export default withRouter(connect(mapStateToProps, { handleLeft, loaderStateTrue, loaderStateFalse, setToken, setUserCredentials, logOutApp })(Header));