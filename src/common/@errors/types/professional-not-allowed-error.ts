export class ProfessionalNotAllowedError extends Error {
  constructor() {
    super('Professional not allowed in this room!')
  }
}
