import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class CommonLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }




    render() {
        //console.log("this.props.email----",this.props.email)
        //console.log("-----this.props.password-----",this.props.password)
        const { pageBackground, appContainerInner, loginBoxInner, logoBoxInner, companyLogo, titleLabel, webTitle, loginFormDiv, rememberForgotInner, rememberTitle, forgotTitle, submitTitle, checkboxContainer, checkmark, loginBtn, checkboxType, buttonType, parentClassName, checkboxName, checkboxValue, passInputClass, passLockIcon, passEyeIcon, errorClass, passPlaceholder, passName, lockClass, eyeClass, eyeSlash } = this.props;
        return (

            <div className={pageBackground}>
                <div className={appContainerInner}>
                    <div className={loginBoxInner}>
                        <div className={logoBoxInner}>
                            <div className="titleposition">
                                {/* <h2 className="titleone">LoveDesi</h2> */}
                               <img src={require('../../Utility/Public/images/logoNew.jpg')} className="logoInner" />
                                {/* <h3 className="titletwo">Dashboard</h3> */}
                            </div>
                        </div>
                        <form className={loginFormDiv}>
                            <div className={parentClassName}>
                                <input type="text" onChange={this.props.handleChange} name="email" value={this.props.email} placeholder={this.props.user_name} className={passInputClass} id="login_useremail" onFocus={this.props.handleonFocus} onBlur={this.props.handleonBlur} onKeyDown={this.props.handleKeyPress} />
                                <div className={errorClass}>{this.props.emailError}</div>
                            </div>
                            <div className={parentClassName}>
                                <input type="password" onChange={this.props.handleChange} name={passName} value={this.props.password} placeholder={passPlaceholder} className={passInputClass} id='login_userpassword' onFocus={this.props.handleonFocus} onBlur={this.props.handleonBlur} onKeyDown={this.props.handleKeyPress} />

                                {/* <span className={passLockIcon}><i className={lockClass} aria-hidden="true"></i></span>

                                {!this.props.passwordLock?
                                <span className={passEyeIcon} onClick={this.props.showText}><i className={eyeSlash} aria-hidden="true"></i></span>
                                :
                                <span className={passEyeIcon} onClick={this.props.showPassword}><i className={eyeClass} aria-hidden="true"></i></span>
                                }*/}

                                <div className={errorClass}>{this.props.passwordError}</div>
                            </div>
                            <div className="loginFormInnerDiv logbtndiv">
                                <Button type={buttonType} id="login-signin" onClick={this.props.login} className={loginBtn}>{submitTitle}</Button>
                            </div>
                        </form>

                        <div className={rememberForgotInner}>
                            <p onClick={this.props.forgotPassword}><span>{forgotTitle}</span></p>
                        </div>
                        {/* <div className="loglan langdropdown">

                            <Dropdown onSelect={this.props.lanOnSelect.bind(this)}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                                    {localStorage.getItem('i18nextLng').toUpperCase()}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="en">EN</Dropdown.Item>
                                    <Dropdown.Item eventKey="fr">FR</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </div> */}


                    </div>
                </div>
            </div>

        )
    }
}


CommonLogin.defaultProps = {
    email: "",
    password: "",
    pageBackground: 'loginBackground',
    appContainerInner: 'appContainerInner',
    loginBoxInner: 'login_box_inner',
    logoBoxInner: 'logo-box-inner',
    companyLogo: 'logo-box-top-logo',
    titleLabel: 'loginTitle',
    loginFormDiv: 'loginFormDiv',
    rememberForgotInner: 'loginFormInnerDiv forgot_password_property',
    checkboxContainer: 'custom_checkbox_container',
    checkmark: 'checkmarkCheckbox',
    loginBtn: 'login-btn',
    parentClassName: 'loginFormInnerDiv',
    passInputClass: 'input__fields_property',
    passLockIcon: 'passwordLockIcon',
    passEyeIcon: 'passwordEyeIcon',
    errorClass: 'col-md-12 errorClass error_div',
    passName: 'password',
    lockClass: 'fa fa-lock',
    eyeSlash: 'fa fa-eye-slash',
    eyeClass: 'fa fa-eye',

    checkboxType: 'checkbox',
    checkboxName: 'remember_me',
    checkboxValue: '',
    buttonType: 'button',

    passPlaceholder: 'Mot de passe',
    webTitle: 'HR Management System',
    rememberTitle: 'Remember Me',
    forgotTitle: 'Mot de passe oublié?',
    submitTitle: 'Se connecter'
}
export default CommonLogin;
