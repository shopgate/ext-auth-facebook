import AppCommand from '@shopgate/pwa-core/classes/AppCommand';
import { fbLogout } from './../action-creators';

/**
 * @return {function} A redux thunk.
 */
const facebookLogout = () => (dispatch) => {
  dispatch(fbLogout());

  const command = new AppCommand();
  command
    .setCommandName('facebookLogOut')
    .setLibVersion('15.0')
    .dispatch();
};

export default facebookLogout;
