import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { SHOPGATE_USER_LOGOUT_USER } from '@shopgate/pwa-common/constants/Pipelines';
import { ERROR_HANDLE_SUPPRESS } from '@shopgate/pwa-core/constants/ErrorHandleTypes';
import { toggleLoggedIn } from '@shopgate/pwa-common/action-creators/user';
import { logger } from '@shopgate/pwa-core/helpers';
import facebookLogout from './../actions/facebookLogout';

/**
 * Logout the user silently because auth is expired
 * @returns {PipelineRequest}
 */
export default () => (dispatch) => {
  dispatch(facebookLogout());

  dispatch(toggleLoggedIn(false));

  new PipelineRequest(SHOPGATE_USER_LOGOUT_USER)
    .setTrusted()
    .setHandleErrors(ERROR_HANDLE_SUPPRESS)
    .dispatch()
    .then(() => logger.info('User is logged out'))
    .catch(error => logger.warn('User logged out error', error));
};
