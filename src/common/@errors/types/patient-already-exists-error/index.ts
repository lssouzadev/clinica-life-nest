export class PatientAlreadyExistsError extends Error {
  constructor() {
    super('Patient already exists!');
  }
}
