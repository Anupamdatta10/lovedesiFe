import React, { Component } from 'react';
//import 'react-modern-calendar-datepicker/lib/DatePicker.css';
//import DatePicker, { utils } from 'react-modern-calendar-datepicker';
import CustomInput from '../../../../Utility/Components/CustomInput';
import AutosuggestComponent from '../../../../Utility/Components/AutosuggestComponent';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
// import Utility from '../../../../../Utility/Utility';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import ImageCropContent from '../../../../Utility/Components/ImageCropContent'
import ModalGlobal from '../../../../Utility/Components/ModalGlobal'
import moment from 'moment';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Config from '../../../../Utility/Config'
import ErrorBoundary from '../../../../Utility/Components/ErrorBoundary';



class WorkerModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: null,
            crop: {
                unit: '%',
                width: 30,
                aspect: 16 / 9
            },
            croppedImageUrl: "",
        }

    }

    render() {
        const { addInputProfileImageChanged, addprofileImageSelected, travailleursFormData, travailleurHandleChange, t, organisationList, phoneNumberInputHandleChangeFn } = this.props;

        const { crop, croppedImageUrl, src } = this.props;
        //console.log("props=====", props.abc);
        // console.log('organisationList====================================================>'props.organisationList)
        return (
            <>
                <div className="modalinnerbody" id="worker_add_modal_id">
                    <div className="innerbodydimension">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <ErrorBoundary title="CustomInput Error">
                                                <CustomInput
                                                    parentClassName="input_field_inner"
                                                    labelName='First name'
                                                    errorLabel={this.props.trafirstNameError}
                                                    name="firstName"
                                                    type="text"
                                                    value={this.props.trafirstName}
                                                    labelPresent={true}
                                                    onChange={travailleurHandleChange}
                                                    id="worker_fast_name"
                                                //placeholder=""
                                                //readOnly={true}
                                                />
                                            </ErrorBoundary>
                                        </div>
                                        <div className="col-md-12">
                                            <ErrorBoundary title="CustomInput Error">
                                                <CustomInput
                                                    parentClassName="input_field_inner"
                                                    labelName="Last Name"
                                                    errorLabel={this.props.tranameError}
                                                    name="name"
                                                    type="text"
                                                    value={this.props.traname || ""}
                                                    labelPresent={true}
                                                    onChange={travailleurHandleChange}
                                                    id="worker_last_name"
                                                //placeholder=""
                                                //readOnly={true}
                                                />
                                            </ErrorBoundary>
                                        </div>

                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="user_add_img modprofile">
                                        <div className="userProfileImg">
                                            {!this.props.addProfileImagePreviewShow ?
                                                <label className="custom-file-upload">
                                                    <span className="filetext">
                                                        <img src={addprofileImageSelected} />
                                                    </span>
                                                    <span className="plusicon">
                                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                                        <input type="file" onChange={addInputProfileImageChanged} />
                                                    </span>
                                                </label>
                                                :
                                                <label className="custom-file-upload">
                                                    <img src={addprofileImageSelected} />
                                                    <span className="plusicon">
                                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                                        <input type="file" onChange={this.props.addInputProfileImageChanged} />
                                                    </span>
                                                </label>
                                            }

                                            <div className="col-md-12 errorClass error_div">{this.props.traprofileImageError}</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="dropdowninnerbox">
                                        <label>Organisation <span>*</span></label>
                                        <ErrorBoundary title="AutosuggestComponent Error">
                                            <AutosuggestComponent
                                                handleOnChange={this.props.handleChangeAlltravailleurSelected.bind(this, "Organisation")}
                                                //handleOnInputChange={(e) => { this.props.handleChangeEnterpriseInput }}
                                                options={organisationList}
                                                selectedValue={this.props.traselectedOrganisation}
                                                name=''
                                                isMulti={false}
                                                placeholder=""
                                                isDisabled={false}
                                                isSearchable={true}
                                                id="worker_enterprise"
                                            //defaultMenuIsOpen={true}
                                            />
                                        </ErrorBoundary>
                                        <div className="col-md-12 errorClass error_div">{this.props.traselectedOrganisationError}</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="dropdowninnerbox">
                                        <label>User type <span>*</span></label>
                                        <ErrorBoundary title="AutosuggestComponent Error">
                                            <AutosuggestComponent
                                                handleOnChange={this.props.handleChangeAlltravailleurSelected.bind(this, "user_type")}
                                                //handleOnInputChange={(e) => { this.props.handleChangeEnterpriseInput }}
                                                options={this.props.userTypeList}
                                                selectedValue={this.props.user_type}
                                                name=''
                                                isMulti={false}
                                                placeholder=""
                                                isDisabled={false}
                                                isSearchable={true}
                                                id="user_type"
                                            //defaultMenuIsOpen={true}
                                            />
                                        </ErrorBoundary>
                                        <div className="col-md-12 errorClass error_div">{this.props.user_typeError}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-12'>
                            <div className='row'>
                                <div className="col-md-6">
                                    <ErrorBoundary title="CustomInput Error">
                                        <CustomInput
                                            parentClassName="input_field_inner"
                                            labelName='Email'
                                            errorLabel={this.props.traemailError}
                                            name="email"
                                            type="text"
                                            value={this.props.traemail}
                                            labelPresent={true}
                                            onChange={travailleurHandleChange}
                                            id="worker_email"
                                        //placeholder=""
                                        //readOnly={true}
                                        />
                                    </ErrorBoundary>
                                </div>
                                <div className="col-md-6">

                                    <div className='input_field_inner_phone'>
                                        <label className='input_field_inner_phone_label required_start_inner'>Phone Number <span className='required_start'>*</span></label>
                                        <ErrorBoundary title="PhoneInput Error">
                                            <PhoneInput
                                                // disabled={props.addNewContactFlag ? false : true}
                                                country={Config.phoneNumberCountrySeet}
                                                value={this.props.traphone_number}
                                                onChange={(e) => phoneNumberInputHandleChangeFn(e)}
                                            />
                                        </ErrorBoundary>
                                        <div className="errorClass error_div">{this.props.traphone_numberError}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-12 text-center topspace">
                        <button type="button" className="modbtn" id="submit_worker_add_data" onClick={this.props.addWorkerDecisionMaker}>Add</button>
                        <button type="button" className="modbtn cancelbtn" id="cancel_worker_add_data" onClick={this.props.closeTravailleursModal}>Cancel</button>
                    </div>
                </div>
                <ErrorBoundary title="ModalGlobal Error">
                    <ModalGlobal
                        show={this.props.imageCropModalFlag}
                        onHide={this.props.imageCropModalHide} z
                        onCancel={this.props.imageCropModalHide}
                        onSave={this.props.imageCropDataSave}
                        className="modalcustomize cropmodalcontent"
                        bodyClassName="cropmodalcontentbody"
                        headerclassName="close_btn_icon"
                        title='Crop Image'
                        footer={true}
                        closeButton={true}
                        saveButtonLabel='Crop'
                        saveButtonClassName="delconfirmbtn btn btn-primary"
                        cancelButtonClassName="delcancelbtn btn btn-primary"
                        body={
                            <>
                                <ErrorBoundary title="ModalGlobal Error">
                                    <ImageCropContent
                                        onImageLoaded={this.props.onImageLoaded}
                                        onComplete={this.props.onCropComplete}
                                        onCropChange={this.props.onCropChange}
                                        crop={this.props.crop}
                                        croppedImageUrl={this.props.croppedImageUrl}
                                        src={this.props.src}
                                        onCropComplete={this.props.onCropComplete}
                                        imageCropModalShow={this.props.imageCropModalShow}
                                    />
                                </ErrorBoundary>
                            </>
                        }
                    />
                </ErrorBoundary>
            </>
        );
    }
}

WorkerModalContent.propTypes = {

}

WorkerModalContent.defaultProps = {
    className: "modalcustomize mondimension",
    headerclassName: "close_btn_icon",
    buttonClassName: "btn btn-primary",
    BodyContent: "",
    buttonContent: "",
    bodyClassName: ""
}

const mapStateToProps = (globalState) => {
    return {

    };
}

export default withRouter(connect(mapStateToProps, {})
    (withTranslation()(WorkerModalContent)));