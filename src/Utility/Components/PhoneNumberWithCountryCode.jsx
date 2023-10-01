import React, { Component } from 'react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

class PhoneNumberWithCountryCode extends Component {
    render() {
        const { title, labelShow, disabled, onChange, value, error, parentClassName, labelClassName, errorClassName, errorLabelShow, country } = this.props;
        return (
            <div className={parentClassName}>
                {labelShow ?
                    <label className={labelClassName}>{title}</label> : null}
                <PhoneInput
                    disabled={disabled}
                    country={country}
                    value={value}
                    onChange={(e) => onChange(e)}
                />
                {errorLabelShow ?
                    <div className={errorClassName}>{error}</div> : null}
            </div>
        );
    }
}
PhoneNumberWithCountryCode.defaultProps = {
    parentClassName: "input_field_inner_phone",
    labelClassName: "input_field_inner_phone_label",
    errorClassName: "errorClass error_div error_phone_number",
    title: "Phone Number",
    labelShow: true,
    disabled: false,
    errorLabelShow: true
}
const mapStateToProps = (globalState) => {
    return {

    };
}

export default withRouter(connect(mapStateToProps, {})
    (withTranslation()(PhoneNumberWithCountryCode)));