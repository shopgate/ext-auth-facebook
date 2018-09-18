/**
 * @param {SDKContext} context
 * @returns {Promise<>}
 */
module.exports = async (context) => {
  // Delete reference from storage
  try {
    await context.storage.device.del('facebook_user')
  } catch (ignore) {}
}
