import React, { useEffect, useRef, useState } from "react";
import Success from "../booking/components/Success";
import Billing from "./components/Billing";
import Contact from "./components/Contact";
import Recipient from "./components/Recipient";
import Submit from "./components/Submit";
import Theme from "./components/Theme";
import Value from "./components/Value";
import Spinner from "./components/Spinner";

const VoucherForm = (props) => {
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false)
	return (
		<div className="vrb__wrapper">
			{success ? (
				<Success type="voucher" />
			) : (
				<>
					{loading ? <Spinner /> : null}
					<Recipient />
					<Value />
					<Theme />
					<Billing />
					<Contact />
					<Submit {...props} onSuccess={() => {setSuccess(true); setLoading(false)}} onSubmit={(state) => setLoading(state)}/>
				</>
			)}
		</div>
	);
};

export default VoucherForm;
