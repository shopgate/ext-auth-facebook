/**
 * Returns defualt configuration if request failed.
 * @param {Object} err
 * @param {Object} context
 * @param {Object} input
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
