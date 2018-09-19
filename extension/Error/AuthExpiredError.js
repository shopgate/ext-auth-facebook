class AuthExpiredError extends Error {
  constructor (cause = { message: '' }) {
    super(cause)

    this.code = 'EAUTHFACEBOOK'
    this.message = 'Facebook auth expire'
  }
}

module.exports = AuthExpiredError
