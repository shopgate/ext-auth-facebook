const { shopNumber } = require('../config.json')

/**
 * Returns the bigapi request options to request facebook config from config service.
 * @returns {Object}
 */
module.exports = async () => ({
  service: 'config',
  version: 'v1',
  path: `shop/${shopNumber}/service_config_facebook?parsed=true`,
  method: 'GET'
})
