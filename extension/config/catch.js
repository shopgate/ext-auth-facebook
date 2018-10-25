/**
 * Returns default configuration if request failed.
 * @param {Error} err
 * @param {SDKContext} context
 * @param {{config: Object}} input
 * @returns {Promise<{config: Object}>}
 */
module.exports = async (err, context, input) => {
  if (err) {
    return {
      config: {
        facebook_login_enabled: false
      }
    }
  }
  return input
}
