import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { ERROR_HANDLE_SUPPRESS } from '@shopgate/pwa-core/constants/ErrorHandleTypes';
import { FACEBOOK_GET_CONFIG } from '../constants/Pipelines';
import { fbFetchConfig, fbFetchConfigFailed, fbFetchConfigSuccess } from './../action-creators';

/**
 * @return {function} A redux thunk.
 */
const fetchConfig = () => async (dispatch) => {
  dispatch(fbFetchConfig());

  try {
    const config = await (new PipelineRequest(FACEBOOK_GET_CONFIG)
      .setTrusted()
      .setHandleErrors(ERROR_HANDLE_SUPPRESS)
      .dispatch());

    dispatch(fbFetchConfigSuccess(config));
  } catch (ex) {
    dispatch(fbFetchConfigFailed());
  }
};

export default fetchConfig;
