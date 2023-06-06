import { InMemoryPatientsRepository } from '@test/repositories/in-memory-patients-repository';
import { RegisterPatientUseCase } from './register-patient';
import { PatientAlreadyExistsError } from '@common/@errors/types/patient-already-exists-error';

let patientsRepository: InMemoryPatientsRepository;
let sut: RegisterPatientUseCase;

describe('Register Patient Use Case', () => {
  beforeEach(() => {
    patientsRepository = new InMemoryPatientsRepository();
    sut = new RegisterPatientUseCase(patientsRepository);
  });

  it('should be able to register a patient', async () => {
    const { patient } = await sut.execute({
      name: 'John Doe',
      cpf: '00100200304',
      phone: '1199999999',
      birthday: '1994-10-08',
    });

    expect(patient.id).toEqual(expect.any(String));
  });

  it('should not be able to register a patient with same cpf', async () => {
    await sut.execute({
      name: 'John Doe',
      cpf: '00100200304',
      phone: '1199999999',
      birthday: '1994-10-08',
    });

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        cpf: '00100200304',
        phone: '1199999999',
        birthday: '1994-10-08',
      }),
    ).rejects.toBeInstanceOf(PatientAlreadyExistsError);
  });
});
