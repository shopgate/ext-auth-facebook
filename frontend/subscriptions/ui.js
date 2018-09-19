import { routeDidEnter, routeDidLeave } from '@shopgate/pwa-common/streams/history';
import setViewLoading from '@shopgate/pwa-common/actions/view/setViewLoading';
import unsetViewLoading from '@shopgate/pwa-common/actions/view/unsetViewLoading';
import { getHistoryPathname } from '@shopgate/pwa-common/selectors/history';
import { LOGIN_PATH } from '@shopgate/pwa-common/constants/RoutePaths';
import { themeName } from '@shopgate/pwa-common/helpers/config';
import { startFb$, finishFb$ } from '../streams/user';
import { fbToggle } from '../action-creators';

const isGmd = themeName.includes('gmd');
const isIos = themeName.includes('ios');

export default (subscribe) => {
  let fbPathEnter$;
  let fbPathLeave$;

  if (isGmd) {
    // Debounce to leave a nav drawer
    fbPathEnter$ = routeDidEnter(LOGIN_PATH).debounceTime(100);
    fbPathLeave$ = routeDidLeave(LOGIN_PATH);
  }
  if (isIos) {
    fbPathEnter$ = routeDidEnter('/more');
    fbPathLeave$ = routeDidLeave('/more');
  }

  // View is loading
  subscribe(startFb$, ({ dispatch, getState }) => {
    dispatch(setViewLoading(getHistoryPathname(getState())));
  });

  // View is idle
  subscribe(finishFb$, ({ dispatch, getState }) => {
    dispatch(unsetViewLoading(getHistoryPathname(getState())));
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
