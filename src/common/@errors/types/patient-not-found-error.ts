export class PatientNotFoundError extends Error {
  constructor() {
    super('Patient Not Found!')
  }
}
