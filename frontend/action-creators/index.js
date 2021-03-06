import * as types from './../constants/ActionTypes';

/**
 * Creates the dispatched FB_LOGIN action object.
 * @return {{type: string}}
 */
export const fbLogin = () => ({
  type: types.FB_LOGIN,
});

/**
 * Creates the dispatched FB_LOGIN_SUCCESS action object.
 * @param {Object} payload payload
 * @return {{type: string, payload: Object}}
 */
export const fbLoginSuccess = payload => ({
  type: types.FB_LOGIN_SUCCESS,
  payload,
});

/**
 * Creates the dispatched FB_LOGIN_FAILED action object.
 * @param {Object} error error
 * @return {{type: string, error: Object}}
 */
export const fbLoginFailed = error => ({
  type: types.FB_LOGIN_FAILED,
  error,
});

/**
 * Creates the dispatched FB_LOGOUT action object.
 * @return {{type: string}}
 */
export const fbLogout = () => ({
  type: types.FB_LOGOUT,
});

/**
 * Creates the dispatched FB_LOGOUT_SUCCESS action object.
 * @return {{type: string}}
 */
export const fbLogoutSuccess = () => ({
  type: types.FB_LOGOUT_SUCCESS,
});

/**
 * Creates the dispatched FB_FETCH_CONFIG action object.
 * @return {{type: string }}
 */
export const fbFetchConfig = () => ({
  type: types.FB_FETCH_CONFIG,
});

/**
 * Creates the dispatched FB_FETCH_CONFIG_SUCCESS action object.
 * @param {Object} config The fetched configuration.
 * @return {Object}
 */
export const fbFetchConfigSuccess = config => ({
  type: types.FB_FETCH_CONFIG_SUCCESS,
  config,
});

/**
 * Creates the dispatched FB_FETCH_CONFIG_FAILED action object.
 * @return {{type: string }}
 */
export const fbFetchConfigFailed = () => ({
  type: types.FB_FETCH_CONFIG_FAILED,
});
