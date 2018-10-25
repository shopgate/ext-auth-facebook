/**
 * Sanitzes incoming config.
 * @param {Object} context Application context.
 * @param {Object} input Step input.
 */
module.exports = async (context, { config }) => ({
  enabled: !!config.enable_facebook_login
})
