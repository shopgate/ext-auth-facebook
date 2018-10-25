import { routeDidEnter, routeDidLeave } from '@shopgate/pwa-common/streams/history';
import setViewLoading from '@shopgate/pwa-common/actions/view/setViewLoading';
import unsetViewLoading from '@shopgate/pwa-common/actions/view/unsetViewLoading';
import { disableLogin } from '@shopgate/pwa-common/action-creators/user';
import { getHistoryPathname } from '@shopgate/pwa-common/selectors/history';
import { LOGIN_PATH } from '@shopgate/pwa-common/constants/RoutePaths';
import { themeName } from '@shopgate/pwa-common/helpers/config';
import { userDidLogin$, loginDidFail$ } from '@shopgate/pwa-common/streams/user';
import { fbWillLogin$, fbDidLogin$, fbLoginFailed$ } from '../streams/user';
import { fbToggle } from '../action-creators';

const isGmd = themeName.includes('gmd');
const isIos = themeName.includes('ios');

const MORE_PATH = '/more';

export default (subscribe) => {
  // Token was acquired and logic action finished. (failed or succeeded)
  const finishFbWithToken$ = fbDidLogin$.mergeMap(() => userDidLogin$.merge(loginDidFail$));
  // No token was acquired.
  const finishFbWithoutToken$ = fbWillLogin$.mergeMap(() => fbLoginFailed$);
  const finishFb$ = finishFbWithToken$.merge(finishFbWithoutToken$);

  let fbPathEnter$;
  let fbPathLeave$;

  if (isGmd) {
    // Debounce to leave a nav drawer
    fbPathEnter$ = routeDidEnter(LOGIN_PATH).debounceTime(100);
    fbPathLeave$ = routeDidLeave(LOGIN_PATH);
  }
  if (isIos) {
    fbPathEnter$ = routeDidEnter(MORE_PATH).merge(routeDidEnter(LOGIN_PATH));
    fbPathLeave$ = routeDidLeave(MORE_PATH)
      .filter(action => action.pathname !== LOGIN_PATH)
      .merge(routeDidLeave(LOGIN_PATH).filter(action => action.pathname !== MORE_PATH));
  }

  // Login is disabled as soon as login process is started and loading indicators are shown.
  subscribe(fbWillLogin$, ({ dispatch, getState }) => {
    dispatch(setViewLoading(getHistoryPathname(getState())));
    dispatch(disableLogin(true));
  });

  // View is idle when login process is fully done.
  subscribe(finishFb$, ({ dispatch, getState }) => {
    dispatch(unsetViewLoading(getHistoryPathname(getState())));
    dispatch(disableLogin(false));
  });

  // Show a button on gmd theme
  subscribe(fbPathEnter$, ({ dispatch }) => {
    dispatch(fbToggle(true));
  });

  // Show a button on ios theme
  subscribe(fbPathLeave$, ({ dispatch }) => {
    dispatch(fbToggle(false));
  });
};
