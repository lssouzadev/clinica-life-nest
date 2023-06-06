import { InMemoryTreatmentsRepository } from '@test/repositories/in-memory-treatments-repository';
import { FetchPatientTreatmentsUseCase } from './fetch-patient-treatments';

let treatmentsRepository: InMemoryTreatmentsRepository;
let sut: FetchPatientTreatmentsUseCase;

describe('Fetch Patient Treatments Use Case', () => {
  beforeEach(() => {
    treatmentsRepository = new InMemoryTreatmentsRepository();
    sut = new FetchPatientTreatmentsUseCase(treatmentsRepository);
  });

  it('should be able to Fetch patient treatments', async () => {
    await treatmentsRepository.create({
      title: 'Procedure',
      patient_id: 'patient-01',
      procedure_id: 'proc-01',
      price_treatment: '20,00',
      professional_id: 'prof-01',
    });

    await treatmentsRepository.create({
      title: 'Procedure',
      patient_id: 'patient-01',
      procedure_id: 'proc-01',
      price_treatment: '20,00',
      professional_id: 'prof-01',
    });

    const { treatments } = await sut.execute({
      patientId: 'patient-01',
    });

    expect(treatments).toHaveLength(2);
  });
});
