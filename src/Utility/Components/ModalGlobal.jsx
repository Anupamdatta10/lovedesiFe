import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import CustomButton from './CustomButton';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
class ModalGlobal extends Component {
    render() {
        const { show, onHide, className, headerclassName, bodyClassName, title, footer, footerClassName, saveButtonClassName, saveButtonLabel, cancelButtonClassName, cancelButtonLabel, onSave, onCancel, body, closeButton, cancelShow, saveShow, footerContent, headerShow, backdrop, keyboard, zoominButton, zoomoutButton, zoominButtonClass, zoomoutButtonClass, zoomin, zoomout, minimizeModal, maximizeModal, liveChat } = this.props;
        return (
            <>
                <Modal show={show} onHide={onHide} className={className} backdrop={backdrop} keyboard={keyboard}>
                    {headerShow ? <Modal.Header className={headerclassName} closeButton={closeButton}>
                        {title ? <Modal.Title>{title}</Modal.Title> : null}
                        
                        {liveChat ?
                        <>
                        <div className='liveChatBox'>
                            <h4>live chat</h4>
                            <div className="switch_btn_customize">
                                <BootstrapSwitchButton
                                    checked={false}
                                    onChange={null}
                                />
                            </div>
                        </div>
                        </>
                        :null}
                        
                        
                        
                        {minimizeModal ?
                            <>
                                {zoominButton ? <button className={zoominButtonClass} onClick={zoomin}><img src={require('../Public/images/zoom-in.png')} /></button> : null}
                                {zoomoutButton ? <button className={zoomoutButtonClass} onClick={zoomout}><img src={require('../Public/images/zoom-out.png')} /></button> : null}
                            </> : null}
                        {maximizeModal ?
                            <>
                                {zoominButton ? <button className={zoominButtonClass} onClick={zoomin}><img src={require('../Public/images/zoom-out.png')} /></button> : null}
                                {zoomoutButton ? <button className={zoomoutButtonClass} onClick={zoomout}><img src={require('../Public/images/zoom-in.png')} /></button> : null}
                            </> : null}
                    </Modal.Header> : null}
                    <Modal.Body className={bodyClassName}>
                        {body}
                    </Modal.Body>
                    {footer ? <Modal.Footer className={footerClassName}>
                        <>
                            {footerContent}
                            {saveShow ? <CustomButton
                                onClick={onSave}
                                className={saveButtonClassName}
                                children={saveButtonLabel}
                            />
                                // <button type="button" onClick={onSave} className={saveButtonClassName}>{saveButtonLabel}</button> 
                                : null}
                            {cancelShow ? <CustomButton
                                onClick={onCancel}
                                className={cancelButtonClassName}
                                children={cancelButtonLabel}
                            />
                                // <button type="button" onClick={onCancel} className={cancelButtonClassName}>{cancelButtonLabel}</button> 
                                : null}
                        </>
                    </Modal.Footer> : null}
                </Modal>
            </>
        );
    }
}
ModalGlobal.defaultProps = {
    className: "modalcustomize secondtypemodal samecontentbox",
    headerclassName: "close_btn_icon",
    buttonClassName: "btn btn-primary",
    BodyContent: "",
    buttonContent: "",
    bodyClassName: "",
    title: "",
    body: "",
    footerClassName: "",
    footer: true,
    footerContent: "",
    closeButton: false,
    saveButtonLabel: "Save",
    saveButtonClassName: "savebtn",
    cancelButtonLabel: "Cancel",
    cancelButtonClassName: "cancelbtn",
    cancelShow: true,
    saveShow: true,
    headerShow: true,
    backdrop: 'static', //false
    keyboard: false,
    zoominButton: false,
    zoomoutButton: false,
    zoominButtonClass: "zoominButton",
    zoomoutButtonClass: "zoomoutButton",
    minimizeModal: true,
    maximizeModal: false,
    liveChat:false

}
const mapStateToProps = (globalState) => {
    return {

    };
}

export default withRouter(connect(mapStateToProps, {})
    (withTranslation()(ModalGlobal)));