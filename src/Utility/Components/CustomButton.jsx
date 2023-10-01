import React from 'react';
import PropTypes from 'prop-types';
import '../Public/css/CustomButton.scss';
import ReactTooltip from 'react-tooltip';

const CustomButton = ({ onClick, children, className, onMouseLeave, onMouseEnter, height, width, disabled, dataTip, place }) => {
    return (
        <>
            <button
                className={`custom-button ${className}`}
                onClick={onClick}
                onMouseLeave={onMouseLeave}
                onMouseEnter={onMouseEnter}
                disabled={disabled}
                data-tip={dataTip}
            >
                {children}
            </button>
            <ReactTooltip place={place} />
        </>
    );
};

CustomButton.propTypes = {
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    disabled: PropTypes.bool
};

CustomButton.defaultProps = {
    className: "",
    height: "",
    width: "",
    disabled: false,
    dataTip: "",
    place: "bottom"
}

export default CustomButton;
