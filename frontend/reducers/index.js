import { ERROR_LOGIN, SUCCESS_LOGIN } from '@shopgate/pwa-common/constants/ActionTypes';
import {
  FB_LOGIN,
  FB_LOGOUT_SUCCESS,
  FB_LOGIN_FAILED,
  FB_TOGGLE,
} from './../constants/ActionTypes';

const initialState = {
  visible: false,
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

    case FB_TOGGLE:
      return {
        ...state,
        visible: action.visible,
      };

    case ERROR_LOGIN:
    case FB_LOGIN_FAILED:
      return {
        ...state,
        disabled: false,
      };

    case SUCCESS_LOGIN:
      return {
        ...state,
        visible: false,
      };

    case FB_LOGOUT_SUCCESS:
      return initialState;

    default:
      return state;
  }
};
