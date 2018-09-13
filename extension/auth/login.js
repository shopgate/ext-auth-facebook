const FB = require('fb')

const fields = [
  'id',
  'email',
  'name',
  'first_name',
  'last_name',
  'age_range',
  'link',
  'gender',
  'locale',
  'picture',
  'timezone',
  'updated_time',
  'verified'
].join(', ')

/**
 * @param {SDKContext} context
 * @param {{strategy: string, parameters: {token}}} input
 * @returns {Promise<{userId: string}>}
 */
module.exports = async (context, { strategy, parameters: { token } }) => {
  // is logged in
  if (context.meta.userId || strategy !== 'facebook' || !token) {
    return
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
    gender: response.gender,
    birthday: null,
    phone: null,
    token
  }

  // Save user under fb ID
  try {
    await context.storage.extension.set(response.id, user)
  } catch (err) {
    context.log.warn(err, 'Extension storage error')
    throw new Error()
  }

  return {
    userId: `fb_${response.id}`
  }
}