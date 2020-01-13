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
  export default function fetchPaymentVerification(rfid, response) {
    return dispatch => {
      dispatch(paymentVerificationPending());
      return fetch(`http://127.0.0.1:8000/api/paymentVerification/${rfid}`, {
        method: 'PATCH',
        body: JSON.stringify({...response})
      })
          .then(res => res.json())
          .then(res => {
            if(res.status === 400)
              throw res.message;
  
            dispatch(paymentVerificationSuccess());
          })
          .catch(error => {
            dispatch(paymentVerificationFailure(error))
          })
    };
  };