import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { RouteContext } from '@shopgate/pwa-common/context';
import FacebookButton from './components/FacebookButton';
import OrLine from './components/OrLine';
import connect from './connector';

/**
 * Facebook login button
 * @param {Object} props props
 * @returns {JSX}
 */
const FacebookForm = ({ visible }) => {
  if (!visible) {
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
  visible: PropTypes.bool.isRequired,
};


export default connect(({ visible }) => (
  <RouteContext.Consumer>
    {({ visible: routeVisible }) => (
      <FacebookForm
        visible={routeVisible && visible}
      />
    )}
  </RouteContext.Consumer>
));
