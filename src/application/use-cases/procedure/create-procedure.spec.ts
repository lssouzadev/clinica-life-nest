import { InMemoryProceduresRepository } from '@test/repositories/in-memory-procedures-repository';
import { CreateProcedureUseCase } from './create-procedure';

let proceduresRepository: InMemoryProceduresRepository;
let sut: CreateProcedureUseCase;

describe('Create Procedure Use Case', () => {
  beforeEach(() => {
    proceduresRepository = new InMemoryProceduresRepository();
    sut = new CreateProcedureUseCase(proceduresRepository);
  });

  it('should be able to create procedure', async () => {
    const { procedure } = await sut.execute({
      title: 'procedure-01',
      priceProcedure: '25,00',
      costProcedure: '10,00',
    });

    expect(procedure.id).toEqual(expect.any(String));
    expect(procedure.title).toEqual('procedure-01');
  });
});
