import {combineReducers} from "redux";

import {loginReducer} from "../Container/login/saga";
import {signupReducer} from "../Container/signup/saga";
import {orderReducer} from "../Container/order/saga";
import {paymentVerificationReducer} from "../Container/payment_verification/saga";
import {userReducer} from "../Container/profile/saga";
import {editProfileReducer} from "../Container/edit_profile/saga";
import {passwordChangeReducer} from "../Container/change_password/saga";

const rootReducer = combineReducers({
    loginReducer,
    signupReducer,
    orderReducer,
    paymentVerificationReducer,
    userReducer,
    editProfileReducer,
    passwordChangeReducer
});

export default rootReducer;