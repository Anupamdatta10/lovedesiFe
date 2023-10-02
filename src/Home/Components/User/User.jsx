import React, { Component } from 'react';
import UserModalContent from './Components/UserModalContent'
import { AgGridReact } from '@ag-grid-community/react';
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import * as UserController from './Controller/UserController';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ConfirmationAlert from '../../../Utility/Components/ConfirmationAlert';
import { loaderStateTrue, loaderStateFalse } from '../../../Actions/AllAction';
import { setToken, setUserCredentials, logOutApp } from '../../../Login/Actions/LoginAction';
// import CustomInput from '../../../../Utility/Components/CustomInput';
import Utility from '../../../Utility/Utility';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ModalGlobal from '../../../Utility/Components/ModalGlobal'
import HomeUtility from '../../Utility/Utility'
import moment from 'moment';
import Config from '../../../Utility/Config';
import { DebounceInput } from 'react-debounce-input';
import { element } from 'prop-types';
import _ from 'lodash';
import CustomButton from '../../../Utility/Components/CustomButton';
import ErrorBoundary from '../../../Utility/Components/ErrorBoundary';


class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modules: [InfiniteRowModelModule],
            tooltipShowDelay: 0,
            exportModal: false,
            selectedRowsData: {},
            columnDefs: [
                {
                    headerName: "",
                    field: "profile_img_temp",
                    //width: 65,
                    maxWidth: 72,
                    //cellRenderer: 'loadingRenderer',
                    cellRendererFramework: (params) => {
                        if (params && params.data) {
                            if (params.data.profile_img_temp) {
                                return <div className="gridusericon">
                                </div>
                            } else {
                                return <div></div>
                                //<img src="https://www.ag-grid.com/example-assets/loading.gif" />
                            }
                        } else {
                            return <div></div>
                            //return <img src="https://www.ag-grid.com/example-assets/loading.gif" />
                        }
                    }
                },
                {
                    headerName: 'Name',
                    field: "first_name",
                    minWidth: 300,
                    //resizable: true
                    cellRendererFramework: (params) => {
                        if (params.data) {
                            let concatname = params.data.first_name + "" + params.data.last_name
                            if (params.data.first_name && params.data.first_name && concatname.length > 15) {
                                return <div className="usercursor"><span className="textrenderview">
                                    <OverlayTrigger overlay={<Tooltip>{params.data && params.data.first_name != "" ? Utility.displayNameFormat(params.data.first_name, params.data.last_name) : ""}</Tooltip>}>
                                        <span >
                                            {params.data && params.data.first_name != "" ? Utility.displayNameFormat(params.data.first_name, params.data.last_name) : ""}
                                        </span>
                                    </OverlayTrigger>
                                </span></div>
                            } else {
                                return (<div className="usercursor"><span className="textrenderview">{params.data && params.data.first_name != "" ? Utility.displayNameFormat(params.data.first_name, params.data.last_name) : ""}</span></div>)
                                //return null;
                            }

                        } else {
                            return null;
                        }
                    },
                },
                {
                    headerName: 'Email',
                    field: "email",
                    minWidth: 300,
                    cellRendererFramework: (params) => {
                        if (params.data) {
                            if (params.data.email && params.data.email.length > 20) {
                                return <div className="usercursor"><span className="textrenderview">
                                    <OverlayTrigger overlay={<Tooltip>{params.data.email}</Tooltip>}>
                                        <span >{params.data.email}</span>
                                    </OverlayTrigger>
                                </span></div>
                            } else {
                                return <div className="usercursor"><span className="textnowrapview">{params.data.email}</span></div>
                            }
                        } else {
                            return null;
                        }
                    },
                    //resizable: true
                },
                {
                    headerName: `Role`,
                    field: "user_type",
                    minWidth: 90,
                    //resizable: true
                    cellRendererFramework: (params) => {
                        if (params.data) {
                            if (params.data.hasOwnProperty('user_type') && params.data.user_type != "") {
                                return <div className="usercursor">{(params.data.user_type).charAt(0).toUpperCase()
                                    + (params.data.user_type).slice(1)}</div>
                            }
                        } else {
                            return null
                        }
                    },
                },

                

                {
                    headerName: 'Phone Number',
                    field: "contact_number",
                    minWidth: 250,
                    //resizable: true
                    cellRendererFramework: (params) => {
                        if (params.data) {
                            return <div className="usercursor">{params.data.contact_number}</div>
                        } else {
                            return null
                        }
                    },
                }
            ],
            defaultColDef: {
                flex: 1,
                //resizable: true,
                minWidth: 90

            },
            components: {
                loadingRenderer: (params) => {
                    //console.log("params=================== worker", params)
                    //return null;
                    if (params.value !== undefined) {
                        return params.value;
                    } else {
                        return '<img src="https://www.ag-grid.com/example-assets/loading.gif">';
                    }
                },
            },

            //grid filter
            userName: "",

            userModalFlag: false,
            actionModalflag: false,

            userFormData: {
                name: "",
                firstName: "",
                email: "",
                phone_number: "",
                profileImage: "",
                selectedOrganisation: "",
            },
            traname: "",
            trafirstName: "",
            traemail: "",
            traphone_number: "",

            //error state
            tranameError: "",
            firstNameError: "",
            emailError: "",
            phone_numberError: "",
            profileImageError: "",


            trafirstNameError: "",
            traemailError: "",
            traphone_numberError: "",

            workercontentdisplay: "",
            confirmationAlertModal: false,

            workerModalChange: false,

            //global Confirmation modal
            globalConfirmationModalShow: false,
            globalConfirmationModalTitle: "",
            globalConfirmationModalBodyFirstContent: "",
            globalConfirmationModalBodySecondContent: "",
            globalConfirmationModalBodyThirdContent: "",
            //global Confirmation modal

            paramsData: {},

            //IMage crop
            totalDatasetCount: 0,


        },
            this.gridOptions = {
                infiniteInitialRowCount: 1,
                //onGridReady,
                paginationPageSize: 100,
                rowBuffer: 0,
                rowModelType: 'infinite',
                suppressCellSelection: true,
                suppressHorizontalScroll: true,
            },

            this.exportOutsideClickRef = React.createRef();

    }


    onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridparams = params;
        var datasource = this.serverSideDataSource()
        params.api.setDatasource(datasource);
        this.setState({
            paramsData: params
        })
    };

    serverSideDataSource = () => {
        const {userName } = this.state;
        let that = this


        return false;
        return {
            getRows(params) {
                const { startRow, endRow, filterModel, sortModel } = params
                const { loaderStateTrue, loaderStateFalse } = that.props;
                loaderStateTrue();
                let filters = {};
                let globalQueryParamshash = {};
                if (userName != "") {
                    globalQueryParamshash['search_attr'] = userName
                    filters['filter_op'] = { "search_attr": "substring" }
                }

                globalQueryParamshash["offset"] = startRow;
                globalQueryParamshash["limit"] = Config.pageDataLimit;

                filters['filters'] = globalQueryParamshash
                UserController.workerListing(filters).then((response) => {
                    if (response.success) {
                        that.setState({
                            totalDatasetCount: response.total
                        })
                        params.successCallback(response.data, response.total);
                        let promiseArr = []
                        response.data.map((item, index) => {
                            let promise = new Promise((resolve, reject) => {
                                that.profileImageUi(item.id).then((data) => {
                                    item["profile_img_temp"] = data
                                    resolve(item)
                                })
                            })
                            promiseArr.push(promise)
                        })

                        Promise.all(promiseArr).then((values) => {
                            params.successCallback(values, response.total);
                        });

                    } else {
                        console.error(error);
                        params.failCallback();
                        Utility.toastNotifications('Something went wrong !', "Error", "error")
                    }
                    loaderStateFalse();
                }).catch((error) => {
                    console.error("************error*************", error)
                    if (error) {
                        //Utility.toastNotifications(error.message, "Error", "error");
                    }
                    loaderStateFalse();
                    if (error.message == "Network Error") {

                    }
                });
            }
        };
    }


    resetDataGrid = () => {
        this.gridparams.api.purgeServerSideCache(null)
        var datasource = this.serverSideDataSource()
        this.gridparams.api.setDatasource(datasource);

    }


    componentDidMount = () => {
        document.body.addEventListener('mousedown', this.handleClickOutside.bind(this));
    }

    componentWillUnmount() {
        document.body.removeEventListener('mousedown', this.handleClickOutside.bind(this));
    }

    handleClickOutside(event) {
        if (this.exportOutsideClickRef.current != null) {
            if (this.exportOutsideClickRef && this.exportOutsideClickRef.current && !this.exportOutsideClickRef.current.contains(event.target)) {

                this.setState({
                    actionModalflag: false
                })
            }
        }

    }

    profileImageUi = (id) => {
        const promise = new Promise((resolve, reject) => {
            const { loaderStateTrue, loaderStateFalse } = this.props;
            loaderStateTrue();
            let data = {};
            data["filters"] = JSON.stringify(Config.thumbnailSize)
            UserController.user_Details(id, data).then((response) => {
                if (response.success) {
                    let responseUserDetails = response.data[0].user_details
                    if (responseUserDetails && Object.keys(responseUserDetails.profile_img).length > 0) {
                        resolve(responseUserDetails.profile_img.file_obj)
                    }
                    else {
                        //resolve(require('../../../../Utility/Public/images/usericon.png'))
                        resolve(responseUserDetails.profile_img)
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

    handleUserSearchBar = (e) => {
        this.setState({
            userName: e.target.value
        }, () => {
            this.resetDataGrid();
        })
    }

    closeUserModal = () => {
        this.setState({
            userModalFlag: false
        }, () => {
            this.resetWorkerFrom();
        })

    }

    travailleurHandleChange = (e) => {
        const { name, value } = e.target;
        const { userFormData } = this.state;

        if (name == 'name') {
            if (value != "") {
                this.setState({
                    traname: value,
                    tranameError: ""
                }, () => {
                    userFormData['name'] = value;
                })
            } else {
                this.setState({
                    traname: value,
                }, () => {
                    userFormData['name'] = value;
                })
            }
        }

        if (name == 'firstName') {
            if (value != "") {
                this.setState({
                    trafirstName: value,
                    trafirstNameError: ""
                }, () => {
                    userFormData['firstName'] = value;
                })
            } else {
                this.setState({
                    trafirstName: value,
                }, () => {
                    userFormData['firstName'] = value;
                })
            }
        }

        if (name == 'email') {
            userFormData['email'] = value;
            this.setState({
                traemail: value,
                traemailError: "",
                userFormData
            })
        }

        if (name == 'phone_number') {

            if (value == "") {
                this.setState({
                    traphone_number: value,
                }, () => {
                    userFormData['phone_number'] = value;
                })
            } else {
                let phoneValidate = HomeUtility.validate_Phone_Number(value);
                //console.log("phoneValidate",phoneValidate)
                if (phoneValidate) {

                    this.setState({
                        traphone_number: value,
                        traphone_numberError: ""
                    }, () => {
                        userFormData['phone_number'] = value;
                    })

                } else {
                    this.setState({
                        traphone_number: value,
                        traphone_numberError: ""
                    }, () => {
                        userFormData['phone_number'] = value;
                    })

                }

            }
        }

        this.setState({
            userFormData,
            workerModalChange: true
        })

    }

    addWorkerDecisionMaker = () => {
        let valid = this.nextPagePermisionWorkerFormValid();
        const { userFormData } = this.state;
        if (valid) {
            this.addWorker()
        }

    }

    addWorker = () => {

        let valid = this.nextPagePermisionWorkerFormValid();
        const { userFormData } = this.state;
        // console.log("valid addWorker==========>>>", valid);
        //console.log("valid userFormData==========>>>", this.state.userFormData);

        if (valid) {
            const { loaderStateTrue, loaderStateFalse } = this.props;
            let dataset = this.formatingAddworkerData();
            // console.log("dataset========", dataset)
            //return false;
            let type = 'post';
            loaderStateTrue();
            UserController.workerAdd([dataset.user_details], type).then((response) => {
                if (response.length > 0) {
                    response.map((data, index) => {
                        if (data.success) {

                            let promiseArr = [
                                this.workerRelationInsert(data, dataset.user_relation_info).then(() => {})
                            ]
                            Promise.all(promiseArr).then((responses) => {
                                this.setState({ workerModalChange: false }, () => {
                                    this.closeUserModal();
                                })
                                this.resetDataGrid()
                                Utility.toastNotifications(data.message, "Success", "success");
                            })
                            this.confirmationModalCancelButton()
                            loaderStateFalse();
                        } else {
                            Utility.toastNotifications(data.message, "Error", "error")
                            loaderStateFalse();
                        }
                    })
                }


            }).catch((error) => {
                console.error("************error*************", error)
                if (error) {
                    //Utility.toastNotifications(error.message, "Error", "error");
                }
                loaderStateFalse();
                if (error.message == "Network Error") {
                }
                if (error.response.status == 406) {
                    Utility.toastNotifications(error.response.data.message, "Error", "error");
                }
            });
        }
    }

    workerRelationInsert = (data, dataset) => {
        const promise = new Promise((resolve, reject) => {
            const { loaderStateTrue, loaderStateFalse } = this.props;
            dataset['user_id'] = data.data[0].id;
            loaderStateTrue();
            UserController.userRelationalDetailsAdd([dataset], 'post').then((response) => {
                loaderStateFalse();
                if (response.length > 0) {
                    resolve(response)
                    response.map((data, index) => {
                        if (data.success) {
                        } else {
                            Utility.toastNotifications(data.message, "Error", "error")
                        }
                    })
                }
            }).catch((error) => {
                //errorConsoleAdded
                console.error("************error*************", error)
                if (error) {
                }
                loaderStateFalse();
                if (error.message == "Network Error") {

                }
            });
        })
        return promise
    }


    confirmationModalShow = () => {
        this.setState({
            confirmationAlertModal: true,
        })
    }

    confirmationModalHide = () => {
        this.setState({
            confirmationAlertModal: false,
        })
    }

    confirmationModalConfirmButton = () => {
        this.addWorker()
    }
    confirmationModalCancelButton = () => {
        this.confirmationModalHide();
    }


    resetWorkerFrom = () => {
        this.setState({
            userFormData: {
                name: "",
                firstName: "",
                email: "",
                phone_number: "",
                profileImage: "",
            },
            traname: "",
            trafirstName: "",
            traemail: "",
            traphone_number: "",
            //error state
            tranameError: "",
            firstNameError: "",
            emailError: "",
            phone_numberError: "",
            profileImageError: "",
            trafirstNameError: "",
            traemailError: "",
            traphone_numberError: "",
            workerModalChange: false,

        })
    }

    formatingAddworkerData = () => {
        const { userFormData } = this.state;
        let userDetailHash = {};

        let user_details = {};
        user_details['first_name'] = userFormData.firstName != "" ? userFormData.firstName : "";
        user_details['last_name'] = userFormData.name != "" ? userFormData.name : "";
        user_details['email'] = userFormData.email != "" ? userFormData.email : "";
        user_details['profile_img'] = userFormData.profileImage != "" ? userFormData.profileImage : "";
        user_details['contact_number'] = userFormData.phone_number != "" ? userFormData.phone_number : "";
        user_details['status'] = true;
        // user_details['org_id'] = userFormData.selectedOrganisation.value != 0 ? userFormData.selectedOrganisation.value : 0;


        userDetailHash['user_details'] = user_details;

        let user_relation_info = {};

        user_relation_info['org_id'] = userFormData.selectedOrganisation.value != 0 ? userFormData.selectedOrganisation.value : 0;


        userDetailHash['user_relation_info'] = user_relation_info;

        return userDetailHash;
    }

    userModalfunction = () => {
        this.setState({
            userModalFlag: true
        })
    }

    nextPagePermisionWorkerFormValid = () => {
        const { userFormData } = this.state;
        let valid = true;

        if (userFormData.name == "") {
            this.setState({
                tranameError: 'Required field'
            })
            valid = false;
        } else {
            this.setState({
                tranameError: ""
            })
        }

        if (userFormData.firstName == "") {
            this.setState({
                trafirstNameError: 'Required field'
            })

            valid = false;
        } else {
            this.setState({
                trafirstNameError: ""
            })
        }

        if (userFormData.email == "") {

            this.setState({
                traemailError: 'Required field'
            })

            valid = false;
        } else {
            var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if (!expr.test(userFormData.email)) {
                this.setState({
                    traemailError: 'Enter valid email'
                })
                valid = false;
            } else {
                this.setState({
                    traemailError: ""
                })
            }

        }


        if (userFormData.phone_number == "") {
            this.setState({
                traphone_numberError: 'Required field'
            })

            valid = false;
        } else {

            let phoneValidate = HomeUtility.validate_Phone_Number_without_plus(Config.phoneNumberWithoutPlus + userFormData.phone_number);
            // HomeUtility.validate_Phone_Number(userFormData.phone_number);
            //console.log("phoneValidate",phoneValidate)
            if (phoneValidate) {
                this.setState({
                    traphone_numberError: ""
                })
            } else {
                this.setState({
                    traphone_numberError: 'Enter correct phone number'
                })

                valid = false;
            }
        }


        return valid;

    }


    globalConfirmationModalShow = (data) => {
        this.setState({
            globalConfirmationModalShow: true
        }, () => {
            this.setState({
                globalConfirmationModalTitle: data.title ? data.title : "",
                globalConfirmationModalBodyFirstContent: data.firstBodyContent ? data.firstBodyContent : "",
                globalConfirmationModalBodySecondContent: data.secondBodyContent ? data.secondBodyContent : "",
                globalConfirmationModalBodyThirdContent: data.thirdBodyContent ? data.thirdBodyContent : ""
            })
        })
    }

    globalConfirmButton = () => {
        this.globalCancelButton()
        this.setState({
            userModalFlag: false,
        }, () => {
            this.resetWorkerFrom();
        })
    }

    globalCancelButton = () => {
        this.setState({
            globalConfirmationModalShow: false,
            globalConfirmationModalTitle: "",
            globalConfirmationModalBodyFirstContent: "",
            globalConfirmationModalBodySecondContent: "",
            globalConfirmationModalBodyThirdContent: ""
        })
    }

    clearSearchValue = () => {
        this.setState({
            userName: ""
        }, () => {
            this.resetDataGrid()
        })
    }

    //Image url crop

    actionModalfunction = (e) => {
        let width = (parseInt(e.clientX) - 190) + 'px'
        let height = (parseInt(e.clientY) - 5) + 'px'
        this.setState({
            actionModalflag: true,
            overlayHight: height,
            overlayWidth: width,
        })
    }

    phoneNumberInputHandleChangeFn = (phone_number) => {
        const { traphone_number, userFormData } = this.state;
        let phoneNumberTemp = traphone_number
        if (phone_number != "") {
            let phoneValidate = HomeUtility.validate_Phone_Number_without_plus(phone_number);
            // console.log("phoneValidate======", phoneValidate)
            if (phoneValidate) {
                phoneNumberTemp = phone_number;
                this.setState({
                    traphone_numberError: ""
                }, () => {
                    userFormData['phone_number'] = phoneNumberTemp;
                })
            } else {
                phoneNumberTemp = phone_number;
                this.setState({
                    // handleChangeUserInformationPhoneNumberFlag: true,
                    phoneNumberError: "Enter valid phone number"
                })
            }
        } else {
            phoneNumberTemp = "";
            this.setState({
                // handleChangeUserInformationPhoneNumberFlag: true,
                // phoneNumberError: "Enter a phone number"
            })
        }
        this.setState({
            traphone_number: Config.phoneNumberWithOrwithoutPlus + '' + phoneNumberTemp
        }, () => {
            userFormData['phone_number'] = Config.phoneNumberWithOrwithoutPlus + '' + phoneNumberTemp;
        })
    }


    render() {
        return (
            <div className="gridcontainer" id="worker_gridcontainer_id">
                <div className={`${this.state.workercontentdisplay} totalworkercontent`}>
                    <div className="gridtopviews gridtopviewsHistory">
                        <div className="rightboxes">
                            <CustomButton
                                onClick={this.userModalfunction}
                                className="customButtonClass"
                                children="Add"
                            />
                        </div>
                        <div className="pageinnersearch">
                            <button type="button" className="btn btn-link search_btn_addon"><i className="fa fa-search"></i></button>
                            <DebounceInput
                                minLength={2}
                                debounceTimeout={500}
                                //onChange={(e) => handleUserSearchBar(e)}
                                placeholder="Search a user"
                            //value={userName}
                            />
                            < button type="button" className="btn btn-link dropclosebtn"
                                onClick={this.clearSearchValue}>
                                <img src={require('../../../Utility/Public/images/dropcloseicon.png')} className="searchClearIcon" />
                            </button>
                        </div>
                    </div>

                    <div className="ag-theme-alpine aggridview homeag">
                        <AgGridReact
                            modules={this.state.modules}
                            columnDefs={this.state.columnDefs}
                            defaultColDef={this.state.defaultColDef}
                            components={this.state.components}
                            rowSelection="single"
                            rowModelType="infinite"
                            onGridReady={this.onGridReady}
                            rowHeight={62.5}
                            headerHeight={47}
                            onSelectionChanged={(e) => { this.onSelectionChanged(e) }}
                            cacheBlockSize={Config.pageDataLimit}
                            gridOptions={this.gridOptions}
                        //cacheBlockSize='300'
                        />
                    </div>
                    {/*==========================*/}
                    <ErrorBoundary title="ModalGlobal Error">
                        <ModalGlobal
                            show={this.state.userModalFlag}
                            onHide={this.closeUserModal}
                            title='New user'
                            className="modalcustomize mondimension"
                            footer={false}
                            closeButton={true}
                            body={
                                <>
                                    <ErrorBoundary title="WorkerModalContent Error">
                                        <UserModalContent
                                            userFormData={this.state.userFormData}
                                            traname={this.state.traname}
                                            trafirstName={this.state.trafirstName}
                                            traemail={this.state.traemail}
                                            traphone_number={this.state.traphone_number}
                                            tranameError={this.state.tranameError}
                                            trafirstNameError={this.state.trafirstNameError}
                                            traemailError={this.state.traemailError}
                                            traphone_numberError={this.state.traphone_numberError}
                                            travailleurHandleChange={this.travailleurHandleChange}
                                            nextAdd={this.nextAdd}
                                            addWorkerDecisionMaker={this.addWorkerDecisionMaker}
                                            closeUserModal={this.closeUserModal}
                                            phoneNumberInputHandleChangeFn={this.phoneNumberInputHandleChangeFn}
                                        />
                                    </ErrorBoundary>
                                </>
                            }
                        />
                    </ErrorBoundary>
                    {/* <ErrorBoundary title="ModalGlobal Error">
                        <ModalGlobal
                            show={this.state.globalConfirmationModalShow}
                            onHide={this.globalConfirmationModalHide}
                            className="modalcustomize confirmationalertmodal"
                            bodyClassName="cancelConfirmationbody"
                            headerclassName="close_btn_icon"
                            title={this.state.globalConfirmationModalTitle}
                            footer={false}
                            body={
                                <>
                                    <ErrorBoundary title="ConfirmationAlert Error">
                                        <ConfirmationAlert
                                            BodyFirstContent={this.state.globalConfirmationModalBodyFirstContent}

                                            BodySecondContent={this.state.globalConfirmationModalBodySecondContent}

                                            BodyThirdContent={this.state.globalConfirmationModalBodyThirdContent}

                                            confirmationButtonContent='Confirm'
                                            cancelButtonContent='Cancel'
                                            deleteConfirmButton={this.globalConfirmButton}
                                            deleteCancleButton={this.globalCancelButton}
                                        />
                                    </ErrorBoundary>
                                </>
                            }
                        />
                    </ErrorBoundary> */}


                </div>
            </div >
        );
    }
}


const mapStateToProps = (globalState) => {
    // console.log('global state ---------worker page ----->', globalState);
    return {
        userCredentials: globalState.LoginReducer.userCredentials,
        roleWisePermission: globalState.mainReducerData.roleWisePermission
    };
}

export default withRouter(connect(mapStateToProps, { loaderStateTrue, loaderStateFalse, setToken, setUserCredentials, logOutApp })(User));