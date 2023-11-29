import { combineReducers } from "redux";

import CourseReducer from "./CourseReducer";
import SelectedCourseReducer from "./SelectedCourseReducer";
import ContactReducer from "./ContactReducer";
import ParticipantReducer from "./ParticipantReducer";
import ErrorReducer from "./ErrorReducer";
import VoucherReducer from "./VoucherReducer";

const CombinedReducer = combineReducers({
	CourseReducer,
	SelectedCourseReducer,
	ContactReducer,
	ParticipantReducer,
	VoucherReducer,
	ErrorReducer,
});

export default CombinedReducer;
