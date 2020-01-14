const ACTIONS = {
    GET: 'GET_USER',
    GET_SUCCESS: 'GET_USER_SUCCESS',
    GET_FAILURE: 'GET_USER_FAILURE',
  };
  
  //ACTIONS
  const userPending = () => {
    return {
      type: ACTIONS.GET,
    }
  };
  
  const userSuccess = (user) => {
    return{
      type: ACTIONS.GET_SUCCESS,
      user,
    }
  };
  
  const userFailure = (error) => {
    return{
      type: ACTIONS.GET_FAILURE,
      error,
    }
  };
  
  //REDUCER
  const initialState = {
    pending: false,
    error: null,
    user: null,
    success: false,
  };
  
  export function userReducer(state=initialState, action) {
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
          userDetails: action.user,
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
  export const getStatus = state => state.userReducer.pending;
  export const getUserDetails = state => state.userReducer.userDetails;
  export const getError = state => state.userReducer.error;
  export const getSuccess = state => state.userReducer.success;
  
  //SAGA
  export default function fetchUserDetails() {
    return dispatch => {
      dispatch(userPending());
      return fetch(`http://127.0.0.1:8000/api/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
        .then(res => res.json())
        .then(res => {
          if(res.status === 400)
            throw res.message;
  
          dispatch(userSuccess(res));
        })
        .catch(error => {
          dispatch(userFailure(error))
        })
    };
  };
  