import React from "react";
import { connect } from "react-redux";

const Billing = ({
	contact,
	errors,
	updateContactFirstName,
	updateContactLastName,
	updateContactStreet,
	updateContactStreetNumber,
	updateContactZipCode,
	updateContactCity,
	updateErrorMessages,
}) => {
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
				<strong>Rechnungsadresse</strong>
				<p>An wen dürfen wir die Rechnung senden?</p>
			</div>
			<div className="vrb__grid--column">
				<div className="vrb__billing">
					<div className="vrb__billing--form">
						<div className="vrb__billing--formgroup">
							<div className="vrb__billing--formfield">
								<label>
									Vorname <span style={{ position: "relative", top: -4, color: "firebrick" }}>*</span>
								</label>
								<input
									type="text"
									value={contact.first_name}
									className={contact.first_name !== "" ? "success" : customClass("first_name")}
									onChange={(e) => {
										updateContactFirstName(e.target.value);
										if (contact.first_name !== "") {
											const newState = {
												...errors,
											};
											newState["first_name"] = false;
											updateErrorMessages(newState);
										}
									}}
								/>
							</div>
							<div className="vrb__billing--formfield">
								<label>
									Nachname{" "}
									<span style={{ position: "relative", top: -4, color: "firebrick" }}>*</span>
								</label>
								<input
									type="text"
									value={contact.last_name}
									className={contact.last_name !== "" ? "success" : customClass("last_name")}
									onChange={(e) => {
										updateContactLastName(e.target.value);
										if (contact.last_name !== "") {
											const newState = {
												...errors,
											};
											newState["last_name"] = false;
											updateErrorMessages(newState);
										}
									}}
								/>
							</div>
						</div>
						<div
							className="vrb__billing--formgroup"
							style={{ gridTemplateColumns: "70% calc(30% - 0.8rem)" }}
						>
							<div className="vrb__billing--formfield">
								<label>
									Strasse <span style={{ position: "relative", top: -4, color: "firebrick" }}>*</span>
								</label>
								<input
									type="text"
									value={contact.street}
									className={
										contact.street && contact.street !== "" ? "success" : customClass("street")
									}
									onChange={(e) => {
										updateContactStreet(e.target.value);
										if (contact.last_name !== "") {
											const newState = {
												...errors,
											};
											newState["last_name"] = false;
											updateErrorMessages(newState);
										}
									}}
								/>
							</div>
							<div className="vrb__billing--formfield">
								<label>
									Nummer <span style={{ position: "relative", top: -4, color: "firebrick" }}>*</span>
								</label>
								<input
									type="text"
									value={contact.street_number}
									className={
										contact.street_number && contact.street_number !== ""
											? "success"
											: customClass("street_number")
									}
									onChange={(e) => {
										updateContactStreetNumber(e.target.value);
										if (contact.street_number !== "") {
											const newState = {
												...errors,
											};
											newState["street_number"] = false;
											updateErrorMessages(newState);
										}
									}}
								/>
							</div>
						</div>
						<div
							className="vrb__billing--formgroup"
							style={{ gridTemplateColumns: "calc(40% - 0.8rem) 60%" }}
						>
							<div className="vrb__billing--formfield">
								<label>
									Postleitzahl{" "}
									<span style={{ position: "relative", top: -4, color: "firebrick" }}>*</span>
								</label>
								<input
									type="text"
									value={contact.zip_code}
									className={
										contact.zip_code && contact.zip_code !== ""
											? "success"
											: customClass("zip_code")
									}
									onChange={(e) => {
										updateContactZipCode(e.target.value);
										if (contact.zip_code !== "") {
											const newState = {
												...errors,
											};
											newState["zip_code"] = false;
											updateErrorMessages(newState);
										}
									}}
								/>
							</div>
							<div className="vrb__billing--formfield">
								<label>
									Ort <span style={{ position: "relative", top: -4, color: "firebrick" }}>*</span>
								</label>
								<input
									type="text"
									value={contact.city}
									className={contact.city && contact.city !== "" ? "success" : customClass("city")}
									onChange={(e) => {
										updateContactCity(e.target.value);
										if (contact.city !== "") {
											const newState = {
												...errors,
											};
											newState["city"] = false;
											updateErrorMessages(newState);
										}
									}}
								/>
							</div>
						</div>
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
	updateContactFirstName: (firstName) =>
		dispatch({
			type: "UPDATE_CONTACT_FIRST_NAME",
			payload: firstName,
		}),
	updateContactLastName: (lastName) =>
		dispatch({
			type: "UPDATE_CONTACT_LAST_NAME",
			payload: lastName,
		}),
	updateContactStreet: (street) =>
		dispatch({
			type: "UPDATE_CONTACT_STREET",
			payload: street,
		}),
	updateContactStreetNumber: (number) =>
		dispatch({
			type: "UPDATE_CONTACT_STREET_NUMBER",
			payload: number,
		}),
	updateContactZipCode: (zipCode) =>
		dispatch({
			type: "UPDATE_CONTACT_ZIP_CODE",
			payload: zipCode,
		}),
	updateContactCity: (city) =>
		dispatch({
			type: "UPDATE_CONTACT_CITY",
			payload: city,
		}),
	updateErrorMessages: (errors) =>
		dispatch({
			type: "UPDATE_ERROR_MESSAGES",
			payload: errors,
		}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Billing);
