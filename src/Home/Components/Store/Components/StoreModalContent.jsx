import React, { Component } from 'react';
import CustomInput from '../../../../Utility/Components/CustomInput';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ErrorBoundary from '../../../../Utility/Components/ErrorBoundary';
import FileUpload from '../../../../Utility/Components/FileUpload';

class StoreModalContent extends Component {
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
                                            labelName="Address"
                                            // errorLabel={this.props.tranameError}
                                            name="address"
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

StoreModalContent.propTypes = {

}

StoreModalContent.defaultProps = {
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

export default withRouter(connect(mapStateToProps, {})(StoreModalContent));