import React from 'react'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import SearchAutosuggestComponent from '../../Utility/Components/SearchAutosuggestComponent'



function OrgFliter(props) {
    const { handleChangeOrganizationFilter, organizationFilterSelectedData, userCredentials } = props;
    let version = userCredentials?.user_details?.version
    return (
        <SearchAutosuggestComponent
            handleChangeOrganizationFilter={handleChangeOrganizationFilter}
            organizationFilterSelectedData={organizationFilterSelectedData}
        />
    )
}
const mapStateToProps = (globalState) => {
    return {
        userCredentials: globalState.LoginReducer.userCredentials
    };
}

export default withRouter(connect(mapStateToProps, {})
    (withTranslation()(OrgFliter)));
