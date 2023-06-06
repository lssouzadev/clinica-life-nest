import { InMemoryAppointmentsRepository } from '@test/repositories/in-memory-appointments-repository';
import { GetPatientAppointmentsHistoryUseCase } from './get-patient-appointments-history';

let appointmentsRepository: InMemoryAppointmentsRepository;
let sut: GetPatientAppointmentsHistoryUseCase;

describe('Get Patient Appointments History Use Case', () => {
  beforeEach(() => {
    appointmentsRepository = new InMemoryAppointmentsRepository();
    sut = new GetPatientAppointmentsHistoryUseCase(appointmentsRepository);
  });

  it('should be able to get patient appointments history ', async () => {
    await appointmentsRepository.create({
      date_hour: '2023-04-29T07:30:00.000Z',
      professional_id: 'prof-01',
      patient_id: 'patient-01',
      room_id: 'room-01',
    });

    await appointmentsRepository.create({
      date_hour: '2023-04-29T07:30:00.000Z',
      professional_id: 'prof-01',
      patient_id: 'patient-01',
      room_id: 'room-01',
    });

    await appointmentsRepository.create({
      date_hour: '2023-04-29T08:00:00.000Z',
      professional_id: 'prof-01',
      patient_id: 'patient-02',
      room_id: 'room-01',
    });

    const { appointments } = await sut.execute({
      patientId: 'patient-02',
    });

    expect(appointments).toHaveLength(1);
    expect(appointments).toEqual([
      expect.objectContaining({ patient_id: 'patient-02' }),
    ]);
  });
});
