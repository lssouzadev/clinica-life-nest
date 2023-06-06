import { InMemoryPatientsRepository } from '@test/repositories/in-memory-patients-repository';
import { InMemoryProfessionalRoomsRepository } from '@test/repositories/in-memory-professional-rooms-repository';
import { InMemoryProfessionalsRepository } from '@test/repositories/in-memory-professionals-repository';
import { InMemoryRoomsRepository } from '@test/repositories/in-memory-rooms-repository';

interface Repositories {
  roomsRepository: InMemoryRoomsRepository;
  professionalsRepository: InMemoryProfessionalsRepository;
  professionalRoomsRepository: InMemoryProfessionalRoomsRepository;
  patientsRepository: InMemoryPatientsRepository;
}
export async function createRoomPatientProfessionalAndProfessionalRoom({
  roomsRepository,
  professionalsRepository,
  professionalRoomsRepository,
  patientsRepository,
}: Repositories) {
  await roomsRepository.create({
    id: 'room-01',
    title: 'sala-01',
  });

  await roomsRepository.create({
    id: 'room-02',
    title: 'sala-02',
  });

  await professionalsRepository.create({
    id: 'professional-01',
    name: 'John Random',
    cpf: '00000000000',
    specialty: 'Dentist',
    phone: '1199999999',
    clinic_id: 'clinic-01',
  });

  await professionalsRepository.create({
    id: 'professional-02',
    name: 'John Random',
    cpf: '00000000000',
    specialty: 'Dentist',
    phone: '1199999999',
    clinic_id: 'clinic-01',
  });

  await patientsRepository.create({
    id: 'patient-01',
    name: 'John Doe',
    cpf: '00100200304',
    phone: '1199999999',
    birthday: '1994-10-08',
  });

  await professionalRoomsRepository.create({
    professional_id: 'professional-01',
    room_id: 'room-01',
  });

  await professionalRoomsRepository.create({
    professional_id: 'professional-02',
    room_id: 'room-01',
  });

  await professionalRoomsRepository.create({
    professional_id: 'professional-01',
    room_id: 'room-02',
  });

  await professionalRoomsRepository.create({
    professional_id: 'professional-02',
    room_id: 'room-02',
  });
}
