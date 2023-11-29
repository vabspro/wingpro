import React from "react";
import { connect } from "react-redux";
import ContactForm from "../../contact/components/ContactForm";

const Recipient = ({ errors, voucher, updateVoucherRecipient }) => {
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
				<strong>Empfänger</strong>
				<p>Für wen soll dieser Gutschein sein?</p>
			</div>
			<div className="vrb__grid--column">
				<div className="vrb_billing--form">
					<div className="vrb__billing--formfield">
						<input
							type="text"
							placeholder="Max Mustermann"
							value={voucher.recipient}
							className={
								voucher.recipient && voucher.recipient !== "" ? "success" : customClass("recipient")
							}
							onChange={(e) => {
								updateVoucherRecipient(e.target.value);
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

const styles = {
	input: {
		width: "100%",
		fontFamily: "sans-serif",
	},
};

const mapStateToProps = (state) => ({
	voucher: state.VoucherReducer,
	errors: state.ErrorReducer,
});

const mapDispatchToProps = (dispatch) => ({
	updateVoucherRecipient: (value) =>
		dispatch({
			type: "UPDATE_VOUCHER_RECIPIENT",
			payload: value,
		}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipient);
