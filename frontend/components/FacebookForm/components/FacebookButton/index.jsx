import React from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import RippleButton from '@shopgate/pwa-ui-shared/RippleButton';
import FbIcon from './components/FbIcon';
import connect from './connector';
import style from './style';

/**
 * Facebook login button
 * @param {Object} props props
 * @returns {JSX}
 */
const FacebookButton = ({
  visible, disabled, login, activated, contain,
}) => {
  if (!visible || !activated) {
    return null;
  }

  return (
    <div className={`${style.buttonWrapper} ${contain ? style.buttonContained : ''}`}>
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
  );
};

FacebookButton.propTypes = {
  activated: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  contain: PropTypes.bool,
};

FacebookButton.defaultProps = {
  contain: false,
};

export default connect(FacebookButton);

