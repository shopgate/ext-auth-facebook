const FB = require('fb')
const AuthExpiredError = require('./../Error/AuthExpiredError')

/**
 * Api calls limitations
 * @link https://developers.facebook.com/docs/graph-api/advanced/rate-limiting/
 * @param {SDKContext} context
 * @returns {Promise<>}
 */
module.exports = async (context) => {
  if (!context.meta.userId) {
    return
  }

  let fbUser
  try {
    fbUser = await context.storage.device.get('facebook_user')
  } catch (err) {
    // Silently retry on next get user
    return context.log.warn(err, 'Device storage error')
  }

  // No fb user is stored to device
  if (!fbUser) {
    return
  }

  if (!context.config.facebookConfig || !context.config.facebookConfig.app_id) {
    context.log.warn('FB config is not given')
    throw new Error('FB credentials are wrong')
  }

  // Check if token still valid
  const fb = FB.extend({
    appId: context.config.facebookConfig.app_id,
    appSecret: context.config.facebookConfig.app_secret
  })
  fb.setAccessToken(fbUser.token)

  try {
    await fb.api('/me', { fields: 'id' })
  } catch (err) {
    // Silently retry on next get user
    context.log.warn(err, 'FB api error')
    // Invalid OAuth access token,
    if (err.response && err.response.error && err.response.error.code === 190) {
      throw new AuthExpiredError()
    }
  }
}
