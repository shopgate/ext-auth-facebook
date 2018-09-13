import { appDidStart$ } from '@shopgate/pwa-common/streams/app';
import login  from '@shopgate/pwa-common/actions/user/login';
import { userWillLogout$ } from '@shopgate/pwa-common/streams/user';
import registerEvents from '@shopgate/pwa-core/commands/registerEvents';
import event from '@shopgate/pwa-core/classes/Event';
import {
  fbLoginSuccess,
  fbLoginFailed,
  fbLogoutSuccess,
} from './../action-creators';
import facebookLogout from './../actions/facebookLogout';
import { fbDidLogin$, fbDidLogout$ } from './../streams/user';

/**
 * @param {Function} subscribe The subscribe function.
 */
export default (subscribe) => {
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

    /**
     * {
      "service": "facebook",
      "success": true,
      "token": "EAAMC...uyYZD",
      "tokenExpiryDate": 1542038797,
      "profile": {
        "id": "106275469969855",
        "first_name": "Szymon",
        "last_name": "Tester",
        "email": "szymon_atolgdm_tester@tfbnw.net"
      }
    }
     */
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
