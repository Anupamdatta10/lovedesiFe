import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import CustomInput from '../Components/CustomInput';

class ChangePassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}


	render() {
		const { show, onHide, className, headerclassName, bodyClassName, headerContent, formData, errorData, handleChange, submit } = this.props;
		const { userEmail, password, newPassword, confirmPassword } = formData
		const { userEmailError, passwordError, newPasswordError, confirmPasswordError } = errorData
		return (
			<>
				{/*backdrop="static" keyboard={false}*/}
				<Modal show={show} onHide={onHide} className={className}>
					<Modal.Header closeButton className={headerclassName}>
						<Modal.Title>{headerContent}</Modal.Title>
					</Modal.Header>
					<Modal.Body className={bodyClassName}>
						<div className="change_password_inner">
							<div className="change_password_row email_disable_field">
								<CustomInput
									parentClassName="comment_input_field"
									//labelName="Write your comment here"
									errorLabel={userEmailError}
									name="userEmail"
									type="text"
									value={userEmail}
									//labelPresent={true}
									onChange={handleChange}
									readOnly={true}
								/>
							</div>
							<div className="change_password_row">
								<CustomInput
									parentClassName="comment_input_field"
									//labelName="Write your comment here"
									errorLabel={passwordError}
									name="password"
									type="password"
									value={password}
									//labelPresent={true}
									onChange={handleChange}
									placeholder="Enter Current Password"
								//readOnly={true}
								/>
							</div>
							<div className="change_password_row">
								<div className="input-field-full-box">
									<CustomInput
										parentClassName="comment_input_field"
										//labelName="Write your comment here"
										errorLabel={newPasswordError}
										name="newPassword"
										type="password"
										value={newPassword}
										//labelPresent={true}
										onChange={handleChange}
										placeholder="Enter New Password"
									//readOnly={true}
									/>
								</div>
							</div>
							<div className="change_password_row">
								<div className="input-field-full-box">
									<CustomInput
										parentClassName="comment_input_field"
										//labelName="Write your comment here"
										errorLabel={confirmPasswordError}
										name="confirmPassword"
										type="password"
										value={confirmPassword}
										//labelPresent={true}
										onChange={handleChange}
										placeholder="Re-Enter Password"
									//readOnly={true}
									/>
								</div>
							</div>
							<div className="change_password_row" style={{ textAlign: 'center', paddingBottom: 5 }}>
								<button onClick={submit} className="change_pass_submit">Submit</button>
							</div>
						</div>
					</Modal.Body>
				</Modal>
			</>
		);
	}
}

ChangePassword.defaultProps = {
	className: "change_password_modal",
	headerclassName: "close_btn_icon",
	buttonClassName: "btn btn-primary",
	headerContent: "Change Password",
	BodyContent: "",
	buttonContent: "",
	bodyClassName: ""
}

export default ChangePassword;