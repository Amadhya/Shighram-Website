import {combineReducers} from "redux";

import {loginReducer} from "../Container/login/saga";
import {signupReducer} from "../Container/signup/saga";
import {orderReducer} from "../Container/order/saga";
import {paymentVerificationReducer} from "../Container/payment_verification/saga";
import {userReducer} from "../Container/profile/saga";
import {editProfileReducer} from "../Container/edit_profile/saga";
import {passwordChangeReducer} from "../Container/change_password/saga";
import {forgotPasswordReducer} from "../Container/forgot_password/saga";
import {passwordResetReducer} from "../Container/reset_password/saga";
import {googleLoginReducer} from "../Container/google_login/saga";

const rootReducer = combineReducers({
    loginReducer,
    googleLoginReducer,
    signupReducer,
    orderReducer,
    paymentVerificationReducer,
    userReducer,
    editProfileReducer,
    passwordChangeReducer,
    forgotPasswordReducer,
    passwordResetReducer
});

export default rootReducer;