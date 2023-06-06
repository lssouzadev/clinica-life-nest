import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';
import { AuthModule } from '@infra/http/auth/auth.module';
import { AuthController } from '@infra/http/auth/auth.controller';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    DatabaseModule,
    HttpModule,
    AuthModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 30,
    }),
  ],
  controllers: [AuthController],
})
export class AppModule {}
