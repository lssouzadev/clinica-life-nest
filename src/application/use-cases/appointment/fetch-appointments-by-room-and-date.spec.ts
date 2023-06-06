import { InMemoryAppointmentsRepository } from '@test/repositories/in-memory-appointments-repository';
import { FetchAppointmentsByRoomAndDateUseCase } from './fetch-appointments-by-room-and-date';

let appointmentsRepository: InMemoryAppointmentsRepository;
let sut: FetchAppointmentsByRoomAndDateUseCase;

describe('Fetch Appointments by Room', () => {
  beforeEach(() => {
    appointmentsRepository = new InMemoryAppointmentsRepository();
    sut = new FetchAppointmentsByRoomAndDateUseCase(appointmentsRepository);
  });

  it('should be able to fetch a appointments by room and Date', async () => {
    await appointmentsRepository.create({
      date_hour: '2023-04-29T07:00:00.000Z',
      professional_id: 'prof-01',
      patient_id: 'patient-01',
      room_id: 'room-01',
    });

    await appointmentsRepository.create({
      date_hour: '2023-04-29T07:30:00.000Z',
      professional_id: 'prof-01',
      patient_id: 'patient-02',
      room_id: 'room-01',
    });

    await appointmentsRepository.create({
      date_hour: '2023-04-29T08:00:00.000Z',
      professional_id: 'prof-01',
      patient_id: 'patient-03',
      room_id: 'room-02',
    });

    await appointmentsRepository.create({
      date_hour: '2023-04-30T08:00:00.000Z',
      professional_id: 'prof-01',
      patient_id: 'patient-04',
      room_id: 'room-01',
    });

    const { appointments } = await sut.execute({
      roomId: 'room-01',
      date: new Date('2023-04-29T05:00:00.000Z'),
    });

    expect(appointments).toHaveLength(2);
    expect(appointments).toEqual([
      expect.objectContaining({ patient_id: 'patient-01' }),
      expect.objectContaining({ patient_id: 'patient-02' }),
    ]);
  });
});
