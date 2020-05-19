import cookie from 'js-cookie';
import {DOMAIN_URL, BASE_URL} from "../../constants/api";

const ACTIONS = {
    GET: 'GET_PAYMENT_HISTORY',
    GET_SUCCESS: 'GET_PAYMENT_HISTORY_SUCCESS',
    GET_FAILURE: 'GET_PAYMENT_HISTORY_FAILURE',
  };
  
  //ACTIONS
  const paymentHistoryPending = () => {
    return {
      type: ACTIONS.GET,
    }
  };
  
  const paymentHistorySuccess = (history) => {
    return{
      type: ACTIONS.GET_SUCCESS,
      history,
    }
  };
  
  const paymentHistoryFailure = (error) => {
    return{
      type: ACTIONS.GET_FAILURE,
      error,
    }
  };
  
  //REDUCER
  const initialState = {
    pending: false,
    error: null,
    history: null,
    success: false,
  };
  
  export function paymentHistoryReducer(state=initialState, action) {
    switch (action.type) {
      case ACTIONS.GET:
        return {
          ...state,
          pending: true,
        };
      case ACTIONS.GET_SUCCESS:
        return {
          ...state,
          error: null,
          pending: false,
          success: true,
          history: action.history,
        };
      case ACTIONS.GET_FAILURE:
        return {
          ...state,
          error: action.error,
        };
      default:
        return state;
    }
  }
  
  //SELECTORS
  export const getStatus = state => state.paymentHistoryReducer.pending;
  export const getPaymentHistory = state => state.paymentHistoryReducer.history;
  export const getError = state => state.paymentHistoryReducer.error;
  export const getSuccess = state => state.paymentHistoryReducer.success;
  
  //SAGA
  export default function fetchPaymentHistoryDetails() {
    return dispatch => {
      dispatch(paymentHistoryPending());
      return fetch(`${DOMAIN_URL}${BASE_URL}payment_history`, {
        headers: {
          Authorization: `Bearer ${cookie.get('token')}`,
        }
      })
        .then(res => res.json())
        .then(res => {
          if(res.status == 400){
            throw res.message; 
          }

          dispatch(paymentHistorySuccess(res.history));
        })
        .catch(error => {
          dispatch(paymentHistoryFailure(error))
        })
    };
  };
  