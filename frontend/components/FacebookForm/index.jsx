import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import FacebookButton from './components/FacebookButton';
import OrLine from './components/OrLine';
import connect from './connector';

/**
 * Facebook login button
 * @param {Object} props props
 * @returns {JSX}
 */
const FacebookForm = ({ visible, activated }) => {
  if (!visible || !activated) {
    return null;
  }

  return (
    <Fragment>
      <FacebookButton contain />
      <OrLine />
    </Fragment>
  );
};

FacebookForm.propTypes = {
  activated: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default connect(FacebookForm);

