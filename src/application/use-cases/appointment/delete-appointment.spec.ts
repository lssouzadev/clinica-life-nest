import { InMemoryAppointmentsRepository } from '@test/repositories/in-memory-appointments-repository';
import { DeleteAppointmentUseCase } from './delete-appointment';

let appointmentsRepository: InMemoryAppointmentsRepository;
let sut: DeleteAppointmentUseCase;

describe('Delete Appointment Use Case', () => {
  beforeEach(() => {
    appointmentsRepository = new InMemoryAppointmentsRepository();
    sut = new DeleteAppointmentUseCase(appointmentsRepository);
  });

  it('should be able to delete a appointment', async () => {
    await appointmentsRepository.create({
      id: 'app-01',
      date_hour: new Date(),
      professional_id: 'prof-01',
      patient_id: 'patient-01',
      room_id: 'room-01',
    });

    await appointmentsRepository.create({
      id: 'app-02',
      date_hour: new Date(),
      professional_id: 'prof-01',
      patient_id: 'patient-01',
      room_id: 'room-01',
    });

    await sut.execute({
      appointmentId: 'app-01',
    });

    expect(appointmentsRepository.items).toHaveLength(1);
  });
});
