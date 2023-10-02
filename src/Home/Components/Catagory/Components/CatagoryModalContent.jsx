import React, { Component } from 'react';
import CustomInput from '../../../../Utility/Components/CustomInput';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ErrorBoundary from '../../../../Utility/Components/ErrorBoundary';
import FileUpload from '../../../../Utility/Components/FileUpload';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'


class CatagoryModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }

    render() {
        const { userFormData, handleChange } = this.props;
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
                                            labelName='Name'
                                            //errorLabel={this.props.trafirstNameError}
                                            name="name"
                                            type="text"
                                            //value={this.props.trafirstName}
                                            labelPresent={true}
                                            //onChange={handleChange}
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
                                            labelName="Description"
                                            //errorLabel={this.props.tranameError}
                                            name="description"
                                            type="text"
                                            //value={this.props.traname || ""}
                                            labelPresent={true}
                                            //onChange={handleChange}
                                            //placeholder=""
                                            //readOnly={true}
                                            requiredStar={false}
                                        />
                                    </ErrorBoundary>
                                </div>
                                <div className='col-md-6'>
                                    <label>Status</label>
                                    <div className='switch_btn_customize'>

                                        <BootstrapSwitchButton
                                            checked={false}
                                        //onChange={}
                                        />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <FileUpload
                                        labelName="Image url"
                                    />
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

CatagoryModalContent.propTypes = {

}

CatagoryModalContent.defaultProps = {
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

export default withRouter(connect(mapStateToProps, {})(CatagoryModalContent));