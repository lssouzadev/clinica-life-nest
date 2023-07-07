import { Module } from '@nestjs/common';
import { InfraModule } from '@infra/infra.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { CoreModule } from '@application/core.module';

@Module({
  imports: [
    InfraModule,
    CoreModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 30,
    }),
  ],
})
export class AppModule {}
