import cookie from 'js-cookie';
import {DOMAIN_URL, BASE_URL} from "../../constants/api";

const ACTIONS = {
    PATCH: 'ORDER_PATCH',
    PATCH_SUCCESS: 'ORDER_PATCH_SUCCESS',
    PATCH_FAILURE: 'ORDER_PATCH_FAILURE',
  };
  
  //ACTIONS
  const orderPending = () => {
    return {
      type: ACTIONS.PATCH,
    }
  };
  
  const orderSuccess = (order) => {
    return{
      type: ACTIONS.PATCH_SUCCESS,
      order,
    }
  };
  
  const orderFailure = (error) => {
    return{
      type: ACTIONS.PATCH_FAILURE,
      error,
    }
  };
  
  //REDUCER
  const initialState = {
    pending: false,
    error: null,
    order: null,
    success: false,
  };
  
  export function orderReducer(state=initialState, action) {
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
          order: action.order,
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
  export const getStatus = state => state.orderReducer.pending;
  export const getError = state => state.orderReducer.error;
  export const getSucces = state => state.orderReducer.success;
  export const getOrder = state => state.orderReducer.order;
  
  //SAGA
  export default function fetchOrederDetails(rfid) {
    return dispatch => {
      dispatch(orderPending());
      return fetch(`${DOMAIN_URL}${BASE_URL}verify_rfid`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${cookie.get('token')}`,
        },
        body: JSON.stringify({
            'rfid': rfid,
        })
      })
          .then(res => res.json())
          .then(res => {
            if(res.status == 200){
              if(res.payment_verified==="True")
                throw "No due amount remaining."
  
              dispatch(orderSuccess(res));
            }else
              throw res.message; 
          })
          .catch(error => {
            dispatch(orderFailure(error))
          })
    };
  };