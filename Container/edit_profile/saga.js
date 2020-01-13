const ACTIONS = {
    PATCH: 'PROFILE_PATCH',
    PATCH_SUCCESS: 'PROFILE_PATCH_SUCCESS',
    PATCH_FAILURE: 'PROFILE_PATCH_FAILURE',
  };
  
  //ACTIONS
  const editProfilePending = () => {
    return {
      type: ACTIONS.PATCH,
    }
  };
  
  const editProfileSuccess = (order) => {
    return{
      type: ACTIONS.PATCH_SUCCESS,
    }
  };
  
  const editProfileFailure = (error) => {
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
  
  export function editProfileReducer(state=initialState, action) {
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
          pending: false,
          error: action.error,
        };
      default:
        return state;
    }
  }
  
  //SELECTORS
  export const getStatus = state => state.editProfileReducer.pending;
  export const getError = state => state.editProfileReducer.error;
  export const getSuccess = state => state.editProfileReducer.success;
  
  //SAGA
  export default function fetchProfileEdit(form) {
    console.log(form, '()()()()()()');
    return dispatch => {
      dispatch(editProfilePending());
      return fetch(`http://127.0.0.1:8000/api/edit_profile/${localStorage.getItem('user_id')}`, {
        method: 'PATCH',
        headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({...form})
      })
          .then(res => res.json())
          .then(res => {
            if(res.status === 400)
              throw res.message;
            
            if(res.token)
              localStorage.setItem('token', res.token); 
               
            dispatch(editProfileSuccess());
          })
          .catch(error => {
            dispatch(editProfileFailure(error))
          })
    };
  };