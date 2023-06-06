import { InMemoryProceduresRepository } from '@test/repositories/in-memory-procedures-repository';
import { DeleteProcedureUseCase } from './delete-procedure';

let proceduresRepository: InMemoryProceduresRepository;
let sut: DeleteProcedureUseCase;

describe('Delete Procedure Use Case', () => {
  beforeEach(() => {
    proceduresRepository = new InMemoryProceduresRepository();
    sut = new DeleteProcedureUseCase(proceduresRepository);
  });

  it('should be able to delete a procedure', async () => {
    await proceduresRepository.create({
      id: 't-01',
      title: 'procedure-01',
      cost_procedure: '10,00',
      price_procedure: '25,00',
    });

    await proceduresRepository.create({
      id: 't-02',
      title: 'procedure-02',
      cost_procedure: '10,00',
      price_procedure: '25,00',
    });

    await sut.execute({
      procedureId: 't-01',
    });

    expect(proceduresRepository.items).toHaveLength(1);
    expect(proceduresRepository.items).toEqual([
      expect.objectContaining({ title: 'procedure-02' }),
    ]);
  });
});
