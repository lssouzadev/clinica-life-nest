export class TokenExpiredError extends Error {
  constructor() {
    super('token expired');
  }
}
