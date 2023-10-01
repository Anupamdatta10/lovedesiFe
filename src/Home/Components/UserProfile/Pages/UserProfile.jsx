import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loaderStateTrue, loaderStateFalse } from '../../../../Actions/AllAction';
import { setToken, setUserCredentials, logOutApp } from '../../../../Login/Actions/LoginAction';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Tabs, Tab } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import moment from 'moment';
import '../../UserProfile/Assets/css/profiledoc.scss';
import * as ProfileController from '../Controller/ProfileController';
import Utility from '../../../../Utility/Utility';
const lodash = require('lodash')
import ConfirmationAlert from '../../../../Utility/Components/ConfirmationAlert';
import ModalGlobal from '../../../../Utility/Components/ModalGlobal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import General from '../Components/General/General';
import ReactTooltip from 'react-tooltip';
import ImageCropContent from '../../../../Utility/Components/ImageCropContent'
import { getCurrentUser } from '../../../../Login/Controller/LoginController';
import ErrorBoundary from '../../../../Utility/Components/ErrorBoundary';

class UserProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTabName: "general",
			deleteConfirmationModal: false,
			archivingDateModal: false,
			addDocumentModal: false,
			//Set data
			userName: "",
			phoneNumber: "",
			organisation: "",
			//active inactive check
			userEmail: "",
			userPhone_number: "",
			userStatus: "",

			renderChildTabs: false,
			tabChangeConfirmModal: false,
			tabchangeInner: false,
			tempTabName: "",
			backToWorkerConfirmed: false,

			confirmationAlertModal: false,
			resetconfirmationAlertModal: false,
			//worker profile

			profileImagePreviewShow: false,
			profileImage: require('../../../../Utility/Public/images/blank_img.png'),
			workerFormData: {
				profileImage: {
					"file_name": "",
					"file_obj": ""
				}
			},
			profileImageError: "",
			userRoleName: "",
			existingProfileImage: require('../../../../Utility/Public/images/blank_img.png'),
			//IMage crop
			src: null,
			crop: {
				unit: '%',
				width: 30,
				aspect: 1 / 1
			},
			croppedImageUrl: "",

			imageCropModalFlag: false,
			hasLogin: false,
			isCognitoUser: false,
			user_response_profile_img_data: "",
			image_upload_success: false,
			emp_id: ""
		}
	}

	componentDidMount() {
		this.userDetails();
		this.permissionWiseTabSelected()
	}



	detectChangesIndividualInnerTab = (value = false) => {
		this.setState({
			tabchangeInner: value
		})

	}

	userDetails = () => {
		const { loaderStateTrue, loaderStateFalse, userProfileId } = this.props;
		//let filters = {}
		//let dateHash = {}
		//dateHash["current_date_time"] = moment().format('YYYY-MM-DD HH:mm:ss');
		//filters['filters'] = dateHash
		loaderStateTrue();
		ProfileController.user_Details(userProfileId).then((response) => {
			if (response.success) {
				// console.log("response.??????????========", response)

				// console.log("response.data[0]========", response.data[0]?.user_details)
				this.setUserDetails(response.data[0]);
				//this.userRelationDetails();
				this.setState({
					user_response_profile_img_data: response.data[0]?.user_details,
				}, () => {
					// console.log("user_response_data", this.state.user_response_profile_img_data)
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
				/*Utility.toastNotifications("Please login", "Error", "error");
				this.props.logOutApp().then(
					() => this.props.history.push("/")
				);*/
			}
		});
	}

	setUserDetails = (obj) => {
		// console.log("obj=========================++", obj)
		let dataSet = obj.user_details;
		// console.log("dataSet=========================++", dataSet.profile_img && dataSet.profile_img.file_obj ? dataSet.profile_img.file_obj : require('../../../../Utility/Public/images/blank_img.png'))
		this.setState({
			userName: Utility.displayNameFormat(dataSet.first_name, dataSet.last_name),
			phoneNumber: dataSet.contact_number,
			profileImage: dataSet.profile_img && dataSet.profile_img.file_obj ? dataSet.profile_img.file_obj : require('../../../../Utility/Public/images/blank_img.png'),
			userEmail: dataSet.email,
			userStatus: dataSet.active,
			existingProfileImage: dataSet.profile_img && dataSet.profile_img.file_obj ? dataSet.profile_img.file_obj : require('../../../../Utility/Public/images/blank_img.png'),
			organisation: dataSet.org_id
		}, () => {
			// console.log("hasLogin=====Entry=====>>", this.state.profileImage, this.state.existingProfileImage, this.state.userName)
		})
	}


	openTabChangeConfirmModal = () => {
		this.setState({
			tabChangeConfirmModal: true
		})
	}
	tabChangeConfirmModalHide = () => {
		this.setState({
			tabChangeConfirmModal: false,
			tempTabName: ""
		})
	}
	handelSelectTab = (tabName) => {
		if (this.state.tabchangeInner == true) {
			this.setState({
				tempTabName: tabName
			}, () => {
				this.openTabChangeConfirmModal()
				//for confirmation modal hide every tab change (24.02.2023)
				this.confirmTabChange()
			})
		} else {
			this.setState({
				selectedTabName: tabName
			})
		}
	}
	confirmTabChange = () => {
		if (this.state.backToWorkerConfirmed == false) {
			this.setState({
				selectedTabName: this.state.tempTabName
			}, () => {
				this.cancelTabChange()
				this.setState({
					tabchangeInner: false
				})
			})
		} else {
			//for back button
			this.tabChangeConfirmModalHide()
			this.props.detectChangesIndividualTab(false)
			this.detectChangesIndividualInnerTab(false)
			this.props.backToWorker()
		}
	}
	cancelTabChange = () => {
		this.tabChangeConfirmModalHide()
	}
	backToWorker = () => {
		this.setState({
			backToWorkerConfirmed: true
		}, () => {
			if (this.state.tabchangeInner == true) {
				this.openTabChangeConfirmModal()
			} else {
				this.props.detectChangesIndividualTab(false)
				this.detectChangesIndividualInnerTab(false)
				this.props.backToWorker()
			}
		})


	}

	permissionWiseTabSelected = () => {
		const { roleWisePermission } = this.props;
		this.setState({
			selectedTabName: "general"
		})
	}

	validationPermission = (eventKey) => {
		const { t, roleWisePermission } = this.props;
		let valid = false;
		if (roleWisePermission.hasOwnProperty(eventKey) && roleWisePermission[eventKey].read_write_permission != "") {
			valid = true;
		}
		return valid
	}




	tabUi = () => {
		const { t, roleWisePermission } = this.props;
		let arry = [];

		//if (this.validationPermission('general')) {
		arry.push(
			<Tab eventKey="general" title="User info" key={0}>
				{this.state.selectedTabName == 'general' ?
					<>
						<ErrorBoundary title="General Error">
							<General
								userProfileId={this.props.userProfileId}
								selectedTabName={this.state.selectedTabName}
								detectChangesIndividualTab={this.props.detectChangesIndividualTab}
								detectChangesIndividualInnerTab={this.detectChangesIndividualInnerTab}
								renderChildTabs={this.state.renderChildTabs}
								userStatus={this.state.userStatus}
								tabchangeInner={this.state.tabchangeInner}
								userEmail={this.state.userEmail}
								userDetails={this.userDetails}
								userOrgId={this.state.organisation}
								selectedRowsData={this.props.selectedRowsData}
							/>
						</ErrorBoundary>
					</>
					: null}
			</Tab>
		)
		//}

		return arry;

	}

	profileImageUi = () => {
		// console.log("user_response_profile_img_data.profile_img=======",user_response_profile_img_data)
		const { roleWisePermission } = this.props;
		const { user_response_profile_img_data, image_upload_success } = this.state;
		let roleName = this.props.userCredentials.hasOwnProperty('user_details') && this.props.userCredentials.user_details && this.props.userCredentials.user_details.hasOwnProperty('role_name') && this.props.userCredentials.user_details.role_name;
		let uiView = <></>;
		uiView = <label className="custom-file-upload">
			{user_response_profile_img_data.profile_img && user_response_profile_img_data.profile_img.file_obj ?
				<img src={this.state.profileImage} /> :
				<div className="user_name_box_profile"><img src={this.state.profileImage} />
					{image_upload_success == false ?
						<div className="user_name_label">{user_response_profile_img_data.first_name && user_response_profile_img_data.first_name.charAt(0)}{user_response_profile_img_data.last_name && user_response_profile_img_data.last_name.charAt(0)}</div> : null}
				</div>}
			{roleName == "app_admin" || this.props.userProfileId == this.props.userCredentials.id ?
				<input type="file" onChange={this.profileImageChanged} /> : null}
			{roleName == "app_admin" || this.props.userProfileId == this.props.userCredentials.id ?
				<div className="hoverlayerbackground">
					<div className="hoverContent">
						{/* <img src={require('../../../../Utility/Public/images/cameraicon.png')} className="cameraicon" /> */}
						<p>Upload photo</p>
					</div>
				</div>
				: null}
		</label>;
		return uiView;
	}

	profileImageChanged = (event) => {

		this.props.detectChangesIndividualTab(true)
		//this.detectChangesIndividualInnerTab(true)
		let { workerFormData } = this.state;
		let targetFileSplit = event.target.files[0].name.split('.');
		let lastElement = targetFileSplit.pop();
		let user_profile_image = {
			"file_name": "",
			"file_obj": ""
		};
		if (lastElement == 'JPEG' || lastElement == 'jpeg' || lastElement == 'jpg' || lastElement == 'JPG' || lastElement == 'png' || lastElement == 'PNG' || lastElement == '') {

			const fsize = event.target.files[0].size;
			const file = Math.round((fsize / 1024));

			if (file >= 300) {
				Utility.toastNotifications('File is too Big, please select a file less than 300kb', "Warning", "warning");
			} else {

				this.setState({
					imageCropModalFlag: true
				})

				if (event.target.files && event.target.files.length > 0) {
					const reader = new FileReader();
					reader.addEventListener('load', () =>
						this.setState({ src: reader.result })
					);
					reader.readAsDataURL(event.target.files[0]);
					user_profile_image["file_name"] = event.target.files[0].name
					user_profile_image["file_obj"] = ""
					workerFormData["profileImage"] = user_profile_image
					this.setState({
						workerFormData,
						profileImagePreviewShow: true,
						profileImageError: "",
						tabchangeInner: true
					})
				}


			}
		} else {

			workerFormData["profileImage"] = {}
			this.setState({
				profileImageError: "Required field",
				profileImagePreviewShow: false,
				workerFormData,
				profileImage: 'Add Image'
			})
		}
	}
	getBase64(file, cb) {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			cb(reader.result)
		};
		reader.onerror = function (error) {
			//console.log('Error: ', error);
		};
	}
	formatWorkerData = () => {
		let { workerFormData } = this.state
		let user_details = {};
		user_details['profile_img'] = workerFormData.profileImage;
		return user_details
	}


	submitWorkerProfile = () => {
		const { loaderStateFalse, loaderStateTrue, userProfileId } = this.props;
		let valid = true;
		if (Object.keys(this.state.workerFormData.profileImage).length == 0) {
			valid = false;
			Utility.toastNotifications("Profile image cannot be blank", "Error", "error")
		}
		if (valid) {
			let dataset = this.formatWorkerData();
			loaderStateTrue();
			ProfileController.users(dataset, userProfileId).then((response) => {
				loaderStateFalse();
				if (response.success) {
					this.setState({
						tabchangeInner: false,
						image_upload_success: false
					})
					this.getCurrentUser()
					Utility.toastNotifications(response.message, "Success", "success");
					this.cancelWorkerProfile()
				} else {
					Utility.toastNotifications(response.message, "Error", "error")
				}
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
	}

	getCurrentUser = () => {
		const { loaderStateTrue, loaderStateFalse, setUserCredentials } = this.props;
		getCurrentUser().then((response) => {
			if (response.success) {
				// console.log('response data--------%%%%%%%%%%---11111--->', response.data)
				setUserCredentials(response.data)
			}
		}).catch((error) => {
			console.error("************error*************", error)
			loaderStateFalse();
		});
	}


	cancelWorkerProfile = () => {
		// console.log('----------------------1')
		this.setState({
			profileImagePreviewShow: false,
			image_upload_success: false
		})
		// console.log('----------------------2')
		this.props.detectChangesIndividualTab(false)
		// console.log('----------------------3')

		this.userDetails();
		// console.log('----------------------4')

		//this.permissionWiseTabSelected()
	}

	resetdeleteConfirmButton = () => {
		this.resetPasswordApi();
	}

	resetdeleteCancleButton = () => {
		this.resetconfirmationModalHide();
	}


	onImageLoaded = (image) => {
		//console.log("onImageLoaded=====", image)
		this.imageRef = image;
	};

	onCropComplete = (crop) => {
		this.makeClientCrop(crop);
	};

	onCropChange = (crop, percentCrop) => {
		// You could also use percentCrop:
		// this.setState({ crop: percentCrop });
		this.setState({ crop });
	};

	async makeClientCrop(crop) {
		const { workerFormData } = this.state;
		if (this.imageRef && crop.width && crop.height) {
			const croppedImageUrl = await this.getCroppedImg(
				this.imageRef,
				crop,
				'newFile.jpeg'
			);
			let user_profile_image = {}
			this.setState({ profileImage: croppedImageUrl }, () => {
				user_profile_image["file_name"] = this.state.workerFormData.profileImage.file_name
				user_profile_image["file_obj"] = this.state.profileImage
				workerFormData["profileImage"] = user_profile_image
				this.setState({
					workerFormData
				})
			});

		}
	}

	getCroppedImg = (image, crop, fileName) => {
		const canvas = document.createElement('canvas');
		const pixelRatio = window.devicePixelRatio;
		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;
		const ctx = canvas.getContext('2d');

		canvas.width = crop.width * pixelRatio * scaleX;
		canvas.height = crop.height * pixelRatio * scaleY;

		ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
		ctx.imageSmoothingQuality = 'high';

		ctx.drawImage(
			image,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width * scaleX,
			crop.height * scaleY
		);

		const base64Image = canvas.toDataURL('image/jpeg');
		//console.log("base64Image========",base64Image)
		return base64Image

	}

	//Image url crop

	imageCropModalShow = () => {
		this.setState({
			imageCropModalFlag: true
		})
	}

	imageCropModalHide = () => {
		const { workerFormData, existingProfileImage } = this.state;
		workerFormData["profileImage"] = existingProfileImage
		this.setState({
			imageCropModalFlag: false,
			profileImage: existingProfileImage,
			profileImageError: "",
			workerFormData,
			profileImagePreviewShow: false,
			tabchangeInner: false
		})

	}

	imageCropDataSave = () => {
		this.setState({
			imageCropModalFlag: false,
			image_upload_success: true
		})
	}


	//Delete User
	deleteUser = () => {
		this.setState({
			confirmationAlertModal: true
		})
	}

	confirmationModalHide = () => {
		this.setState({
			confirmationAlertModal: false
		})
	}

	usersDeleteSuccess = () => {
		const { loaderStateTrue, loaderStateFalse, userProfileId } = this.props;
		loaderStateTrue();
		let data = {}
		data['id'] = [userProfileId];
		ProfileController.userDelete(data).then((response) => {
			// console.log("archivingDateModal res=============>>", response)
			//response.map((value) => {
			if (response[0].data[0].success) {
				this.setState({
					confirmationAlertModal: false
				}, () => {
					this.backToWorker();
				})
				Utility.toastNotifications(response[0].data[0].message, "Success", "success");
			} else {
				Utility.toastNotifications(response[0].data[0].message, "Error", "error");
			}
			//})
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
		// this.backToWorker();
	}

	deleteCancleButton = () => {
		this.confirmationModalHide();
	}
	//**// 

	//reset password
	resetPassword = () => {
		this.setState({
			resetconfirmationAlertModal: true
		})

	}

	resetconfirmationModalHide = () => {
		this.setState({
			resetconfirmationAlertModal: false
		})
	}

	resetdeleteConfirmButton = () => {
		this.resetPasswordApi();
	}

	resetdeleteCancleButton = () => {
		this.resetconfirmationModalHide();
	}

	resetPasswordApi = () => {
		const { loaderStateTrue, loaderStateFalse } = this.props;
		const { userEmail, phoneNumber } = this.state;
		let data = {};
		if (userEmail != "") {
			data = { "username": userEmail }
		}
		if (userEmail == "") {
			data = { "username": phoneNumber }
		}
		loaderStateTrue()
		ProfileController.resetPassword(data).then((response) => {
			if (response) {
				// console.log('reset password response----------------->', response);
				if (response.success) {
					// this.notificationJobSync();
					this.resetconfirmationModalHide();
					Utility.toastNotifications(response.message, "Success", "success");
				} else {
					Utility.toastNotifications(response.message, "Error", "error");
				}
				loaderStateFalse();
			}
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
	// ** //

	render() {
		const { t, profilecontentdispaly, selectedRowsData, paramsData } = this.props;
		// console.log("selectedRowsData===", selectedRowsData)

		return (
			<div className={`${profilecontentdispaly} profilemaincontainer`}>
				<div className={this.state.userStatus ? 'profilemaincontainerinner' : " profilemaincontainerinnerdisabled profilemaincontainerinner"}>
					<div className="profiletopbox">
						<div className="col-md-12">

							<div className="row">
								<div className="col-md-9">
									<div className={`${this.state.profileImagePreviewShow ? "profileimgsec_top_space" : ""} profileimgsec`}>
										<button onClick={this.backToWorker} className="backtoworker"><i className="fa fa-angle-left" aria-hidden="true"></i></button>
										<div className='user_add_img userprofileimg desarchiverEmployee'>
											{this.profileImageUi()}
											<>{this.state.profileImagePreviewShow == true ? <div className="savecancelinner"><button onClick={this.submitWorkerProfile} className="profileimgsave">Save</button><button onClick={this.cancelWorkerProfile} className="profileimgcancel">Cancel</button></div> : <></>}</>
											<div className="errorClass error_div">{this.state.profileImageError}</div>
										</div>
										<div className="userprofdetails">
											<h3 className="pronamelabel">
												{
													this.state.userName != null && this.state.userName.length > 22 ?
														<OverlayTrigger overlay={<Tooltip>{this.state.userName}</Tooltip>}>
															<span>{this.state.userName}</span>
														</OverlayTrigger>
														: <span>{`${this.state.userName} ( ${(selectedRowsData.user_type).charAt(0).toUpperCase() + (selectedRowsData.user_type).slice(1)} )`}</span>
												}
											</h3>
											<p className="pronumlabel emailidlabel">{this.state.userEmail}</p>
											<p className="pronumlabel phonenumber">{this.state.phoneNumber}</p>
											<p className="pronumlabel phonenumber">{selectedRowsData.org_name}</p>
										</div>
									</div>
								</div>
								<div className="col-md-3">
									<div className="archiveempsec">
										{this.props.userCredentials.hasOwnProperty('user_details') && this.props.userCredentials.user_details.hasOwnProperty('role_name') && this.props.userCredentials.user_details.role_name == "app_admin" ?
											<button type="button" className="archivedeletebtn deleteuserbtn" onClick={this.deleteUser} data-tip='Delete Admin'><i className="fa fa-trash" aria-hidden="true"></i></button> : null
										}

										{this.props.userCredentials.hasOwnProperty('user_details') && this.props.userCredentials.user_details.hasOwnProperty('role_name') && this.props.userCredentials.user_details.role_name == "app_admin" ?
											<button type="button" style={{ marginLeft: '6px' }} className="archivedeletebtn" onClick={this.resetPassword.bind(this)} data-tip='Reset Password'><i className="fa fa-unlock-alt" aria-hidden="true"></i>
											</button> : null
										}
										<ReactTooltip place="bottom" />
									</div>
								</div>
								<ErrorBoundary title="ModalGlobal Error">
									<ModalGlobal
										show={this.state.imageCropModalFlag}
										onHide={this.imageCropModalHide}
										onCancel={this.imageCropModalHide}
										onSave={this.imageCropDataSave}
										className="modalcustomize cropmodalcontent"
										bodyClassName="cropmodalcontentbody"
										headerclassName="close_btn_icon"
										title='Crop Image'
										footer={true}
										closeButton={true}
										saveButtonLabel='Crop'
										saveButtonClassName="delconfirmbtn btn btn-primary"
										cancelButtonClassName="delcancelbtn btn btn-primary"
										body={
											<>
												<ErrorBoundary title="ImageCropContent Error">
													<ImageCropContent
														onImageLoaded={this.onImageLoaded}
														onComplete={this.onCropComplete}
														onCropChange={this.onCropChange}
														crop={this.state.crop}
														croppedImageUrl={this.state.croppedImageUrl}
														src={this.state.src}
														onCropComplete={this.onCropComplete}
														imageCropModalShow={this.imageCropModalShow}
														circularCrop={false}
													/>
												</ErrorBoundary>
											</>
										}
									/>
								</ErrorBoundary>
							</div>
						</div>
					</div>
					<div className="profiletabsview">
						<Tabs
							id="homepagetabs"
							activeKey={this.state.selectedTabName}
							className="tabsmainbox"
							onSelect={this.handelSelectTab}
						>
							{this.tabUi()}
						</Tabs>

					</div>
					<ErrorBoundary title="ModalGlobal Error">
						<ModalGlobal
							show={this.state.tabChangeConfirmModal}
							onHide={this.tabChangeConfirmModalHide}
							className="modalcustomize confirmationalertmodal"
							bodyClassName="cancelConfirmationbody"
							headerclassName="close_btn_icon"
							title=""
							footer={false}
							body={
								<>
									<ErrorBoundary title="ConfirmationAlert Error">
										<ConfirmationAlert
											BodyFirstContent='Are you sure you want to navigate/close without saving?'
											BodySecondContent=""
											BodyThirdContent=""
											confirmationButtonContent='Confirm'
											cancelButtonContent='Cancel'
											deleteConfirmButton={this.confirmTabChange}
											deleteCancleButton={this.cancelTabChange}
										/>
									</ErrorBoundary>
								</>
							}
						/>
					</ErrorBoundary>
					<ErrorBoundary title="ModalGlobal Error">
						<ModalGlobal
							show={this.state.confirmationAlertModal}
							onHide={this.confirmationModalHide}
							className="modalcustomize confirmationalertmodal"
							bodyClassName="cancelConfirmationbody"
							headerclassName="close_btn_icon"
							title="Delete this person?"
							footer={false}
							body={
								<>
									<ErrorBoundary title="ConfirmationAlert Error">
										<ConfirmationAlert
											BodyFirstContent={`Are you sure you want to delete ${this.state.userName}  permanently? You won't be able to go back.`}
											confirmationButtonContent="Confirm"
											cancelButtonContent="Cancel"
											deleteConfirmButton={this.usersDeleteSuccess}
											deleteCancleButton={this.deleteCancleButton}
										/>
									</ErrorBoundary>
								</>
							}
						/>
					</ErrorBoundary>
					<ErrorBoundary title="ModalGlobal Error">
						<ModalGlobal
							show={this.state.resetconfirmationAlertModal}
							onHide={this.resetconfirmationModalHide}
							className="modalcustomize confirmationalertmodal"
							bodyClassName="cancelConfirmationbody"
							headerclassName="close_btn_icon"
							title="Reset user password?"
							footer={false}
							body={
								<>
									<ErrorBoundary title="ConfirmationAlert Error">
										<ConfirmationAlert
											BodyFirstContent="Are you sure you want to reset"
											BodySecondContent={
												this.state.userName.length >= 20 ? this.state.userName.substring(0, 20) + "..." : this.state.userName}
											BodyThirdContent="password? You won't be able to go back."
											confirmationButtonContent="Confirm"
											cancelButtonContent='Cancel'
											deleteConfirmButton={this.resetdeleteConfirmButton}
											deleteCancleButton={this.resetdeleteCancleButton}
										/>
									</ErrorBoundary>
								</>
							}
						/>
					</ErrorBoundary>
				</div>
			</div>
		);
	}
}



const mapStateToProps = (globalState) => {
	// console.log("globalState.LoginReducer.userCredentials===============", globalState.LoginReducer.userCredentials)
	return {
		userCredentials: globalState.LoginReducer.userCredentials,
		token: globalState.mainReducerData.token,
		access_token: globalState.mainReducerData.access_token,
		roleWisePermission: globalState.mainReducerData.roleWisePermission
	};
}


export default withRouter(connect(mapStateToProps, { loaderStateTrue, loaderStateFalse, setToken, setUserCredentials, logOutApp })
	(withTranslation()(UserProfile)));