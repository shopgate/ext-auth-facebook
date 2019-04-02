const FB = require('fb')

const fields = [
  'id',
  'email',
  'name',
  'first_name',
  'last_name',
  'picture'
].join(', ')

/**
 * @param {SDKContext} context
 * @param {{strategy: string, parameters: {token}}} input
 * @returns {Promise<{userId: string}>}
 */
module.exports = async (context, { strategy, parameters: { token, tokenExpiryDate } }) => {
  // is logged in
  if (context.meta.userId || strategy !== 'facebook' || !token) {
    return
  }

  if (!context.config.facebookConfig || !context.config.facebookConfig.app_id) {
    context.log.warn('FB config is not given')
    throw new Error('FB credentials are wrong')
  }

  const fb = FB.extend({
    appId: context.config.facebookConfig.app_id,
    appSecret: context.config.facebookConfig.app_secret
  })

  fb.setAccessToken(token)

  let response
  try {
    response = await fb.api('/me', { fields })
  } catch (err) {
    throw new Error(err.message)
  }

  if (!response || response.error) {
    const errorMessage = !response ? 'No response from Facebook' : response.error.message
    if (response.error && response.error.code === 190) {
      // Invalid token error
      throw new Error(errorMessage)
    }
    throw new Error(errorMessage)
  }

  const user = {
    id: response.id,
    mail: response.email,
    firstName: response.first_name,
    lastName: response.last_name,
    birthday: null,
    phone: null,
    token,
    tokenExpiryDate,
    time: (new Date()).getTime() // tim when user created, checked, etc
  }

  // Save user under fb ID
  try {
    await context.storage.device.set('facebook_user', user)
  } catch (err) {
    context.log.warn(err, 'Extension storage error')
    throw new Error()
  }
}
