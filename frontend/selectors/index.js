const statePrefix = '@shopgate/auth-facebook/Reducer';

/**
 * Gets disabled property of fb button
 * @param {Object} state The application state.
 * @return {boolean}
 */
export const getDisabled = state => state.extensions[statePrefix].disabled;

/**
 * Gets visibility of fb button
 * @param {Object} state The application state.
 * @return {boolean}
 */
export const getVisible = state => state.extensions[statePrefix].visible;

/**
 * Returns if facebook login is activated.
 * @param {Object} state The application state.
 * @return {boolean}
 */
export const isActivated = state => state.extensions[statePrefix].config.enabled;

/**
 * Gets pathName of fb button
 * @param {Object} state The application state.
 * @return {string}
 */
export const getPathName = state => state.extensions[statePrefix].pathName;
