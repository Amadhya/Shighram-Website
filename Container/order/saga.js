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
      return fetch(`http://127.0.0.1:8000/api/paymentOrder/${rfid}`, {
        method: 'PATCH',
        body: JSON.stringify({
            'user_id': localStorage.getItem('user_id'),
        })
      })
          .then(res => res.json())
          .then(res => {
            if(res.status === 400)
              throw res.message;
  
            dispatch(orderSuccess(res.order));
          })
          .catch(error => {
            dispatch(orderFailure(error))
          })
    };
  };