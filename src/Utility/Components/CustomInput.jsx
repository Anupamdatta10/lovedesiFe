import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CustomInput extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { name, type, id, value, placeholder, className, parentClassName, errorClassName, errorLabel, labelPresent, labelClassName, labelName, onBlur, onFocus, onChange, readOnly, onClick, onKeyDown, inputIcon,maxlength, requiredStar } = this.props;
        if (type == "textarea") {
            const textArea = document.getElementById(id)
            const textRowCount = textArea ? textArea.value.split("\n").length : 0
            const rows = textRowCount
            return (
                <div className={parentClassName}>
                    {labelPresent ? <label className={labelClassName}>{labelName} {requiredStar && <span>*</span>}</label> : null}
                    <textarea
                        rows={rows}
                        onChange={onChange}
                        name={name}
                        type={type}
                        className={className}
                        id={id}
                        value={value}
                        onBlur={onBlur}
                        onFocus={onFocus}
                        onClick={onClick}
                        onKeyDown={onKeyDown}
                        placeholder={placeholder}
                        readOnly={readOnly}
                    />
                    <div className={errorClassName}>{errorLabel}</div>
                </div>
            );
        } else {
            return (
                <div className={parentClassName}>
                    {labelPresent ? <label className={labelClassName}>{labelName} {requiredStar && <span>*</span> }</label> : null}
                    <span className={inputIcon}></span>
                    <input
                        onChange={onChange}
                        name={name}
                        type={type}
                        className={className}
                        id={id}
                        value={value}
                        onBlur={onBlur}
                        onFocus={onFocus}
                        onClick={onClick}
                        onKeyDown={onKeyDown}
                        placeholder={placeholder}
                        readOnly={readOnly}
                        maxLength={maxlength}
                    />
                    <div className={errorClassName}>{errorLabel}</div>
                </div>
            );
        }

    }
}

CustomInput.propTypes = {
    //value:PropTypes.array
}
CustomInput.defaultProps = {
    type: "text",
    className: "input__fields_property",
    parentClassName: "input_field_small_size",
    errorClassName: "col-md-12 errorClass error_div",
    errorLabel: "",
    labelPresent: false,
    labelClassName: "input_label input_label_color",
    labelName: "",
    readOnly: false,
    inputIcon: "",
    maxlength:"",
    requiredStar: true,
}
export default CustomInput;
