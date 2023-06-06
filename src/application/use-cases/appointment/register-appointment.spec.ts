import { InMemoryAppointmentsRepository } from '@test/repositories/in-memory-appointments-repository';
import { RegisterAppointmentUseCase } from './register-appointment';
import { InvalidAppointmentTimeError } from '@common/@errors/types/invalid-appointment-time-error';
import { AppointmentAlreadyExistsError } from '@common/@errors/types/appointment-already-exists-error';
import { OutOfOfficeHoursError } from '@common/@errors/types/ out-of-office-hours-error';
import { ProfessionalUnavailableError } from '@common/@errors/types/professional-unavailable-error';
import { InMemoryProfessionalRoomsRepository } from '@test/repositories/in-memory-professional-rooms-repository';
import { InMemoryProfessionalsRepository } from '@test/repositories/in-memory-professionals-repository';
import { InMemoryPatientsRepository } from '@test/repositories/in-memory-patients-repository';
import { InMemoryRoomsRepository } from '@test/repositories/in-memory-rooms-repository';
import { createRoomPatientProfessionalAndProfessionalRoom } from '@test/utils/create-room-patient-professional-and-professional-room';
let professionalsRepository: InMemoryProfessionalsRepository;
let patientsRepository: InMemoryPatientsRepository;
let roomsRepository: InMemoryRoomsRepository;
let professionalRoomsRepository: InMemoryProfessionalRoomsRepository;
let appointmentsRepository: InMemoryAppointmentsRepository;
let sut: RegisterAppointmentUseCase;

describe('Register Appointment Use Case', () => {
  beforeEach(async () => {
    roomsRepository = new InMemoryRoomsRepository();
    professionalsRepository = new InMemoryProfessionalsRepository();
    professionalRoomsRepository = new InMemoryProfessionalRoomsRepository();
    patientsRepository = new InMemoryPatientsRepository();
    appointmentsRepository = new InMemoryAppointmentsRepository();
    sut = new RegisterAppointmentUseCase(
      appointmentsRepository,
      professionalRoomsRepository,
      professionalsRepository,
      roomsRepository,
      patientsRepository,
    );
    await createRoomPatientProfessionalAndProfessionalRoom({
      professionalsRepository,
      professionalRoomsRepository,
      roomsRepository,
      patientsRepository,
    });
  });

  it('should be able to register appointment', async () => {
    const { appointment } = await sut.execute({
      professionalId: 'professional-01',
      patientId: 'patient-01',
      dateHour: new Date('2023-04-29T07:30:00.000Z'),
      roomId: 'room-01',
    });

    expect(appointment.id).toEqual(expect.any(String));
  });

  it('should not be able to register appointment where the minutes are different from thirty or zero', async () => {
    await expect(() =>
      sut.execute({
        professionalId: 'professional-01',
        patientId: 'patient-01',
        dateHour: new Date('2023-04-29T07:31:00.000Z'),
        roomId: 'room-01',
      }),
    ).rejects.toBeInstanceOf(InvalidAppointmentTimeError);
  });

  it('should not be able to register two appointments in the same room and time', async () => {
    await sut.execute({
      professionalId: 'professional-01',
      patientId: 'patient-01',
      dateHour: new Date('2023-04-29T07:30:00.000Z'),
      roomId: 'room-01',
    });

    await expect(() =>
      sut.execute({
        professionalId: 'professional-02',
        patientId: 'patient-01',
        dateHour: new Date('2023-04-29T07:30:00.000Z'),
        roomId: 'room-01',
      }),
    ).rejects.toBeInstanceOf(AppointmentAlreadyExistsError);
  });

  it('should be able to register two appointments in different room but equal time', async () => {
    await sut.execute({
      professionalId: 'professional-01',
      patientId: 'patient-01',
      dateHour: new Date('2023-04-29T07:30:00.000Z'),
      roomId: 'room-01',
    });

    const { appointment } = await sut.execute({
      professionalId: 'professional-02',
      patientId: 'patient-01',
      dateHour: new Date('2023-04-29T07:30:00.000Z'),
      roomId: 'room-02',
    });

    expect(appointment.id).toEqual(expect.any(String));
  });

  it('should not be able to register two appointments at the same time for a single professional', async () => {
    await sut.execute({
      professionalId: 'professional-01',
      patientId: 'patient-01',
      dateHour: new Date('2023-04-29T07:30:00.000Z'),
      roomId: 'room-01',
    });

    await expect(() =>
      sut.execute({
        professionalId: 'professional-01',
        patientId: 'patient-01',
        dateHour: new Date('2023-04-29T07:30:00.000Z'),
        roomId: 'room-02',
      }),
    ).rejects.toBeInstanceOf(ProfessionalUnavailableError);
  });

  it('should not to register appointments outside working hours', async () => {
    await expect(() =>
      sut.execute({
        professionalId: 'professional-01',
        patientId: 'patient-01',
        dateHour: new Date('2023-04-29T06:30:00.000Z'),
        roomId: 'room-01',
      }),
    ).rejects.toBeInstanceOf(OutOfOfficeHoursError);
  });
});
