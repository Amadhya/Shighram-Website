import {DOMAIN_URL, BASE_URL} from "../../constants/api";

const ACTIONS = {
    POST: 'FORGOT_PASSWORD_POST',
    POST_SUCCESS: 'FORGOT_PASSWORD_POST_SUCCESS',
    POST_FAILURE: 'FORGOT_PASSWORD_POST_FAILURE',
  };
  
  //ACTIONS
  const forgotPasswordPending = () => {
    return {
      type: ACTIONS.POST,
    }
  };
  
  const forgotPasswordSuccess = (verified, message) => {
    return{
      type: ACTIONS.POST_SUCCESS,
      verified,
      message,
    }
  };
  
  const forgotPasswordFailure = (error) => {
    return{
      type: ACTIONS.POST_FAILURE,
      error,
    }
  };
  
  //REDUCER
  const initialState = {
    pending: false,
    error: null,
    message: '',
    verified: null,
    success: false,
  };
  
  export function forgotPasswordReducer(state=initialState, action) {
    switch (action.type) {
      case ACTIONS.POST:
        return {
          ...state,
          pending: true,
        };
      case ACTIONS.POST_SUCCESS:
        return {
          ...state,
          error: null,
          pending: false,
          success: true,
          verified: action.verified,
          message: action.message,
        };
      case ACTIONS.POST_FAILURE:
        return {
          ...state,
          error: action.error,
        };
      default:
        return state;
    }
  }
  
  //SELECTORS
  export const getStatus = state => state.forgotPasswordReducer.pending;
  export const getError = state => state.forgotPasswordReducer.error;
  export const getSuccess = state => state.forgotPasswordReducer.success;
  export const getMessage = state => state.forgotPasswordReducer.message;
  export const getEmailVerification = state => state.forgotPasswordReducer.verified;
  
  //SAGA
  export default function fetchForgotPasswordDetails(email) {
    return dispatch => {
      dispatch(forgotPasswordPending());
      return fetch(`${DOMAIN_URL}${BASE_URL}password_reset_request`, {
        method: 'POST',
        body: JSON.stringify({'email': email})
      })
          .then(res => res.json())
          .then(res => {
            if(res.status === '400')
              throw res.message;
            
            dispatch(forgotPasswordSuccess(res.verified,res.message));
          })
          .catch(error => {
            dispatch(forgotPasswordFailure(error))
          })
    };
  };