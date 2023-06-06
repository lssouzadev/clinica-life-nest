import { InMemoryProceduresRepository } from '@test/repositories/in-memory-procedures-repository';
import { InMemoryTreatmentsRepository } from '@test/repositories/in-memory-treatments-repository';
import { CreateTreatmentUseCase } from './create-treatment';

let treatmentsRepository: InMemoryTreatmentsRepository;
let proceduresRepository: InMemoryProceduresRepository;
let sut: CreateTreatmentUseCase;

describe('Create Treatment Use Case', () => {
  beforeEach(() => {
    treatmentsRepository = new InMemoryTreatmentsRepository();
    proceduresRepository = new InMemoryProceduresRepository();
    sut = new CreateTreatmentUseCase(
      treatmentsRepository,
      proceduresRepository,
    );
  });

  it('should be able to create treatment', async () => {
    await proceduresRepository.create({
      id: 'id-01',
      title: 'procedure-01',
      cost_procedure: '10,00',
      price_procedure: '20,00',
    });

    const { treatment } = await sut.execute({
      patientId: 'patient-01',
      procedureId: 'id-01',
      professionalId: 'prof-01',
    });

    expect(treatment.id).toEqual(expect.any(String));
    expect(treatment.title).toEqual('procedure-01');
  });
});
