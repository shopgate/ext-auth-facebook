import { main$ } from '@shopgate/pwa-common/streams/main';
import * as types from './../constants/ActionTypes';

/**
 * Get triggered when user will login with FB.
 * @type {Observable}
 */
export const fbWillLogin$ = main$.filter(({ action }) => action.type === types.FB_LOGIN);

/**
 * Get triggered when user did login with FB.
 * @type {Observable}
 */
export const fbDidLogin$ = main$.filter(({ action }) => action.type === types.FB_LOGIN_SUCCESS);

/**
 * Get triggered when user did login with FB.
 * @type {Observable}
 */
export const fbLoginFailed$ = main$.filter(({ action }) => action.type === types.FB_LOGIN_FAILED);
