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

/**
 * Get triggered when user will logout FB.
 * @type {Observable}
 */
export const fbWillLogout$ = main$.filter(({ action }) => action.type === types.FB_LOGOUT);

/**
 * Get triggered when user did logout FB.
 * @type {Observable}
 */
export const fbDidLogout$ = main$.filter(({ action }) => action.type === types.FB_LOGOUT_SUCCESS);

/**
 * Get triggered when interact with fb started
 * @type {Observable}
 */
export const startFb$ = fbWillLogin$.merge(fbWillLogout$);

/**
 * Get triggered when interact with fb finished
 * @type {Observable}
 */
export const finishFb$ = fbDidLogin$.merge(fbLoginFailed$, fbDidLogout$);
