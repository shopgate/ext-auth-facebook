import AppCommand from '@shopgate/pwa-core//classes/AppCommand';
import { fbLogin } from './../action-creators';

/**
 * @return {function} A redux thunk.
 */
const facebookLogin = () => (dispatch) => {
  dispatch(fbLogin());

  const command = new AppCommand();
  command
    .setCommandName('facebookLogIn')
    .setLibVersion('15.0')
    .dispatch({
      broadcastProfile: true,
    });
};

export default facebookLogin;
