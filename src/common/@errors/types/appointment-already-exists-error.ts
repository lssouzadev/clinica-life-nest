export class AppointmentAlreadyExistsError extends Error {
  constructor() {
    super('Scheduling already exists!')
  }
}
