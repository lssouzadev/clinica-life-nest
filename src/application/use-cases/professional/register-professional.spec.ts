import { InMemoryProfessionalsRepository } from '@test/repositories/in-memory-professionals-repository';
import { RegisterProfessionalUseCase } from './register-professional';
import { ProfessionalAlreadyExistsError } from '@common/@errors/types/professional-already-exists-error';

let professionalsRepository: InMemoryProfessionalsRepository;
let sut: RegisterProfessionalUseCase;

describe('Register Professional Use Case', () => {
  beforeEach(() => {
    professionalsRepository = new InMemoryProfessionalsRepository();
    sut = new RegisterProfessionalUseCase(professionalsRepository);
  });

  it('should be able to register a Professional', async () => {
    const { professional } = await sut.execute({
      name: 'John Doe',
      cpf: '11122233345',
      specialty: 'cirurgião dentista',
      phone: '1199999999',
      clinicId: 'clinica-01',
    });

    expect(professional.id).toEqual(expect.any(String));
  });

  it('should not be able to register a professional with same cpf twice', async () => {
    await sut.execute({
      name: 'John Doe',
      cpf: '11122233345',
      specialty: 'cirurgião dentista',
      phone: '1199999999',
      clinicId: 'clinica-01',
    });

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        cpf: '11122233345',
        specialty: 'cirurgião dentista',
        phone: '1199999999',
        clinicId: 'clinica-01',
      }),
    ).rejects.toBeInstanceOf(ProfessionalAlreadyExistsError);
  });
});
