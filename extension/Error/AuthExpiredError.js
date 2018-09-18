class AuthExpiredError extends Error {
  constructor (cause = {message: ''}) {
    super(cause)

    this.code = 'EACCESS'
    this.message = 'Auth expire'
  }
}

module.exports = AuthExpiredError
