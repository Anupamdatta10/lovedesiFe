import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loaderStateTrue, loaderStateFalse, handleActiveLink, connectToWebsocket, disconnectToWebsocket } from '../../Actions/AllAction';
import { setToken, setUserCredentials, logOutApp, setVersionList } from '../../Login/Actions/LoginAction';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../../Home/Assets/css/homedoc.scss';
import '../../Home/Assets/css/homeresponsivedoc.scss';
import { Tabs, Tab } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import User from '../Components/User/User';
import Store from '../Components/Store/Store';
import Catagory from '../Components/Catagory/Catagory';
import ModalGlobal from '../../Utility/Components/ModalGlobal';
import ConfirmationAlert from '../../Utility/Components/ConfirmationAlert';
import * as LoginController from '../../Login/Controller/LoginController';



// import Config from '../../../Utility/Config'
// import Utility from '../../../Utility/Utility';

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTabName: localStorage.getItem("selectedTabName") && localStorage.getItem("selectedTabName") != "" ? localStorage.getItem("selectedTabName") : "user",
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
			}, () => {
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
			this.setState({
				selectedTabName: localStorage.getItem("selectedTabName") && localStorage.getItem("selectedTabName") != "" ? localStorage.getItem("selectedTabName") : "user"
			})
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
		arry.push(
			<Tab eventKey="user" title="Users" key={0}>
				{this.state.selectedTabName == 'user' ?
					<User setTabConatinerSpaceClass={this.setTabConatinerSpaceClass} detectChangesIndividualTab={this.detectChangesIndividualTab} /> : null}
			</Tab>
		)
		arry.push(
			<Tab eventKey="store" title="Store" key={1}>
				{this.state.selectedTabName == 'store' ?
					<Store setTabConatinerSpaceClass={this.setTabConatinerSpaceClass} detectChangesIndividualTab={this.detectChangesIndividualTab} /> : null}
			</Tab>
		)
		arry.push(
			<Tab eventKey="catagory" title="Catagory" key={2}>
				{this.state.selectedTabName == 'catagory' ?
					<Catagory setTabConatinerSpaceClass={this.setTabConatinerSpaceClass} detectChangesIndividualTab={this.detectChangesIndividualTab} /> : null}
			</Tab>
		)


		return arry;

	}

	firstTimeSelectedTab = () => {
		let locationPath = this.props.history.location.pathname.split("/")
		let lastIndex = locationPath.length - 1
		if (locationPath[lastIndex] == "home" && localStorage.getItem("selectedTabName") != "user" && localStorage.getItem("selectedTabName") == "organization") {
			this.setState({
				selectedTabName: "organization"
			}, () => {
				localStorage.setItem("selectedTabName", "organization")
			})
		} else {
			this.setState({
				selectedTabName: "user"
			}, () => {
				localStorage.setItem("selectedTabName", "user")
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