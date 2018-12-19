import { LoadingProvider } from '@shopgate/pwa-common/providers';
import { disableLogin } from '@shopgate/pwa-common/action-creators/user';
import { getCurrentRoute } from '@shopgate/pwa-common/helpers/router';
import { userDidLogin$, loginDidFail$ } from '@shopgate/pwa-common/streams/user';
import { fbWillLogin$, fbDidLogin$, fbLoginFailed$ } from '../streams/user';

export default (subscribe) => {
  // Token was acquired and logic action finished. (failed or succeeded)
  const finishFbWithToken$ = fbDidLogin$
    .switchMap(() => userDidLogin$.merge(loginDidFail$).first());
  // No token was acquired.
  const finishFbWithoutToken$ = fbWillLogin$.switchMap(() => fbLoginFailed$.first());
  const finishFb$ = finishFbWithToken$.merge(finishFbWithoutToken$);

  // Login is disabled as soon as login process is started and loading indicators are shown.
  subscribe(fbWillLogin$, ({ dispatch }) => {
    const { pattern } = getCurrentRoute();
    LoadingProvider.setLoading(pattern);
    dispatch(disableLogin(true));
  });

  // View is idle when login process is fully done.
  subscribe(finishFb$, ({ dispatch }) => {
    const { pattern } = getCurrentRoute();
    LoadingProvider.unsetLoading(pattern);
    dispatch(disableLogin(false));
  });
};
