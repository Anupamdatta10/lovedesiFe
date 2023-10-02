import React, { Component } from 'react';
import CustomInput from '../../../../Utility/Components/CustomInput';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import 'react-image-crop/dist/ReactCrop.css';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Config from '../../../../Utility/Config'
import ErrorBoundary from '../../../../Utility/Components/ErrorBoundary';



class UserModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }

    render() {
        const { userFormData, travailleurHandleChange, phoneNumberInputHandleChangeFn } = this.props;
        return (
            <>
                <div className="modalinnerbody">
                    <div className="innerbodydimension">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-6">
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
                                            requiredStar={false}
                                        />
                                    </ErrorBoundary>
                                </div>
                                <div className="col-md-6">
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
                                            //placeholder=""
                                            //readOnly={true}
                                            requiredStar={false}
                                        />
                                    </ErrorBoundary>
                                </div>
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
                                            //placeholder=""
                                            //readOnly={true}
                                            requiredStar={false}
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
                        <button type="button" className="modbtn" onClick={this.props.addWorkerDecisionMaker}>Add</button>
                        <button type="button" className="modbtn cancelbtn" onClick={this.props.closeUserModal}>Cancel</button>
                    </div>
                </div >
            </>
        );
    }
}

UserModalContent.propTypes = {

}

UserModalContent.defaultProps = {
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

export default withRouter(connect(mapStateToProps, {})(UserModalContent));