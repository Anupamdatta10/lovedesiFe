import React from 'react'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import SearchAutosuggestComponent from '../../Utility/Components/SearchAutosuggestComponent'
import AutosuggestComponent from '../../Utility/Components/AutosuggestComponent'
import { DebounceInput } from 'react-debounce-input';
//import DatePicker from "react-modern-calendar-datepicker";
import OrgFilter from './OrgFilter';
import CustomButton from './CustomButton';

function UsersFilterContent(props) {
    const { handleChangeOrganizationFilter, organizationFilterSelectedData, handleChangeUserFilter, userTypeList, user_type_filter, travailleursModalfunction, handleUserSearchBar, userName, clearSearchValue, totalDatasetCount, userCredentials } = props;
    let version = userCredentials?.user_details?.version
    let roleName = userCredentials?.user_details?.role_name

    return (
        <>
            <div className="">

                {version != "v1" ? <> <SearchAutosuggestComponent
                    handleChangeOrganizationFilter={handleChangeOrganizationFilter}
                    organizationFilterSelectedData={organizationFilterSelectedData}
                />
                    <div className="dropdownbox enterprisedrop">
                        <AutosuggestComponent
                            handleOnChange={(e) => { handleChangeUserFilter('user_type_filter', e) }}
                            options={userTypeList}
                            selectedValue={user_type_filter}
                            name=''
                            isMulti={false}
                            placeholder="User type"
                            isDisabled={false}
                            isClearable={true}
                            closeButton={true}
                            menuHeader="User type"
                            isSearchable={true}
                        />
                    </div>
                </>
                    : ""}
                {
                    roleName != 'user' ?
                        <div className="rightboxes">
                            {/*<button type="button" className="useraddbtn" id="worker_add_id" onClick={travailleursModalfunction}>Add</button>*/}
                            <CustomButton
                                onClick={travailleursModalfunction}
                                className="customButtonClass"
                                children="Add"
                            />
                        </div>
                        : null
                }
                <div className="pageinnersearch">
                    <button type="button" className="btn btn-link search_btn_addon"><i className="fa fa-search"></i></button>
                    <DebounceInput
                        minLength={2}
                        debounceTimeout={500}
                        onChange={(e) => handleUserSearchBar(e)}
                        placeholder="Search a user"
                        value={userName}
                    />
                    {
                        userName != "" ?
                            < button type="button" className="btn btn-link dropclosebtn" onClick={clearSearchValue}>
                                <img src={require('../../Utility/Public/images/dropcloseicon.png')} className="searchClearIcon" />
                            </button>
                            : null}
                </div>
                <div className='total_worker'>Total Users: {totalDatasetCount}</div>
            </div>
        </>
    )
}
const mapStateToProps = (globalState) => {
    return {
        userCredentials: globalState.LoginReducer.userCredentials
    };
}

export default withRouter(connect(mapStateToProps, {})
    (withTranslation()(UsersFilterContent)));
