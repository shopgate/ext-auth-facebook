import React from 'react';
import I18n from '@shopgate/pwa-common/components/I18n';
import Grid from '@shopgate/pwa-common/components/Grid';
import style from './style';

/**
 * @returns {JSX}
 */
const OrLine = () => (
  <Grid className={style.wrapper} aria-hidden>
    <Grid.Item grow={1}><hr className={style.hr} /></Grid.Item>
    <Grid.Item grow={0} className={style.center}>
      <I18n.Text string="login.or" />
    </Grid.Item>
    <Grid.Item grow={1}><hr className={style.hr} /></Grid.Item>
  </Grid>
);

export default OrLine;

