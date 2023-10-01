import React, { Component } from 'react';
import '../Public/css/footer.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Nav, Accordion } from "react-bootstrap";
import { handleActiveLink, handleLeft } from '../../Actions/AllAction';
import ReactTooltip from 'react-tooltip';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { setToken, setUserCredentials, logOutApp, userrole } from '../../Login/Actions/LoginAction';
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }

    render() {
        const { userCredentials } = this.props;
        return (
            <>
                <div className="footer-inner">
                </div>
            </>
        );
    }
}


function mapStateToProps(globalState) {
    return {
        userCredentials: globalState.LoginReducer.userCredentials,

    };
}

export default connect(mapStateToProps, { handleActiveLink, handleLeft, setToken })(withTranslation()(Footer));