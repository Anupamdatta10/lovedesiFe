import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


class GlobalHeaderFilter extends Component {
    render() {
        const { headerFliterContent } = this.props;
        return (
            <div className="gridtopviews gridtopviewsHistory">
                {headerFliterContent}
            </div>
        );
    }
}
GlobalHeaderFilter.defaultProps = {

    headerFliterContent: ""
}
const mapStateToProps = (globalState) => {
    return {

    };
}

export default withRouter(connect(mapStateToProps, {})
    (withTranslation()(GlobalHeaderFilter)));