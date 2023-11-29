const initialState = {
	theme: null,
	value: null,
	recipient: "",
};

const VoucherReducer = (state = initialState, action) => {
	switch (action.type) {
		case "UPDATE_VOUCHER_RECIPIENT":
			return {
				...state,
				recipient: action.payload,
			};
		case "UPDATE_VOUCHER_VALUE":
			return {
				...state,
				value: action.payload,
			};
		case "UPDATE_VOUCHER_THEME":
			return {
				...state,
				theme: action.payload,
			};
		default:
			return state;
	}
};

export default VoucherReducer;
