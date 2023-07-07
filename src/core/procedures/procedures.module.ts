import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { ProceduresController } from './procedures.controller';

import { ProceduresService } from './procedures.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProceduresController],
  providers: [ProceduresService],
  exports: [ProceduresService],
})
export class ProceduresModule {}
