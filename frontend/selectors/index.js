const statePrefix = '@shopgate/auth-facebook/Reducer';

/**
 * Gets user extension config
 * @param {Object} state The application state.
 * @return {boolean}
 */
export const getDisabled = state => state.extensions[statePrefix].disabled;
