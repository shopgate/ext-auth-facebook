import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import RippleButton from '@shopgate/pwa-ui-shared/RippleButton';
import { themeName } from '@shopgate/pwa-common/helpers/config';
import FbIcon from './components/FbIcon';
import OrLine from './components/OrLine';
import connect from './connector';
import style from './style';

const isGmd = themeName.includes('gmd');

/**
 * Facebook login button
 * @param {Object} props props
 * @returns {JSX}
 */
const FacebookButton = ({ visible, disabled, login }) => (
  <Fragment>
    {!visible && null}
    {visible &&
      <Fragment>
        <div className={style.buttonWrapper}>
          <FbIcon className={style.fbIcon} />
          <RippleButton
            className={style.button}
            onClick={login}
            disabled={disabled}
            type="primary"
            testId="faceBookLogin"
          >
            <I18n.Text string="login.facebook" />
          </RippleButton>
        </div>
        {isGmd && <OrLine />}
      </Fragment>
    }
  </Fragment>
);

FacebookButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default connect(FacebookButton);

