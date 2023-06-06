export class OutOfOfficeHoursError extends Error {
  constructor() {
    super('Appointment outside working hours');
  }
}
