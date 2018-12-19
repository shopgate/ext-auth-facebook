import { main$ } from '@shopgate/pwa-common/streams/main';
import { appDidStart$ } from '@shopgate/pwa-common/streams/app';
import login from '@shopgate/pwa-common/actions/user/login';
import { userWillLogout$ } from '@shopgate/pwa-common/streams/user';
import { ERROR_USER } from '@shopgate/pwa-common/constants/ActionTypes';
import { getCurrentRoute } from '@shopgate/pwa-common/helpers/router';
import { fbDidLogin$ } from './../streams/user';
import logout from './../actions/logout';
import facebookLogout from './../actions/facebookLogout';

/**
 * @param {Function} subscribe The subscribe function.
 */
export default (subscribe) => {
  const authExpired$ = appDidStart$.zip(main$.filter(({ action }) => (
    action.type === ERROR_USER && action.error && action.error.code === 'EAUTHFACEBOOK'
  ))).map(([, second]) => second);

  // Auth expired on app start, logout from fb
  subscribe(authExpired$, ({ dispatch }) => {
    dispatch(logout());
  });

  // Subscribe to logout requests
  subscribe(userWillLogout$, ({ dispatch }) => {
    dispatch(facebookLogout());
  });

  // Login user to connect and PWA
  subscribe(fbDidLogin$, ({ dispatch, action }) => {
    const { state: { redirect: { location = '' } = {} } } = getCurrentRoute();
    dispatch(login(action.payload, location, 'facebook'));
  });
};
