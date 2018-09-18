import { appDidStart$ } from '@shopgate/pwa-common/streams/app';
import login from '@shopgate/pwa-common/actions/user/login';
import { userWillLogout$ } from '@shopgate/pwa-common/streams/user';
import registerEvents from '@shopgate/pwa-core/commands/registerEvents';
import event from '@shopgate/pwa-core/classes/Event';
import { TOGGLE_LOGGED_IN } from '@shopgate/pwa-common/constants/ActionTypes';
import { fbLoginSuccess, fbLoginFailed, fbLogoutSuccess } from './../action-creators';
import facebookLogout from './../actions/facebookLogout';
import { fbDidLogin$ } from './../streams/user';

/**
 * @param {Function} subscribe The subscribe function.
 */
export default (subscribe) => {
  const authExpired$ = appDidStart$.zip(main$.filter(action => (
    action.type === TOGGLE_LOGGED_IN && action.value === false
  )));

  subscribe(appDidStart$, ({ dispatch }) => {
    registerEvents([
      'facebookDidLogIn',
      'facebookDidLogOut',
    ]);

    event.addCallback('facebookDidLogIn', (payload) => {
      if (payload.success) {
        dispatch(fbLoginSuccess(payload));
      } else {
        dispatch(fbLoginFailed(payload));
      }
    });

    event.addCallback('facebookDidLogOut', () => {
      dispatch(fbLogoutSuccess());
    });
  });

  // Auth expired on app start, logout from fb
  subscribe(authExpired$, ({ dispatch }) => {
    dispatch(facebookLogout());
  });

  // Subscribe to logout requests
  subscribe(userWillLogout$, ({ dispatch }) => {
    dispatch(facebookLogout());
  });

  // Login user to connect and PWA
  subscribe(fbDidLogin$, ({ dispatch, action }) => {
    dispatch(login(action.payload, 'facebook'));
  });
};
