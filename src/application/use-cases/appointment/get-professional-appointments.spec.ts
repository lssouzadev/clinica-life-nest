import { InMemoryAppointmentsRepository } from '@test/repositories/in-memory-appointments-repository';
import { GetProfessionalAppointmentsUseCase } from './get-professional-appointments';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

let appointmentsRepository: InMemoryAppointmentsRepository;
let sut: GetProfessionalAppointmentsUseCase;

describe('Get Patient Appointments History Use Case', () => {
  beforeEach(() => {
    appointmentsRepository = new InMemoryAppointmentsRepository();
    sut = new GetProfessionalAppointmentsUseCase(appointmentsRepository);
  });

  it('should be able to get patient appointments history ', async () => {
    await appointmentsRepository.create({
      date_hour: '2023-04-30T07:30:00.000Z',
      professional_id: 'prof-02',
      patient_id: 'patient-01',
      room_id: 'room-01',
    });

    await appointmentsRepository.create({
      date_hour: '2023-04-29T07:30:00.000Z',
      professional_id: 'prof-02',
      patient_id: 'patient-02',
      room_id: 'room-01',
    });

    await appointmentsRepository.create({
      date_hour: '2023-04-29T08:00:00.000Z',
      professional_id: 'prof-02',
      patient_id: 'patient-03',
      room_id: 'room-01',
    });

    const { appointments } = await sut.execute({
      date: dayjs.utc('2023-04-29T05:00:00.000Z').toDate(),
      professionalId: 'prof-02',
    });

    expect(appointments).toHaveLength(2);
    expect(appointments).toEqual([
      expect.objectContaining({ patient_id: 'patient-02' }),
      expect.objectContaining({ patient_id: 'patient-03' }),
    ]);
  });
});
