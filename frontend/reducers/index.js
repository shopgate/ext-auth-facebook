import {
  FB_LOGIN,
  FB_LOGOUT_SUCCESS,
  FB_LOGIN_FAILED,
} from './../constants/ActionTypes';

const initialState = {
  disabled: false,
};

/**
 * Stores the facebook busy state
 * @param {Object} state The current fb state
 * @param {Object} action The action object
 * @return {Object} The new state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case FB_LOGIN:
      return {
        ...state,
        disabled: true,
      };

    case FB_LOGIN_FAILED:
      return {
        ...state,
        disabled: false,
      };

    case FB_LOGOUT_SUCCESS:
      return initialState;

    default:
      return state;
  }
};
