import React, { Component } from 'react';
import Config from '../Config';
import AutosuggestComponent from './AutosuggestComponent';
import * as UtilityController from '../Controller/UtilityController';
import { loaderStateTrue, loaderStateFalse } from '../../Actions/AllAction';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
class SearchAutosuggestComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            organizationList: [],
            defultSelectData: ""
        }

    }

    componentDidMount = () => {
        this.organizationList();
        //document.body.addEventListener('mousedown', this.handleClickOutside.bind(this));

    }
    componentWillUnmount() {
        //document.body.removeEventListener('mousedown', this.handleClickOutside.bind(this));
    }

    organizationList = () => {
        const { loaderStateTrue, loaderStateFalse } = this.props;
        loaderStateTrue();
        UtilityController.orgListing().then((response) => {
            //console.error("************response*************", response)
            if (response.success) {

                let organizationListArry = [];

                if (this.props.userCredentials.user_details.role_name == 'app_admin') {
                    organizationListArry = [{ "label": "All", "value": "all" }];
                }

                response.data.map((endata) => {
                    let organizationListHash = {};
                    organizationListHash['label'] = endata.name;
                    organizationListHash['value'] = endata.id;
                    organizationListArry.push(organizationListHash);
                })
                this.setState({
                    organizationList: organizationListArry
                }, () => {



                    //console.log("this.props.userCredentials===", this.props.userCredentials.user_details.org_id)
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

    render() {
       // console.log("this.props.organizationFilterSelectedData===", this.props.organizationFilterSelectedData)
        return (
            <>
                <div className="dropdownbox departmentdrop">
                    <AutosuggestComponent
                        handleOnChange={this.props.handleChangeOrganizationFilter.bind(this, 'organization')}
                        //handleOnInputChange={(e) => { this.props.handleChangeEnterpriseInput }}
                        options={this.state.organizationList}
                        selectedValue={this.props.organizationFilterSelectedData}
                        name=''
                        isMulti={false}
                        placeholder="Organization"
                        isDisabled={false}
                        isClearable={true}
                        closeButton={true}
                        menuHeader="Organization"
                        //defaultMenuIsOpen={true}
                        isSearchable={true}
                    />
                </div>
            </>

        );
    }
}

const mapStateToProps = (globalState) => {
    return {
        userCredentials: globalState.LoginReducer.userCredentials,
        roleWisePermission: globalState.mainReducerData.roleWisePermission
    };
}

export default withRouter(connect(mapStateToProps, { loaderStateTrue, loaderStateFalse })
    (SearchAutosuggestComponent));