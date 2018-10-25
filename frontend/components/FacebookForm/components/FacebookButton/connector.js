import { connect } from 'react-redux';
import { isUserLoggedIn } from '@shopgate/pwa-common/selectors/user';
import facebookLogin from '../../../../actions/facebookLogin';
import { getDisabled, getVisible, isActivated } from '../../../../selectors';

/**
 * @param {Object} state state
 * @return {{disabled: boolean, visible: boolean, activated: boolean}}
 */
const mapStateToProps = state => ({
  disabled: getDisabled(state),
  visible: !isUserLoggedIn(state) && getVisible(state),
  activated: isActivated(state),
});

/**
 * @param {function} dispatch dispatch
 * @return {{login: function}}
 */
const mapDispatchToProps = dispatch => ({
  login: () => dispatch(facebookLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps);
