import { appDidStart$ } from '@shopgate/pwa-common/streams/app';
import registerEvents from '@shopgate/pwa-core/commands/registerEvents';
import event from '@shopgate/pwa-core/classes/Event';
import pipelineManager from '@shopgate/pwa-core/classes/PipelineManager';
import { fbLoginSuccess, fbLoginFailed, fbLogoutSuccess } from './../action-creators';
import fetchConfig from '../actions/fetchConfig';

/**
 * @param {Function} subscribe The subscribe function.
 */
export default (subscribe) => {
  subscribe(appDidStart$, ({ dispatch }) => {

    // Fetch config during app start.
    dispatch(fetchConfig())

    // Handle callbacks/events from app for facebook login.
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

    // Suppress error do not notify a user
    pipelineManager.addSuppressedErrors([
      'EAUTHFACEBOOK',
    ]);
  });
};
