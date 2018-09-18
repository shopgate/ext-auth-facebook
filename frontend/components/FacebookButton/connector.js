import { connect } from 'react-redux';
import { isUserLoggedIn } from '@shopgate/pwa-common/selectors/user';
import facebookLogin from './../../actions/facebookLogin';
import { getDisabled, getVisible } from './../../selectors';

/**
 * @param {Object} state state
 * @return {{disabled: boolean, hidden: boolean}}
 */
const mapStateToProps = state => ({
  disabled: getDisabled(state),
  visible: !isUserLoggedIn(state) && getVisible(state),
});

/**
 * @param {function} dispatch dispatch
 * @return {{addAddress: function, updateAddress: function, deleteAddress: function}}
 */
const mapDispatchToProps = dispatch => ({
  login: () => dispatch(facebookLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps);
