import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Nav, Accordion } from "react-bootstrap";

import { handleActiveLink, handleLeft } from '../../Actions/AllAction';
import ReactTooltip from 'react-tooltip';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { setToken, setUserCredentials, logOutApp, userrole } from '../../Login/Actions/LoginAction';

class Left extends Component {
	constructor(props) {
		super(props);
		this.handleBar = this.handleBar.bind(this);
		this.state = {
			toggleType: "",
			activeClass: "",
			accName: "",
			subMenuIcon: ""
		}
	}

	toggle = (params, linkType) => {
		if (linkType === "") {

			this.setState({
				collapsed2: true,
				accName: ""
			}, () => {
				this.props.handleActiveLink(this.state.activeClass, this.state.accName)

			});
		}
		localStorage.setItem("selectedTabName", "");
		this.setState({
			activeClass: params
		}, () => {
			this.props.handleActiveLink(this.state.activeClass, this.state.accName)
		});
	}

	handleBar = () => {
		this.props.handleLeft(!this.props.leftbar)
	}
	validationPermission = (eventKey) => {
		const { t, roleWisePermission } = this.props;
		let valid = false;
		if (roleWisePermission && roleWisePermission.hasOwnProperty(eventKey) && roleWisePermission[eventKey].read_write_permission != "") {
			valid = true;
		}
		return valid
	}



	leftUi = () => {
		const { t, roleWisePermission, userCredentials } = this.props;
		const { activeClass, accName } = this.props.activeLink;

		let orgnizationarry = ["user", "addWorker"];

		let orgArry = [];
		let orgPermission = orgnizationarry.filter((item) => {
			let key = roleWisePermission && roleWisePermission.hasOwnProperty(item) ? roleWisePermission[item].eventKey : ""
			if (item == key) {
				orgArry.push(key)
			}
		})

		let arry = []


		arry.push(
			<Nav.Item className={activeClass === 'home_module' ? "ActiveClass" : "default"} id="home_module_id" onClick={this.toggle.bind(this, 'home_module', '')} key={0}>
				<Link to={`/${localStorage.getItem('i18nextLng')}/home`} className="nav-link">
					<div className="imgcircle" data-tip="Home"><img src={require('../Public/images/home.png')} className="sidebaricon" /></div>
				</Link>
			</Nav.Item>
		)

		return arry;
	}


	render() {
		const { activeClass, accName } = this.props.activeLink;
		const { userCredentials } = this.props;



		let org_profile_image = "";
		let marketed_by_logo = "";
		if (userCredentials && userCredentials.user_details && userCredentials.user_details.hasOwnProperty('org_logo') && userCredentials.user_details.org_logo && userCredentials.user_details.org_logo.hasOwnProperty('file_obj') && userCredentials.user_details.org_logo.file_obj) {
			org_profile_image = userCredentials.user_details.org_logo.file_obj
		}
		if (userCredentials && userCredentials.user_details && userCredentials.user_details.hasOwnProperty('marketed_by_logo') && userCredentials.user_details.marketed_by_logo && userCredentials.user_details.marketed_by_logo.hasOwnProperty('file_obj') && userCredentials.user_details.marketed_by_logo.file_obj) {
			marketed_by_logo = userCredentials.user_details.marketed_by_logo.file_obj
		}


		return (
			<aside id="left_bar_id" className={this.props.leftbar ? 'left_bar_customize left-bar open hide-sm' : 'left_bar_customize left-bar closed hide-sm'}>
				{org_profile_image != "" &&
					<div className="webtitlelogo">
						<img src={org_profile_image} className="sidebarimg" data-tip={userCredentials.user_details.org_name} />
					</div>}
				<Nav className="flex-column pt-2 side-nav">

					{this.leftUi()}
					<ReactTooltip place="bottom" />
				</Nav>
			</aside>

		)

	}
}


function mapStateToProps(globalState) {
	//console.log("globalState===>", globalState.mainReducerData.roleWisePermission)
	return {
		leftbar: globalState.mainReducerData.leftbar,
		activeLink: globalState.mainReducerData.activeLink,
		roleWisePermission: globalState.mainReducerData.roleWisePermission,
		userCredentials: globalState.LoginReducer.userCredentials,
		loginDetails: globalState.LoginReducer

	};
}

export default connect(mapStateToProps, { handleActiveLink, handleLeft, setToken })(withTranslation()(Left));