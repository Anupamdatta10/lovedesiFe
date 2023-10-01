import React, { Component } from 'react';
import SearchAutosuggestComponent from '../../../Utility/Components/SearchAutosuggestComponent';
import WorkerModalContent from './Components/WorkerModalContent'
import { useTranslation, withTranslation, Trans } from 'react-i18next';

import { AgGridReact } from '@ag-grid-community/react';
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import * as WorkerController from './Controller/WorkerController';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ConfirmationAlert from '../../../Utility/Components/ConfirmationAlert';


import { loaderStateTrue, loaderStateFalse } from '../../../Actions/AllAction';
import { setToken, setUserCredentials, logOutApp } from '../../../Login/Actions/LoginAction';
import UserProfile from '../UserProfile/Pages/UserProfile';
// import CustomInput from '../../../../Utility/Components/CustomInput';
import Utility from '../../../Utility/Utility';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ModalGlobal from '../../../Utility/Components/ModalGlobal'
import HomeUtility from '../../Utility/Utility'
import moment from 'moment';
import Config from '../../../Utility/Config';
import PopoverStickOnHover from '../../../Utility/Components/PopoverStickOnHover';
import { DebounceInput } from 'react-debounce-input';
import ExportModalContent from './Components/ExportModalContent';
import { element } from 'prop-types';
import _ from 'lodash';
import AutosuggestComponent from '../../../Utility/Components/AutosuggestComponent';
import GlobalHeaderFilter from '../../../Utility/Components/GlobalHeaderFilter';
import UsersFilterContent from '../../../Utility/Components/UsersFilterContent';
import ErrorBoundary from '../../../Utility/Components/ErrorBoundary';



class Worker extends Component {
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
                                    {/* {params.data.dot == 'Green' ?
                                        <span className="userStatus active">&nbsp;</span>
                                        :
                                        <span className="userStatus inactive">&nbsp;</span>
                                    } */}

                                    <PopoverStickOnHover
                                        data={params.data}
                                        placement="right"
                                    />
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
                    headerName: `Organization Name`,
                    field: "org_name	",
                    minWidth: 250,
                    //resizable: true
                    cellRendererFramework: (params) => {
                        if (params.data) {
                            return <div className="usercursor">{params.data.org_name}</div>
                        } else {
                            return null
                        }
                    },
                }, {
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
                    headerName: 'GSM',
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
            activeInActiveWorkerFilter: false,
            userName: "",
            organisationList: [],

            //Travailleurs Tab State
            travailleursModal: false,

            //user img add
            addProfileImagePreviewShow: false,
            addprofileImageSelected: require('../../../Utility/Public/images/profile-back.png'),
            addProfileImageError: "",
            actionModalflag: false,

            //travailleur state dataset 
            travailleursFormData: {
                name: "",
                firstName: "",
                email: "",
                phone_number: "",
                profileImage: "",
                selectedOrganisation: "",
                user_type: ""
            },
            traname: "",
            trafirstName: "",
            traemail: "",
            traphone_number: "",
            traprofileImage: "",
            traselectedOrganisation: "",
            user_type: "",

            //error state
            tranameError: "",
            firstNameError: "",
            emailError: "",
            phone_numberError: "",
            profileImageError: "",
            traselectedOrganisationError: "",
            user_typeError: "",


            trafirstNameError: "",
            traemailError: "",
            traphone_numberError: "",
            traprofileImageError: "",

            workercontentdisplay: "",
            profilecontentdispaly: "",
            userProfileId: "",
            childProfileTabSelected: "personal",
            showUserProfile: false,
            checkWorkerExistsFlag: false,
            confirmationAlertModal: false,

            workerModalChange: false,

            //global Confirmation modal
            globalConfirmationModalShow: false,
            globalConfirmationModalTitle: "",
            globalConfirmationModalBodyFirstContent: "",
            globalConfirmationModalBodySecondContent: "",
            globalConfirmationModalBodyThirdContent: "",
            //global Confirmation modal

            leaveTypeData: [],
            interimHideShowFlag: false,
            userProfileDetailsHash: {},

            paramsData: {},

            //IMage crop
            src: null,
            crop: {
                unit: '%',
                width: 30,
                aspect: 1 / 1
            },
            croppedImageUrl: "",

            imageCropModalFlag: false,
            userSelectedPosition: 0,
            totalDatasetCount: 0,
            organizationFilterSelectedData: "",

            userTypeList: [
                { label: "Admin", value: 'admin' },
                { label: "User", value: 'user' },
            ],
            user_type_filter: "",
            zoominzoomoutflag: "",


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
        const { activeInActiveWorkerFilter, userName, organizationFilterSelectedData, user_type_filter } = this.state;
        let that = this



        return {
            getRows(params) {
                const { startRow, endRow, filterModel, sortModel } = params
                const { loaderStateTrue, loaderStateFalse } = that.props;
                loaderStateTrue();
                let filters = {};
                let globalQueryParamshash = {};
                if (organizationFilterSelectedData != "" && organizationFilterSelectedData.value != 'all') {
                    globalQueryParamshash['org_id'] = organizationFilterSelectedData.value
                }
                if (user_type_filter != "") {
                    globalQueryParamshash['user_type'] = user_type_filter.value
                }
                if (userName != "") {
                    globalQueryParamshash['search_attr'] = userName
                    filters['filter_op'] = { "search_attr": "substring" }
                }

                //globalQueryParamshash['active'] = activeInActiveWorkerFilter == true ? false : true

                globalQueryParamshash["offset"] = startRow;
                globalQueryParamshash["limit"] = Config.pageDataLimit;
                //globalQueryParamshash["current_date_time"] = moment().format('YYYY-MM-DD HH:mm:ss');

                filters['filters'] = globalQueryParamshash
                WorkerController.workerListing(filters).then((response) => {
                    if (response.success) {
                        that.setState({
                            totalDatasetCount: response.total
                        })
                        params.successCallback(response.data, response.total);
                        let promiseArr = []
                        response.data.map((item, index) => {
                            let promise = new Promise((resolve, reject) => {
                                that.profileImageUi(item.id).then((data) => {
                                    // tempUserProfileDetailsHash[item.id.toString()] = data
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


        if (this.props.userCredentials.user_details.role_name == 'admin' || "user") {
            this.setState({
                organizationFilterSelectedData: { "label": this.props.userCredentials.user_details.org_name, value: this.props.userCredentials.user_details.org_id }
            })
        }

        if (this.props.userCredentials.user_details.role_name == 'app_admin') {
            this.setState({
                organizationFilterSelectedData: { "label": 'All', value: 'all' }
            })
        }
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
            const { loaderStateTrue, loaderStateFalse, userProfileId } = this.props;
            loaderStateTrue();
            let data = {};
            data["filters"] = JSON.stringify(Config.thumbnailSize)
            WorkerController.user_Details(id, data).then((response) => {
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


    // exportModalOpen = () => {
    //     console.log("Modal open")
    //     this.setState({
    //         exportModal: true
    //     }, () => {
    //         console.log("------>>1")
    //     })
    // }

    // exportModalCloseFn = () => {
    //     this.setState({
    //         exportModal: false
    //     }, () => {
    //         console.log("------>>2")
    //     })
    // }

    // UserExportApiCall = (e) => {
    //     console.log("expoert call", e)
    // }

    organisation = () => {
        const { loaderStateTrue, loaderStateFalse } = this.props;
        loaderStateTrue();
        let dataset = {};
        let filters = { "active": 1 }
        dataset['filters'] = filters;
        WorkerController.organisation(dataset).then((response) => {
            if (response.success) {
                let organisationArry = [];
                response.data.map((endata) => {
                    let organisationHash = {};
                    organisationHash['label'] = endata.name;
                    organisationHash['value'] = endata.id;
                    organisationArry.push(organisationHash);
                })
                this.setState({
                    organisationList: organisationArry
                }, () => {

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

    handleChangeAlltravailleurSelected = (type, event) => {
        const { travailleursFormData } = this.state;
        // console.log("event.value", event.value)
        if (type == 'Organisation') {
            this.setState({
                traselectedOrganisation: event,
                traselectedOrganisationError: "",
            }, () => {
                travailleursFormData['selectedOrganisation'] = event;
            })
        }
        if (type == 'user_type') {
            this.setState({
                user_type: event,
                user_typeError: "",
            }, () => {
                travailleursFormData['user_type'] = event;
            })
        }

        this.setState({
            travailleursFormData,
            workerModalChange: true
        }, () => {
            // console.log("travailleursFormData=========", travailleursFormData)
        })
    }

    handleUserSearchBar = (e) => {
        this.setState({
            userName: e.target.value
        }, () => {
            this.resetDataGrid();
        })
    }

    handelChangeInactive = (e) => {
        this.setState({
            activeInActiveWorkerFilter: !this.state.activeInActiveWorkerFilter
        }, () => {
            this.resetDataGrid();
        })
    }


    closeTravailleursModal = () => {
        const { t } = this.props
        // if (this.state.workerModalChange == true) {
        //     let data = {
        //         "title": t("cancelConfirmWorkerTitle"),
        //         "firstBodyContent": t("cancelConfirmWorkerContent")
        //     };
        //     this.globalConfirmationModalShow(data)
        // } else {
        //     this.setState({
        //         travailleursModal: false
        //     }, () => {
        //         this.resetWorkerFrom();
        //     })
        // }
        this.setState({
            travailleursModal: false
        }, () => {
            this.resetWorkerFrom();
        })

    }

    travailleurHandleChange = (e) => {
        const { name, value } = e.target;
        const { travailleursFormData } = this.state;

        if (name == 'name') {
            if (value != "") {
                this.setState({
                    traname: value,
                    tranameError: ""
                }, () => {
                    travailleursFormData['name'] = value;
                })
            } else {
                this.setState({
                    traname: value,
                }, () => {
                    travailleursFormData['name'] = value;
                })
            }
        }

        if (name == 'firstName') {
            if (value != "") {
                this.setState({
                    trafirstName: value,
                    trafirstNameError: ""
                }, () => {
                    travailleursFormData['firstName'] = value;
                })
            } else {
                this.setState({
                    trafirstName: value,
                }, () => {
                    travailleursFormData['firstName'] = value;
                })
            }
        }

        if (name == 'email') {
            travailleursFormData['email'] = value;
            this.setState({
                traemail: value,
                traemailError: "",
                travailleursFormData
            })
        }

        if (name == 'phone_number') {

            if (value == "") {
                this.setState({
                    traphone_number: value,
                }, () => {
                    travailleursFormData['phone_number'] = value;
                })
            } else {
                let phoneValidate = HomeUtility.validate_Phone_Number(value);
                //console.log("phoneValidate",phoneValidate)
                if (phoneValidate) {

                    this.setState({
                        traphone_number: value,
                        traphone_numberError: ""
                    }, () => {
                        travailleursFormData['phone_number'] = value;
                    })

                } else {
                    this.setState({
                        traphone_number: value,
                        traphone_numberError: ""
                    }, () => {
                        travailleursFormData['phone_number'] = value;
                    })

                }

            }
        }

        this.setState({
            travailleursFormData,
            workerModalChange: true
        })

    }

    addWorkerDecisionMaker = () => {
        let valid = this.nextPagePermisionWorkerFormValid();
        // if (this.state.checkWorkerExistsFlag == true) {
        //     this.confirmationModalShow()
        // } else {
        //     this.addWorker()
        // }
        const { travailleursFormData } = this.state;
        // console.log("addWorkerDecisionMaker travailleursFormData===========", travailleursFormData)
        if (valid) {
            this.addWorker()
        }

    }

    addWorker = () => {

        let valid = this.nextPagePermisionWorkerFormValid();
        const { travailleursFormData } = this.state;
        // console.log("valid addWorker==========>>>", valid);
        //console.log("valid travailleursFormData==========>>>", this.state.travailleursFormData);

        if (valid) {
            const { loaderStateTrue, loaderStateFalse } = this.props;
            let dataset = this.formatingAddworkerData();
            // console.log("dataset========", dataset)
            //return false;
            let type = 'post';
            loaderStateTrue();
            WorkerController.workerAdd([dataset.user_details], type).then((response) => {
                if (response.length > 0) {
                    response.map((data, index) => {
                        if (data.success) {

                            let promiseArr = [
                                this.workerRelationInsert(data, dataset.user_relation_info).then(() => {
                                    // this.workerProfessionalInsert(data, dataset.user_professional_info),
                                    //     this.functionDivUserRelation(data, dataset.user_relation_info),                                   
                                    //     this.userRoleRelation(data, dataset.user_role_relation_info),
                                    //     this.leaveTypeAddApi(data.data[0].id),
                                    //     this.interimAddApi(data.data[0].id),
                                    //     this.templateDivOrderRelation(data, dataset.user_relation_info, dataset.user_professional_info),
                                    //     this.userBlankShift(dataset.user_relation_info)
                                })
                            ]
                            Promise.all(promiseArr).then((responses) => {
                                this.setState({ workerModalChange: false }, () => {
                                    this.closeTravailleursModal();
                                })
                                this.resetDataGrid()
                                Utility.toastNotifications(data.message, "Success", "success");
                            })
                            this.confirmationModalCancelButton()
                            loaderStateFalse();


                            // this.closeTravailleursModal();                       
                            // this.resetDataGrid()
                            // Utility.toastNotifications(data.message, "Success", "success");                         
                            // this.confirmationModalCancelButton()
                            // loaderStateFalse();
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
            WorkerController.userRelationalDetailsAdd([dataset], 'post').then((response) => {
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
            travailleursFormData: {
                name: "",
                firstName: "",
                email: "",
                phone_number: "",
                profileImage: "",
                selectedOrganisation: "",
                user_type: ""
            },
            user_type: "",
            traname: "",
            trafirstName: "",
            traemail: "",
            traphone_number: "",
            traprofileImage: "",
            traselectedOrganisation: "",
            //error state
            tranameError: "",
            firstNameError: "",
            emailError: "",
            phone_numberError: "",
            profileImageError: "",
            traselectedOrganisationError: "",
            user_typeError: "",

            addProfileImagePreviewShow: false,
            addprofileImageSelected: require('../../../Utility/Public/images/profile-back.png'),
            trafirstNameError: "",
            traemailError: "",
            traphone_numberError: "",
            traprofileImageError: "",
            workerModalChange: false,
            leaveTypeData: [],
            interimList: [],
            zoominzoomoutflag: ""

        })
    }

    formatingAddworkerData = () => {
        const { travailleursFormData } = this.state;
        let userDetailHash = {};

        let user_details = {};
        user_details['first_name'] = travailleursFormData.firstName != "" ? travailleursFormData.firstName : "";
        user_details['last_name'] = travailleursFormData.name != "" ? travailleursFormData.name : "";
        user_details['email'] = travailleursFormData.email != "" ? travailleursFormData.email : "";
        user_details['profile_img'] = travailleursFormData.profileImage != "" ? travailleursFormData.profileImage : "";
        user_details['contact_number'] = travailleursFormData.phone_number != "" ? travailleursFormData.phone_number : "";
        //user_details['user_type'] = "admin";
        user_details['user_type'] = travailleursFormData.user_type.value != 0 ? travailleursFormData.user_type.value : 0;;
        user_details['status'] = true;
        user_details['org_id'] = travailleursFormData.selectedOrganisation.value != 0 ? travailleursFormData.selectedOrganisation.value : 0;


        userDetailHash['user_details'] = user_details;

        let user_relation_info = {};

        user_relation_info['org_id'] = travailleursFormData.selectedOrganisation.value != 0 ? travailleursFormData.selectedOrganisation.value : 0;


        userDetailHash['user_relation_info'] = user_relation_info;

        return userDetailHash;
    }

    travailleursModalfunction = () => {
        this.setState({
            travailleursModal: true
        }, () => {
            this.organisation();
        })
    }

    goToProfile = (obj) => {
        //alert()
        this.setState({
            userProfileId: obj.data.id,
            showUserProfile: true

        }, () => {
            this.props.setTabConatinerSpaceClass("tabcontainerspace")
            this.setState({
                workercontentdisplay: "workercontentdisplay",
                profilecontentdispaly: "profilecontentdispaly",
                tabcontainerspace: "tabcontainerspace",

            })
        })

    }

    nextPagePermisionWorkerFormValid = () => {
        const { travailleursFormData } = this.state;
        let valid = true;

        if (travailleursFormData.name == "") {
            this.setState({
                tranameError: 'Required field'
            })
            valid = false;
        } else {
            this.setState({
                tranameError: ""
            })
        }

        if (travailleursFormData.firstName == "") {
            this.setState({
                trafirstNameError: 'Required field'
            })

            valid = false;
        } else {
            this.setState({
                trafirstNameError: ""
            })
        }

        if (travailleursFormData.email == "") {

            this.setState({
                traemailError: 'Required field'
            })

            valid = false;
        } else {
            var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if (!expr.test(travailleursFormData.email)) {
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


        if (travailleursFormData.phone_number == "") {
            this.setState({
                traphone_numberError: 'Required field'
            })

            valid = false;
        } else {

            let phoneValidate = HomeUtility.validate_Phone_Number_without_plus(Config.phoneNumberWithoutPlus + travailleursFormData.phone_number);
            // HomeUtility.validate_Phone_Number(travailleursFormData.phone_number);
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

        if (travailleursFormData.selectedOrganisation == "") {
            this.setState({
                traselectedOrganisationError: 'Required field'
            })
            valid = false;
        } else {
            this.setState({
                traselectedOrganisationError: ""
            })
        }

        if (travailleursFormData.user_type == "") {
            this.setState({
                user_typeError: 'Required field'
            })
            valid = false;
        } else {
            this.setState({
                user_typeError: ""
            })
        }


        return valid;

    }

    backToWorker = () => {
        //alert()
        this.setState({
            workercontentdisplay: "",
            profilecontentdispaly: "",
            tabcontainerspace: "",
            //userProfileId: "",
            showUserProfile: false
        }, () => {
            this.props.setTabConatinerSpaceClass("")

            //api call

            // console.log("activeInActiveWorkerFilter===", this.state.activeInActiveWorkerFilter)

            if (this.state.activeInActiveWorkerFilter) {
                // console.log("active")
                this.setState({
                    activeInActiveWorkerFilter: false
                }, () => {
                    this.resetDataGrid()
                })

            } else {
                let filters = {};
                let globalQueryParamshash = {};
                globalQueryParamshash["offset"] = this.state.paramsData.startRow;
                globalQueryParamshash["limit"] = Config.pageDataLimit;
                filters['filters'] = globalQueryParamshash

                WorkerController.individualUser(this.state.userProfileId, filters).then((response) => {
                    let dataArry = []
                    if (response.success) {
                        if (response.data.length > 0) {

                            if (response.data[0].active) {
                                let promiseArr = []
                                response.data.map((item, index) => {
                                    let promise = new Promise((resolve, reject) => {
                                        this.profileImageUi(item.id).then((data) => {
                                            // tempUserProfileDetailsHash[item.id.toString()] = data
                                            item["profile_img_temp"] = data
                                            resolve(item)
                                        })

                                    })
                                    promiseArr.push(promise)
                                })

                                Promise.all(promiseArr).then((values) => {
                                    if (this.gridApi) {
                                        this.gridApi.forEachNode((node, i) => {
                                            if (node && node.data) {
                                                if (node.data.id == this.state.userProfileId) {
                                                    node.setSelected(false);
                                                    let rowNode = this.gridApi.getRowNode(`${i}`);
                                                    rowNode.updateData(values[0]);
                                                    this.gridApi.ensureIndexVisible(i, 'top');
                                                }
                                            }
                                        })
                                    }
                                });
                            } else {
                                this.resetDataGrid()
                            }
                        } else {
                            this.resetDataGrid()
                        }
                    }

                })

            }
        })
    }

    onSelectionChanged = () => {

        //const { roleWisePermission } = this.props;
        // if (roleWisePermission.hasOwnProperty("worker") && roleWisePermission.worker.read_write_permission != "" && roleWisePermission.worker.read_write_permission.split("").includes("W")) {

        if (this.gridApi.getSelectedRows().length > 0) {
            const selectedRows = this.gridApi.getSelectedRows()[0].id;
            this.setState({
                userProfileId: selectedRows,
                selectedRowsData: this.gridApi.getSelectedRows()[0],
                userSelectedPosition: this.gridApi.getSelectedNodes()[0].rowIndex,
                showUserProfile: true
            }, () => {
                // console.log("selectedRows======", this.state.userProfileId)
                this.props.setTabConatinerSpaceClass("tabcontainerspace")
                this.setState({
                    workercontentdisplay: "workercontentdisplay",
                    profilecontentdispaly: "profilecontentdispaly",
                    tabcontainerspace: "tabcontainerspace",

                })
            })
        }
        //}

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
            travailleursModal: false,
            leaveTypeData: []
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


    validationPermission = (eventKey) => {
        const { t, roleWisePermission } = this.props;
        let valid = false;
        if (roleWisePermission.hasOwnProperty(eventKey) && roleWisePermission[eventKey].read_write_permission != "") {
            valid = true;
        }
        return valid
    }

    clearSearchValue = () => {
        this.setState({
            userName: ""
        }, () => {
            this.resetDataGrid()
        })
    }

    //Image url crop 
    addInputProfileImageChanged = (event) => {

        let { travailleursFormData } = this.state;
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
                    travailleursFormData["profileImage"] = user_profile_image
                    this.setState({
                        travailleursFormData,
                        workerModalChange: true,
                        traprofileImageError: "",
                        addProfileImagePreviewShow: true,
                        addProfileImageError: "",
                    })
                }
            }

        } else {
            travailleursFormData["profileImage"] = ""
            this.setState({
                traprofileImageError: 'Required field',
                addProfileImagePreviewShow: false,
                travailleursFormData,
                addprofileImageSelected: 'Add Image',
                workerModalChange: true
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
        const { travailleursFormData } = this.state;
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            let user_profile_image = {}
            this.setState({ addprofileImageSelected: croppedImageUrl }, () => {
                user_profile_image["file_name"] = this.state.travailleursFormData.profileImage.file_name
                user_profile_image["file_obj"] = this.state.addprofileImageSelected
                travailleursFormData["profileImage"] = user_profile_image
                this.setState({
                    travailleursFormData
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
        const { travailleursFormData } = this.state;
        travailleursFormData["profileImage"] = ""
        this.setState({
            imageCropModalFlag: false,
            addprofileImageSelected: require('../../../Utility/Public/images/profile-back.png'),
            addProfileImageError: "",
            travailleursFormData,
            addProfileImagePreviewShow: false,
        })
    }

    imageCropDataSave = () => {
        this.setState({
            imageCropModalFlag: false
        })
    }

    actionModalfunction = (e) => {
        let width = (parseInt(e.clientX) - 190) + 'px'
        let height = (parseInt(e.clientY) - 5) + 'px'
        this.setState({
            actionModalflag: true,
            overlayHight: height,
            overlayWidth: width,
        })
    }

    // handleClickExport = (user_type) => {
    //     const { loaderStateTrue, loaderStateFalse } = this.props;
    //     let filters = {};
    //     let globalQueryParamshash = {};
    //     globalQueryParamshash["apply_for"] = user_type;
    //     if (user_type == 'user_medical_insurance') {
    //         globalQueryParamshash["is_covered_under_insurance"] = 1;
    //     }

    //     filters['filters'] = globalQueryParamshash
    //     loaderStateTrue();
    //     WorkerController.exportUser(filters).then((response) => {
    //         console.log("******response*****", response);
    //         let totalData = "";
    //         let responseData;
    //         if (user_type == "user_details") {
    //             totalData =
    //                 '"sl_no","emp_id","first_name","last_name","team","team_leader","leave_validator","designation","emp_email","bank","bank_ac","bank_customer_id","bank_ifsc_code","doj","pf_no","emp_type","emp_status","emp_phone_no","emp_address","emp_city","emp_pin_code","emp_country","date_of_birth","epf_no","father_or_husband"\n';
    //             responseData = response.data;
    //             //console.log("==========>>",element.)
    //             responseData.forEach((element, i) => {
    //                 let personalData = element.PersonalInformation ? element.PersonalInformation : {};
    //                 let orgDivRelation = element.OrgDivSubDivFuncUserRelation[0]
    //                 let innerStr = "";
    //                 innerStr += (i + 1).toString() + ",";//sl_no
    //                 innerStr += element.UserProfessionalInfo.emp_id.toString() + ",";//emp_id
    //                 innerStr += element.first_name.toString() + ",";
    //                 innerStr += element.last_name.toString() + ",";
    //                 innerStr += orgDivRelation.TeamRelation.name + ",";//team
    //                 innerStr += element.manager + ",";//manager
    //                 innerStr += `"${element.leave_validator}"` + ",";//leave_validator
    //                 innerStr += orgDivRelation.Func.name + ",";//designation
    //                 innerStr += element.email.toString() + ",";
    //                 //innerStr += "" + ",";//team_leader
    //                 innerStr += Object.keys(personalData).length > 0 ? personalData.bank_name ? personalData.bank_name + "," : "" + "," : "" + ",";//bank
    //                 innerStr += Object.keys(personalData).length > 0 ? personalData.bank_account_number ? personalData.bank_account_number + "," : "" + "," : "" + ",";//bank_ac
    //                 innerStr += Object.keys(personalData).length > 0 ? personalData.bank_customer_id ? personalData.bank_customer_id + "," : "" + "," : "" + ",";//bank_customer_id
    //                 innerStr += Object.keys(personalData).length > 0 ? personalData.bank_ifsc_code ? personalData.bank_ifsc_code + "," : "" + "," : "" + ",";//bank_ifsc_code
    //                 innerStr += moment(element.UserProfessionalInfo.joining_date).format('DD-MM-YYYY').toString() + ",";//date of joining
    //                 innerStr += element.UserProfessionalInfo.pf_no ? element.UserProfessionalInfo.pf_no.toString() + "," : "" + ",";//pf_no
    //                 innerStr += element.UserProfessionalInfo.contract_type.toString() + ",";//emp_type
    //                 innerStr += element.UserProfessionalInfo.user_status.toString() + ",";//emp_status
    //                 innerStr += element.contact_number.toString() + ",";//emp_phone_no
    //                 innerStr += Object.keys(personalData).length > 0 ? `"${personalData.address_line1} ${personalData.address_line2 ? personalData.address_line2 : ""}",` : "" + ",";//emp_address
    //                 innerStr += Object.keys(personalData).length > 0 ? personalData.city ? personalData.city + "," : "" + "," : "" + ",";
    //                 innerStr += Object.keys(personalData).length > 0 ? personalData.post_code ? personalData.post_code + "," : "" + "," : "" + ",";//pin code
    //                 innerStr += Object.keys(personalData).length > 0 ? personalData.country ? personalData.country.toString() + "," : "" + "," : "" + ",";//emp_country
    //                 innerStr += Object.keys(personalData).length > 0 ? moment(personalData.date_of_birth).format('DD-MM-YYYY').toString() + "," : "" + ",";//date_of_birth
    //                 innerStr += element.UserProfessionalInfo.epf_no ? element.UserProfessionalInfo.epf_no.toString() + "," : "" + ",";//epf_no
    //                 innerStr += Object.keys(personalData).length > 0 ? personalData.father_husband_name ? personalData.father_husband_name + "," : "" + "," : "" + ",";//father_or_husband
    //                 innerStr += "\n";
    //                 totalData += innerStr;
    //             });
    //         } else {
    //             totalData += "SL. NO,Insure's Name,Emp Code,Date Of Birth (DD/MM/YYYY),Age (Years),Gender,Relation,Aadhar Card No,Birth Certificate No\n";
    //             responseData = response.data;
    //             //console.log("=====>>",responseData);
    //             let count = 0;
    //             responseData.forEach((element, i) => {

    //                 let innerStr = "";
    //                 let emp_no = element.UserProfessionalInfo.emp_id;
    //                 //******************************************************** */
    //                 let selfHash = {};
    //                 let index = -1;
    //                 let UserFamilyDetails = element.UserFamilyDetails;
    //                 for (let i = 0; i < UserFamilyDetails.length; i++) {
    //                     let detail = UserFamilyDetails[i];
    //                     if (detail.relation == "Self") {
    //                         selfHash = detail;
    //                         index = i;
    //                         break;
    //                     }
    //                 }
    //                 if (index == -1) {
    //                     let inner_hash = {};
    //                     // "beneficiary_name": "eeeee",
    //                     // "relation": "Mother",
    //                     // "sex": "M",
    //                     // "date_of_birth": "2023-03-03",
    //                     inner_hash["beneficiary_name"] = `${element.first_name} ${element.last_name}`;
    //                     inner_hash["relation"] = "Self";
    //                     inner_hash["sex"] = element.PersonalInformation.gender == 'male' ? "M" : "F";
    //                     inner_hash["date_of_birth"] = element.PersonalInformation.date_of_birth;
    //                     inner_hash["FamilyDetailsDocument"] = [{
    //                         "id": 0,
    //                         "family_details_id": 0,
    //                         "identity_type": "aadhar",
    //                         "identity_no": element.PersonalInformation.national_registration_number,
    //                         "identity_document_id": 0,
    //                         "createdAt": "0000-00-00T00:00:00.000Z"
    //                     }]
    //                     selfHash = inner_hash;
    //                     UserFamilyDetails.unshift(selfHash);

    //                 }
    //                 if (index > 0) {
    //                     UserFamilyDetails.splice(index, 1);
    //                     UserFamilyDetails.unshift(selfHash);
    //                 }
    //                 //******************************************************** */
    //                 //console.log("UserFamilyDetails",UserFamilyDetails);
    //                 UserFamilyDetails.forEach((elem, j) => {
    //                     //console.log("element==>",elem);
    //                     const diff = moment().diff(elem.date_of_birth);
    //                     const duration = moment.duration(diff);
    //                     const years = duration.years();
    //                     const months = duration.months();
    //                     let innerStr = "";
    //                     let adhar_index = _.findIndex(elem.FamilyDetailsDocument, (person) => person.identity_type == 'aadhar');
    //                     if (element.id == 78) {
    //                         console.log("adhar_index", adhar_index);
    //                     }
    //                     let birth_index = _.findIndex(elem.FamilyDetailsDocument, (person) => person.identity_type == 'birth_certificate');
    //                     let age = months >= 6 ? (years + 1) : years < 1 ? 1 : years;
    //                     //console.log("adhar_index", adhar_index);
    //                     //let aadhar=element.UserFamilyDetails.FamilyDetailsDocument
    //                     innerStr += (++count).toString() + ",";
    //                     //count++;
    //                     innerStr += elem.beneficiary_name + ",";//name
    //                     if (elem.relation == 'Self') {
    //                         innerStr += emp_no + ",";
    //                     } else {
    //                         innerStr += emp_no + "0" + j + ",";
    //                     }
    //                     innerStr += `"${moment(elem.date_of_birth).format("DD/MM/YYYY").toString()}"` + ",";//dob
    //                     innerStr += months >= 6 ? (years + 1).toString() + "," : years < 1 ? 1 + "," : years + ",";//age
    //                     innerStr += elem.sex + ","//gender
    //                     innerStr += elem.relation + ","//relation
    //                     let aadhar_num = adhar_index != -1 ? elem.FamilyDetailsDocument[adhar_index].identity_no ? elem.FamilyDetailsDocument[adhar_index].identity_no.toString() : "" : "";
    //                     innerStr += aadhar_num + ",";//aadhar
    //                     innerStr += elem.relation == 'Child' && aadhar_num == "" ? birth_index != -1 ? elem.FamilyDetailsDocument[birth_index].identity_no.toString() : "" : "";//birth cirtificate
    //                     innerStr += "\n";
    //                     totalData += innerStr;

    //                     // console.log("======>>", elem.beneficiary_name, moment().diff(elem.date_of_birth, 'years'), birth_index);
    //                     // console.log("year=", years, "month=", months, age);

    //                 })

    //                 // innerStr = "\n\n";
    //                 totalData += innerStr;
    //             })

    //         }
    //         loaderStateFalse();
    //         //console.log("totalData------------", totalData);
    //         //if (response.success) {
    //         const url = window.URL.createObjectURL(new Blob([totalData]));
    //         const link = document.createElement("a");
    //         link.href = url;
    //         if (user_type == "user_details") {
    //             link.setAttribute(
    //                 "download",
    //                 `user_${moment().format("DD_MM_YYYY hh:mm")}.csv`
    //             );
    //         } else {
    //             link.setAttribute(
    //                 "download",
    //                 `mediclaim_details_${moment().format("DD_MM_YYYY hh:mm")}.csv`
    //             );
    //         }
    //         link.click();

    //     })
    //         .catch((error) => {
    //             console.error("*****error****", error);
    //             if (error) {
    //                 //Utility.toastNotifications(error.message, "Error", "error");
    //             }
    //             loaderStateFalse();
    //             if (error.message == "Network Error") {
    //             }
    //         });
    // }


    handleChangeOrganizationFilter = (type, event) => {
        if (type == 'organization') {
            if (event) {
                this.setState({
                    organizationFilterSelectedData: event,

                }, () => {
                    // this.department();
                    this.resetDataGrid();
                    // this.roles(this.state.enterpriseFilterSelectedData.value)
                    // console.log("organizationFilterSelectedData>>>>>>>>>", this.state.organizationFilterSelectedData)
                })
            } else {
                this.setState({
                    organizationFilterSelectedData: "",
                    user_type_filter: ""

                }, () => {
                    this.gridparams.api.setDatasource([]);
                    // this.department();
                    //this.resetDataGrid();
                })
            }
        }
    }

    handleChangeUserFilter = (type, event) => {
        if (type == 'user_type_filter') {
            if (event) {
                this.setState({
                    user_type_filter: event,
                }, () => {
                    this.resetDataGrid();
                })
            } else {
                this.setState({
                    user_type_filter: "",
                }, () => {
                    this.resetDataGrid();
                })
            }

        }

    }


    zoominFunction = () => {
        //console.log("-----zoom in ------------")
        let zoominzoomoutflag = "zoominzoomoutclass"
        this.setState({
            zoominzoomoutflag: zoominzoomoutflag
        })
    }
    zoomoutFunction = () => {
        //console.log("-----zoom out ------------")
        let zoominzoomoutflag = ""
        this.setState({
            zoominzoomoutflag: zoominzoomoutflag
        })
    }


    phoneNumberInputHandleChangeFn = (phone_number) => {
        const { traphone_number, travailleursFormData } = this.state;
        let phoneNumberTemp = traphone_number
        if (phone_number != "") {
            let phoneValidate = HomeUtility.validate_Phone_Number_without_plus(phone_number);
            // console.log("phoneValidate======", phoneValidate)
            if (phoneValidate) {
                phoneNumberTemp = phone_number;
                this.setState({
                    traphone_numberError: ""
                }, () => {
                    travailleursFormData['phone_number'] = phoneNumberTemp;
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
            travailleursFormData['phone_number'] = Config.phoneNumberWithOrwithoutPlus + '' + phoneNumberTemp;
        })
    }


    render() {
        const { overlayWidth, overlayHight } = this.state;
        const { t, roleWisePermission } = this.props;
        let roleName = this.props.userCredentials.hasOwnProperty('user_details') && this.props.userCredentials.user_details && this.props.userCredentials.user_details.hasOwnProperty('role_name') && this.props.userCredentials.user_details.role_name
        let version = this.props.userCredentials.hasOwnProperty('user_details') && this.props.userCredentials.user_details && this.props.userCredentials.user_details.hasOwnProperty('version') && this.props.userCredentials.user_details.version
        return (
            <div className="gridcontainer" id="worker_gridcontainer_id">
                <div className={`${this.state.workercontentdisplay} totalworkercontent`}>
                    <ErrorBoundary title="GlobalHeaderFilter Error">
                        <GlobalHeaderFilter
                            headerFliterContent={
                                <>
                                    <ErrorBoundary title="UsersFilterContent Error">
                                        <UsersFilterContent
                                            handleChangeOrganizationFilter={this.handleChangeOrganizationFilter}
                                            organizationFilterSelectedData={this.state.organizationFilterSelectedData}
                                            handleChangeUserFilter={this.handleChangeUserFilter}
                                            userTypeList={this.state.userTypeList}
                                            user_type_filter={this.state.user_type_filter}
                                            travailleursModalfunction={this.travailleursModalfunction}
                                            handleUserSearchBar={this.handleUserSearchBar}
                                            userName={this.state.userName}
                                            clearSearchValue={this.clearSearchValue}
                                            totalDatasetCount={this.state.totalDatasetCount}
                                        />
                                    </ErrorBoundary>
                                </>
                            }
                        />
                    </ErrorBoundary>

                    <div className={this.props.userCredentials.user_details.version != "v1" ? "ag-theme-alpine aggridview homeag" : "ag-theme-alpine aggridview homeag version1"}>
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
                            show={this.state.travailleursModal}
                            onHide={this.closeTravailleursModal}
                            title='New user'
                            className={` ${this.state.zoominzoomoutflag + ' ' + "modalcustomize mondimension"}`}
                            footer={false}
                            closeButton={true}

                            zoominButton={this.state.zoominzoomoutflag != "" ? false : true}
                            zoomoutButton={this.state.zoominzoomoutflag != "" ? true : false}
                            zoomin={this.zoominFunction}
                            zoomout={this.zoomoutFunction}
                            body={
                                <>
                                    <ErrorBoundary title="WorkerModalContent Error">
                                        <WorkerModalContent
                                            addInputProfileImageChanged={this.addInputProfileImageChanged}
                                            addprofileImageSelected={this.state.addprofileImageSelected}

                                            travailleursFormData={this.state.travailleursFormData}
                                            traname={this.state.traname}
                                            trafirstName={this.state.trafirstName}
                                            traemail={this.state.traemail}
                                            traphone_number={this.state.traphone_number}
                                            traprofileImage={this.state.traprofileImage}

                                            tranameError={this.state.tranameError}
                                            trafirstNameError={this.state.trafirstNameError}
                                            traemailError={this.state.traemailError}
                                            traphone_numberError={this.state.traphone_numberError}
                                            traprofileImageError={this.state.traprofileImageError}

                                            travailleurHandleChange={this.travailleurHandleChange}
                                            addProfileImagePreviewShow={this.state.addProfileImagePreviewShow}
                                            nextAdd={this.nextAdd}
                                            addWorkerDecisionMaker={this.addWorkerDecisionMaker}
                                            closeTravailleursModal={this.closeTravailleursModal}
                                            backPageOpen={this.backPageOpen}

                                            leaveTypeData={this.state.leaveTypeData}
                                            interimList={this.state.interimList}
                                            interimHideShowFlag={this.state.interimHideShowFlag}

                                            //Image crop
                                            crop={this.state.crop}
                                            croppedImageUrl={this.state.croppedImageUrl}
                                            src={this.state.src}
                                            onImageLoaded={this.onImageLoaded}
                                            onCropComplete={this.onCropComplete}
                                            onCropChange={this.onCropChange}
                                            imageCropModalShow={this.imageCropModalShow}
                                            imageCropModalHide={this.imageCropModalHide}
                                            imageCropModalFlag={this.state.imageCropModalFlag}
                                            imageCropDataSave={this.imageCropDataSave}

                                            organisationList={this.state.organisationList}
                                            handleChangeAlltravailleurSelected={this.handleChangeAlltravailleurSelected}
                                            traselectedOrganisation={this.state.traselectedOrganisation}
                                            traselectedOrganisationError={this.state.traselectedOrganisationError}
                                            userTypeList={this.state.userTypeList}
                                            user_type={this.state.user_type}
                                            user_typeError={this.state.user_typeError}
                                            phoneNumberInputHandleChangeFn={this.phoneNumberInputHandleChangeFn}
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
                            title='Please confirm?'
                            footer={false}
                            body={
                                <>
                                    <ErrorBoundary title="ConfirmationAlert Error">
                                        <ConfirmationAlert
                                            BodyFirstContent='User will be added as Manager and Leave Validator'
                                            confirmationButtonContent='Confirm'
                                            cancelButtonContent='Cancel'
                                            deleteConfirmButton={this.confirmationModalConfirmButton}
                                            deleteCancleButton={this.confirmationModalCancelButton}
                                        />
                                    </ErrorBoundary>
                                </>
                            }
                        />
                    </ErrorBoundary>
                    <ErrorBoundary title="ModalGlobal Error">
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
                    </ErrorBoundary>


                </div>
                {
                    this.state.showUserProfile ?
                        <>
                            <ErrorBoundary title="UserProfile Error">
                                <UserProfile
                                    profilecontentdispaly={this.state.profilecontentdispaly}
                                    backToWorker={this.backToWorker}
                                    userProfileId={this.state.userProfileId}
                                    detectChangesIndividualTab={this.props.detectChangesIndividualTab}
                                    selectedRowsData={this.state.selectedRowsData}
                                    paramsData={this.state.paramsData}
                                />
                            </ErrorBoundary>
                        </>
                        : null
                }
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

export default withRouter(connect(mapStateToProps, { loaderStateTrue, loaderStateFalse, setToken, setUserCredentials, logOutApp })
    (withTranslation()(Worker)));