import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

const wrapper = css({
  marginTop: variables.gap.big,
  marginBottom: variables.gap.big,
}).toString();

const center = css({
  paddingLeft: variables.gap.xbig,
  paddingRight: variables.gap.xbig,
}).toString();

const hr = css({
  height: 1,
  margin: `${variables.gap.small + variables.gap.xsmall}px 0`,
  background: colors.shade4,
  border: 0,
}).toString();

export default {
  wrapper,
  center,
  hr,
};
