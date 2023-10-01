import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import CustomInput from '../Components/CustomInput';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import CustomButton from './CustomButton';


class ConfirmationAlert extends Component {
    render() {
        const {
            BodyFirstContent, BodySecondContent, BodyThirdContent, BodyForthContent, BodyFifthContent, confirmationButtonContent, cancelButtonContent, remarkInput, t, placeholder, errorLabel, value, onChange, remarkName, saveShow, cancelShow } = this.props;
        return (
            <div className="modalinnerbody">
                <p>{BodyFirstContent} <span>{BodySecondContent}</span> {BodyThirdContent} {BodyForthContent} {BodyFifthContent}</p>
                {remarkInput ?
                    <div className="remarkinputinner">
                        <CustomInput
                            parentClassName="input_field_inner"
                            //labelName=""
                            errorLabel={errorLabel}
                            name={remarkName}
                            type="textarea"
                            value={value}
                            labelPresent={true}
                            placeholder={placeholder}
                            onChange={onChange}
                        />
                    </div> : null}
                <div className="col-md-12 modfooterbtn">
                    {saveShow ? <>
                        <CustomButton
                            onClick={this.props.deleteConfirmButton}
                            className="savebtn"
                            children={confirmationButtonContent}
                        />
                    </> : null
                        // <button type="button" className="savebtn" onClick={this.props.deleteConfirmButton}>{confirmationButtonContent}</button> : null
                    }
                    {cancelShow ?
                        <>
                            <CustomButton
                                onClick={this.props.deleteCancleButton}
                                className="cancelbtn"
                                children={cancelButtonContent}
                            />
                        </> : null
                        // <button type="button" className="cancelbtn" onClick={this.props.deleteCancleButton}>{cancelButtonContent}</button> : null
                    }
                </div>
            </div>
        );
    }
}


ConfirmationAlert.defaultProps = {
    BodyFirstContent: "",
    BodySecondContent: "",
    BodyThirdContent: "",
    BodyForthContent: "",
    BodyFifthContent: "",
    confirmationButtonContent: "",
    cancelButtonContent: "",
    remarkInput: false,
    placeholder: "",
    remarkName: "deleteRemarkName",
    saveShow: true,
    cancelShow: true
}

const mapStateToProps = (globalState) => {
    return {

    };
}

export default withRouter(connect(mapStateToProps, {})
    (withTranslation()(ConfirmationAlert)));

//export default ConfirmationAlert;
