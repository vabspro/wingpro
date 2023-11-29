import React from "react";
import { connect } from "react-redux";

const Contact = ({ contact, updateContactEmail, updateContactMobile, errors }) => {
	const customClass = (input) => {
		if (errors && errors[input]) {
			return "error";
		} else {
			return "";
		}
	};

	return (
		<div className="vrb__grid">
			<div className="vrb__grid--column">
				<strong>Erreichbarkeit</strong>
				<p>Wie können wir dich erreichen?</p>
			</div>
			<div className="vrb__grid--column">
				<div className="vrb__billing--form">
					<div className="vrb__billing--formfield">
						<label>
							Emailadresse <span style={{ position: "relative", top: -4, color: "firebrick" }}>*</span>
						</label>
						<input
							type="text"
							value={contact.email}
							className={contact.email && contact.email !== "" ? "success" : customClass("email")}
							onChange={(e) => {
								updateContactEmail(e.target.value);
								if (contact.email !== "") {
									const newState = {
										...errors,
									};
									newState["email"] = false;
									updateErrorMessages(newState);
								}
							}}
						/>
					</div>
					<div className="vrb__billing--formfield">
						<label>
							Telefonnummer <span style={{ position: "relative", top: -4, color: "firebrick" }}>*</span>
						</label>
						<input
							type="text"
							value={contact.mobile}
							className={contact.mobile && contact.mobile !== "" ? "success" : customClass("mobile")}
							onChange={(e) => {
								updateContactMobile(e.target.value);
								if (contact.mobile !== "") {
									const newState = {
										...errors,
									};
									newState["mobile"] = false;
									updateErrorMessages(newState);
								}
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	contact: state.ContactReducer,
	errors: state.ErrorReducer,
});

const mapDispatchToProps = (dispatch) => ({
	updateContactEmail: (email) =>
		dispatch({
			type: "UPDATE_CONTACT_EMAIL",
			payload: email,
		}),
	updateContactMobile: (mobile) =>
		dispatch({
			type: "UPDATE_CONTACT_MOBILE",
			payload: mobile,
		}),
	updateErrorMessages: (errors) =>
		dispatch({
			type: "UPDATE_ERROR_MESSAGES",
			payload: errors,
		}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
