import cookie from 'js-cookie';
import {DOMAIN_URL, BASE_URL} from "../../constants/api";

const ACTIONS = {
  POST: 'PAY_POST',
  POST_SUCCESS: 'PAY_POST_SUCCESS',
  POST_FAILURE: 'PAY_POST_FAILURE',
};

//ACTIONS
const payPending = () => {
  return {
    type: ACTIONS.POST,
  }
};

const paySuccess = () => {
  return{
    type: ACTIONS.POST_SUCCESS,
  }
};

const payFailure = (error) => {
  return{
    type: ACTIONS.POST_FAILURE,
    error,
  }
};

//REDUCER
const initialState = {
  pending: false,
  error: null,
  success: false,
};

export function payReducer(state=initialState, action) {
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
export const getStatus = state => state.payReducer.pending;
export const getError = state => state.payReducer.error;
export const getSucces = state => state.payReducer.success;

//SAGA
export default function fetchPayDetails(data) {
  return dispatch => {
    dispatch(payPending());
    return fetch(`${DOMAIN_URL}${BASE_URL}payment`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${cookie.get('token')}`,
      },
      body: JSON.stringify({...data})
    })
        .then(res => res.json())
        .then(res => {
          if(res.status == 200){
            dispatch(paySuccess());
          }else
            throw res.message;
        })
        .catch(error => {
          dispatch(payFailure(error))
        })
  };
};