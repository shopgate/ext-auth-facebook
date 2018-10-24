import { css } from 'glamor';
import { themeConfig, themeName } from '@shopgate/pwa-common/helpers/config';

const { variables } = themeConfig;
const isIos = themeName.includes('ios');

const buttonWrapper = css({
  position: 'relative',
  marginBottom: variables.gap.small,
  marginLeft: isIos ? variables.gap.bigger : 0,
  marginRight: isIos ? variables.gap.bigger : 0,
}).toString();

const buttonContained = css({
  marginLeft: 0,
  marginRight: 0,
}).toString();

const button = css({
  width: '100%',
  backgroundColor: '#475a96!important',
}).toString();

const fbIcon = css({
  position: 'absolute',
  marginTop: variables.gap.small,
  marginLeft: variables.gap.small,
  zIndex: 1,
  height: '24px',
  width: '24px',
}).toString();

const padLine = css({
  marginBottom: variables.gap.xxbig - variables.gap.big,
}).toString();

export default {
  buttonWrapper,
  buttonContained,
  button,
  fbIcon,
  padLine,
};
