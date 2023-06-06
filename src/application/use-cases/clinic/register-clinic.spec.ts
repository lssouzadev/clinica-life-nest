import { InMemoryClinicsRepository } from '@test/repositories/in-memory-clinics-repository';
import { RegisterClinicUseCase } from './register-clinic';

let clinicsRepository: InMemoryClinicsRepository;
let sut: RegisterClinicUseCase;

describe('Register Clinic Use Case', () => {
  beforeEach(() => {
    clinicsRepository = new InMemoryClinicsRepository();
    sut = new RegisterClinicUseCase(clinicsRepository);
  });

  it('should be able to register a Clinic', async () => {
    const { clinic } = await sut.execute({
      name: 'clinic-01',
      address: 'some address',
      phone: '1199999999',
    });

    expect(clinic.id).toEqual(expect.any(String));
  });
});
