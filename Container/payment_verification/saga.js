import cookie from 'js-cookie';
import {DOMAIN_URL, BASE_URL} from "../../constants/api";

const ACTIONS = {
    PATCH: 'PAYMENT_VERIFICATION_PATCH',
    PATCH_SUCCESS: 'PAYMENT_VERIFICATION_PATCH_SUCCESS',
    PATCH_FAILURE: 'PAYMENT_VERIFICATION_PATCH_FAILURE',
  };
  
  //ACTIONS
  const paymentVerificationPending = () => {
    return {
      type: ACTIONS.PATCH,
    }
  };
  
  const paymentVerificationSuccess = () => {
    return{
      type: ACTIONS.PATCH_SUCCESS,
    }
  };
  
  const paymentVerificationFailure = (error) => {
    return{
      type: ACTIONS.PATCH_FAILURE,
      error,
    }
  };
  
  //REDUCER
  const initialState = {
    pending: false,
    error: null,
    success: false,
  };
  
  export function paymentVerificationReducer(state=initialState, action) {
    switch (action.type) {
      case ACTIONS.PATCH:
        return {
          ...state,
          pending: true,
        };
      case ACTIONS.PATCH_SUCCESS:
        return {
          ...state,
          error: null,
          pending: false,
          success: true,
        };
      case ACTIONS.PATCH_FAILURE:
        return {
          ...state,
          error: action.error,
        };
      default:
        return state;
    }
  }
  
  //SELECTORS
  export const getStatus = state => state.paymentVerificationReducer.pending;
  export const getError = state => state.paymentVerificationReducer.error;
  export const getSucces = state => state.paymentVerificationReducer.success;
  
  //SAGA
  export default function fetchPaymentVerification(response) {
    return dispatch => {
      dispatch(paymentVerificationPending());
      return fetch(`${DOMAIN_URL}${BASE_URL}paymentVerification`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${cookie.get('token')}`,
        },
        body: JSON.stringify({...response})
      })
          .then(res => res.json())
          .then(res => {
            if(res.status == 200){
              dispatch(paymentVerificationSuccess());
            }else
              throw res.message;
          })
          .catch(error => {
            dispatch(paymentVerificationFailure(error))
          })
    };
  };