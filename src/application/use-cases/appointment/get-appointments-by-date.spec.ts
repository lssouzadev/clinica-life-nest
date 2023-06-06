import { InMemoryAppointmentsRepository } from '@test/repositories/in-memory-appointments-repository';
import { GetAppointmentsByDateUseCase } from './get-appointments-by-date';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
let appointmentsRepository: InMemoryAppointmentsRepository;
let sut: GetAppointmentsByDateUseCase;

describe('Get Appointments By Date Use Case', () => {
  beforeEach(() => {
    appointmentsRepository = new InMemoryAppointmentsRepository();
    sut = new GetAppointmentsByDateUseCase(appointmentsRepository);
  });

  it('should be able to get appointments by date', async () => {
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
      patient_id: 'patient-01',
      room_id: 'room-01',
    });

    const date = dayjs.utc('2023-04-29T05:00:00.000Z').toDate();

    const { appointments } = await sut.execute({
      date,
    });

    expect(appointments).toHaveLength(3);
  });
});
