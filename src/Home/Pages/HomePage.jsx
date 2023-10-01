import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loaderStateTrue, loaderStateFalse, handleActiveLink, connectToWebsocket, disconnectToWebsocket } from '../../Actions/AllAction';
import { setToken, setUserCredentials, logOutApp, setVersionList } from '../../Login/Actions/LoginAction';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import '../../Home/Assets/css/homedoc.scss';
import '../../Home/Assets/css/homeresponsivedoc.scss';
import { Tabs, Tab } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import Worker from '../Components/Worker/Worker';
import ModalGlobal from '../../Utility/Components/ModalGlobal';
import ConfirmationAlert from '../../Utility/Components/ConfirmationAlert';
import * as LoginController from '../../Login/Controller/LoginController';



// import Config from '../../../Utility/Config'
// import Utility from '../../../Utility/Utility';

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTabName: localStorage.getItem("selectedTabName") && localStorage.getItem("selectedTabName") != "" ? localStorage.getItem("selectedTabName") : "worker",
			//selectedTabName: "worker",
			tabcontainerspace: "",
			tabchangeParent: false,
			tabChangeConfirmModal: false,
			tempTabName: ""

		}
	}
	componentDidMount() {
		this.props.handleActiveLink("home_module", "");
		this.permissionWiseTabSelected();
		// if (this.props.userCredentials?.user_details?.role_name == 'app_admin') {
		this.getVersionListFn();
		// } 
		// console.log("localStorage========", localStorage.getItem("selectedTabName"))
		//this.connectToWebSocketApi()
		//this.firstTimeSelectedTab()
	}

	getVersionListFn = async () => {
		//console.log('enry=================>')
		let data = {};
		loaderStateTrue();
		LoginController.getVersionList(data).then((response) => {
			let versionList = [];
			let versionListObj = {};
			response.data.map((e) => {
				versionListObj = {};
				versionListObj['label'] = `${e.version} ( ${e.description} )`;
				versionListObj['value'] = e.id;
				versionList.push(versionListObj)
			})
			// console.log('version list dataset------------>', versionList)
			if (versionList.length > 0) {
				this.props.setVersionList(versionList);
			}

			//console.log('global state**********',globalState)
			loaderStateFalse();
			//props.history.push(`/${localStorage.getItem('i18nextLng')}/home`);
		}).catch((error) => {
			loaderStateFalse();

		});
	}

	//Socket
	// connectToWebSocketApi = () => {
	// 	const { connectToWebsocket } = this.props;
	// 	let email = 'app.admin@cal.com';
	// 	let id = 1;
	// 	connectToWebsocket(email, id).then(() => {
	// 		this.reciveMessagesUsingWebsocket();
	// 	})

	// }
	// componentWillUnmount() {
	// 	const { disconnectToWebsocket, websocket } = this.props;
	// 	disconnectToWebsocket(websocket)
	// }

	// reciveMessagesUsingWebsocket = () => {
	// 	//alert(1)
	// 	const { websocket } = this.props;

	// 	//if (websocket) {
	// 	// alert();
	// 	websocket.onmessage = (evt) => {
	// 		var receivedMsg = evt.data;
	// 		console.log("received_msg", receivedMsg)
	// 		Utility.toastNotifications(receivedMsg, "Success", "success");
	// 		alert("Message is received...");
	// 	};
	// 	//console.log("websocket", websocket)
	// 	websocket.onclose = e => {
	// 		// alert(222222222222222222222222222222222222222222222222222222222222222222222222222222222222);           
	// 		//  setTimeout(()=>{
	// 		//this.check()
	// 		// },1000)
	// 		// that.timeout = that.timeout + that.timeout; //increment retry interval
	// 		//connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
	// 	};
	// 	/* websocket.onclose = (event) => {
	// 		 connectToWebsocket()
	// 		 alert();
	// 		 console.log("WebSocket is closed now.");
	// 	 };*/
	// 	//}

	// }
	// check = () => {
	// 	const { websocket, connectToWebsocket, userCredentials } = this.props;
	// 	if (!websocket || websocket.readyState == WebSocket.CLOSED) connectToWebsocket(userCredentials); //check if websocket instance is closed, if so call `connect` function.
	// };

	//Socket finish		
	setTabConatinerSpaceClass = (className) => {
		this.setState({
			tabcontainerspace: className
		})

	}

	detectChangesIndividualTab = (value = false) => {
		this.setState({
			tabchangeParent: value
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


	handelSelectTab = async (tabName) => {
		if (this.state.tabchangeParent == true) {
			this.setState({
				tempTabName: tabName
			}, () => {
				this.openTabChangeConfirmModal()
				//for confirmation modal hide every tab change (24.02.2023)
				this.confirmTabChange()
				localStorage.setItem("selectedTabName", tabName);
			})
		} else {
			this.setState({
				selectedTabName: tabName
			},()=>{
				localStorage.setItem("selectedTabName", tabName);
			})
		}
	}
	confirmTabChange = () => {
		this.setState({
			selectedTabName: this.state.tempTabName
		}, () => {
			this.cancelTabChange()
			this.setState({
				tabchangeParent: false
			})
		})
	}
	cancelTabChange = () => {
		this.tabChangeConfirmModalHide()
	}

	permissionWiseTabSelected = () => {
		const { roleWisePermission } = this.props;
		if (this.props.match.params.type) {
			this.setState({
				selectedTabName: this.props.match.params.type
			})
		} else {
			// if (Object.keys(roleWisePermission) && Object.keys(roleWisePermission).length > 0) {
			//let tab_order = ["worker"];
			//let first_tab = Object.keys(roleWisePermission).filter((x) => tab_order.includes(x))[0];
			//let first_tab = tab_order.filter((x) => Object.keys(roleWisePermission).includes(x))[0];
			this.setState({
				selectedTabName: localStorage.getItem("selectedTabName") && localStorage.getItem("selectedTabName") != "" ? localStorage.getItem("selectedTabName") : "worker"
			})
			//}
		}
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
		const { t, roleWisePermission, userCredentials } = this.props;
		let arryHash = roleWisePermission;
		let arry = []

		let roleName = userCredentials.hasOwnProperty('user_details') && userCredentials.user_details && userCredentials.user_details.hasOwnProperty('role_name') && userCredentials.user_details.role_name
		let version = userCredentials.hasOwnProperty('user_details') && userCredentials.user_details && userCredentials.user_details.hasOwnProperty('version') && userCredentials.user_details.version
		arry.push(
			<Tab eventKey="worker" title="Users" key={0}>
				{this.state.selectedTabName == 'worker' ?
					< Worker setTabConatinerSpaceClass={this.setTabConatinerSpaceClass} detectChangesIndividualTab={this.detectChangesIndividualTab} /> : null}
			</Tab>
		)
		

		return arry;

	}

	firstTimeSelectedTab = () => {
		let locationPath = this.props.history.location.pathname.split("/")
		let lastIndex = locationPath.length - 1
		if (locationPath[lastIndex] == "home" && localStorage.getItem("selectedTabName") != "worker" && localStorage.getItem("selectedTabName") == "organization") {
			this.setState({
				selectedTabName: "organization"
			}, () => {
				localStorage.setItem("selectedTabName", "organization")
			})
		} else {
			this.setState({
				selectedTabName: "worker"
			}, () => {
				localStorage.setItem("selectedTabName", "worker")
			})
		}
	}

	render() {
		const { t } = this.props;
		//console.log("ttttttttttttt",t)
		const { tabcontainerspace } = this.state;
		return (
			<div className={`${tabcontainerspace} homepagecontainer connectheader`} >
				<Tabs
					id="homepagetabs"
					activeKey={this.state.selectedTabName}
					className="tabsmainbox"
					onSelect={this.handelSelectTab}

				>
					{this.tabUi()}
				</Tabs>
				<ModalGlobal
					show={this.state.tabChangeConfirmModal}
					onHide={this.tabChangeConfirmModalHide}
					className="modalcustomize confirmationalertmodal"
					bodyClassName="cancelConfirmationbody"
					headerclassName="close_btn_icon"
					title=""
					footer={false}
					body={
						<ConfirmationAlert
							BodyFirstContent='Are you sure you want to navigate/close without saving?'
							BodySecondContent=""
							BodyThirdContent=""
							confirmationButtonContent='Confirm'
							cancelButtonContent='Cancel'
							deleteConfirmButton={this.confirmTabChange}
							deleteCancleButton={this.cancelTabChange}
						/>
					}
				/>
			</div >
		);
	}
}




const mapStateToProps = (globalState) => {
	//console.log("globalState===", globalState)
	return {
		userCredentials: globalState.LoginReducer.userCredentials,
		token: globalState.LoginReducer.token,
		access_token: globalState.mainReducerData.access_token,
		roleWisePermission: globalState.mainReducerData.roleWisePermission,
		websocket: globalState.mainReducerData.websocket
	};
}


export default withRouter(connect(mapStateToProps, { handleActiveLink, loaderStateTrue, loaderStateFalse, setToken, setUserCredentials, setVersionList, logOutApp, connectToWebsocket, disconnectToWebsocket })
	(withTranslation()(HomePage)));