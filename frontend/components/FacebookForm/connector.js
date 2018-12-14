import { connect } from 'react-redux';
import { isUserLoggedIn } from '@shopgate/pwa-common/selectors/user';
import { getVisible, isActivated } from './../../selectors';

/**
 * @param {Object} state state
 * @return {{visible: boolean}}
 */
const mapStateToProps = state => ({
  visible: !isUserLoggedIn(state) && (getVisible(state) && isActivated(state)),
});

export default connect(mapStateToProps);
