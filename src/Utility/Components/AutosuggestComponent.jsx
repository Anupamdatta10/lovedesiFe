import React, { useEffect } from 'react';
import Select, { components } from "react-select";

const Menu = (props) => {
    return (
        <>
            <components.Menu {...props}>
                <div className="dropdowninnersection">
                    <div className="dropdownlabelbtn">
                        <div className="dropheaderlabel">{props.selectProps.menuHeader}</div>
                        <button className="dropheaderbtn" onClick={props.selectProps.oncloseMenu}>
                            <img src={require('../Public/images/dropcloseicon.png')} />
                        </button>
                    </div>
                    <div>{props.children}</div>
                </div>
            </components.Menu>
        </>
    );
};

const AutosuggestComponent = (props) => {

    const componentDidMount = () => {
    }
    const oncloseMenu = () => {
        // alert()
        //console.log("selectRef==>",selectRef)
        selectRef.select.blur()
    }
    let selectRef = null
    const { closeButton, menuHeader, openMenu } = props
    return (

        <div>
            {closeButton == false ?
                <Select
                    value={props.selectedValue}
                    isClearable={props.isClearable}
                    isSearchable={props.isSearchable}
                    options={props.options}
                    name={props.name}
                    //isLoading={formLoading}
                    isMulti={props.isMulti}
                    onChange={props.handleOnChange}
                    onInputChange={props.handleOnInputChange}
                    onBlur={props.handleOnBlurChange}
                    placeholder={props.placeholder}
                    isDisabled={props.isDisabled}
                    //defaultMenuIsOpen={true}
                    //checkbox={true}
                    id={props.id}
                    //ref={props.selectRef}
                    menuPosition={props.menuPosition}
                /> :
                <Select
                    value={props.selectedValue}
                    isClearable={props.isClearable}
                    isSearchable={props.isSearchable}
                    options={props.options}
                    name={props.name}
                    //isLoading={formLoading}
                    isMulti={props.isMulti}
                    onChange={props.handleOnChange}
                    onInputChange={props.handleOnInputChange}
                    onBlur={props.handleOnBlurChange}
                    placeholder={props.placeholder}
                    isDisabled={props.isDisabled}
                    components={{
                        Menu
                    }}
                    menuHeader={menuHeader}
                    //defaultMenuIsOpen={openMenu}
                    oncloseMenu={oncloseMenu}
                    //defaultMenuIsOpen={true}
                    //checkbox={true}
                    ref={(scope) => { selectRef = scope }}
                />}

        </div>
    );

}
AutosuggestComponent.defaultProps = {
    isClearable: false,
    closeButton: false,
    menuHeader: "",
    openMenu: true,
    isSearchable: false,
    id: "",
    //selectRef:null,
    menuPosition: ""
}
export default AutosuggestComponent;
