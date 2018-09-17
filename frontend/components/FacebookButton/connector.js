import { connect } from 'react-redux';
import { LOGIN_PATH } from '@shopgate/pwa-common/constants/RoutePaths';
import { getHistoryPathname } from '@shopgate/pwa-common/selectors/history';
import { themeName } from '@shopgate/pwa-common/helpers/config';
import facebookLogin from './../../actions/facebookLogin';
import { getDisabled } from './../../selectors';

const isIos = themeName.includes('ios');

/**
 * @param {Object} state state
 * @return {{disabled: boolean, hidden: boolean}}
 */
const mapStateToProps = state => ({
  disabled: getDisabled(state),
  hidden: isIos && getHistoryPathname(state) === LOGIN_PATH,
});

/**
 * @param {function} dispatch dispatch
 * @return {{addAddress: function, updateAddress: function, deleteAddress: function}}
 */
const mapDispatchToProps = dispatch => ({
  login: () => dispatch(facebookLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps);
