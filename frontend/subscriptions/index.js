import app from './app';
import user from './user';
import ui from './ui';

const subscriptions = [
  app,
  user,
  ui,
];

/**
 * User subscriptions.
 * @param {Function} subscribe The subscribe function.
 * @returns {void}
 */
export default subscribe => subscriptions.forEach(subscription => subscription(subscribe));
