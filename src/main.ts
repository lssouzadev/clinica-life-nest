import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { OutOfOfficeHoursInterceptor } from './common/@errors/interceptors/out-of-office-hours.interceptor';
import { AppointmentAlreadyExistsInterceptor } from '@common/@errors/interceptors/appointment-already-exists.interceptor';
import { IncorrectTypeInterceptor } from '@common/@errors/interceptors/incorrect-type-error.interceptor';
import { InvalidAppointmentTimeInterceptor } from '@common/@errors/interceptors/invalid-appointment-time.interceptor';
import { InvalidCredentialsInterceptor } from '@common/@errors/interceptors/invalid-credentials.interceptor';
import { PatientAlreadyExistsInterceptor } from '@common/@errors/interceptors/patient-already-exists.interceptor';
import { PatientNotFoundInterceptor } from '@common/@errors/interceptors/patient-not-found.interceptor';
import { ProcedureNotFoundInterceptor } from '@common/@errors/interceptors/procedure-not-found.interceptor';
import { ProfessionalAlreadyExistsInterceptor } from '@common/@errors/interceptors/professional-already-exists.interceptor';
import { ProfessionalAlreadyRegisteredInThisRoomInterceptor } from '@common/@errors/interceptors/professional-already-registered-in-this-room.interceptor';
import { ProfessionalNotAllowedInterceptor } from '@common/@errors/interceptors/professional-not-allowed.interceptor';
import { ProfessionalNotFoundInterceptor } from '@common/@errors/interceptors/professional-not-found.interceptor';
import { ProfessionalUnavailableInterceptor } from '@common/@errors/interceptors/professional-unavailable.interceptor';
import { RoomNotFoundInterceptor } from '@common/@errors/interceptors/room-not-found.interceptor';
import { UserAlreadyExistsInterceptor } from '@common/@errors/interceptors/user-already-exists.interceptor';
import { UserNotFoundInterceptor } from '@common/@errors/interceptors/user-not-found.interceptor';
import { TokenExpiredInterceptor } from '@common/@errors/interceptors/token-expired.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(
    new AppointmentAlreadyExistsInterceptor(),
    new IncorrectTypeInterceptor(),
    new InvalidAppointmentTimeInterceptor(),
    new InvalidCredentialsInterceptor(),
    new OutOfOfficeHoursInterceptor(),
    new PatientAlreadyExistsInterceptor(),
    new PatientNotFoundInterceptor(),
    new ProcedureNotFoundInterceptor(),
    new ProfessionalAlreadyExistsInterceptor(),
    new ProfessionalAlreadyRegisteredInThisRoomInterceptor(),
    new ProfessionalNotAllowedInterceptor(),
    new ProfessionalNotFoundInterceptor(),
    new ProfessionalUnavailableInterceptor(),
    new RoomNotFoundInterceptor(),
    new UserAlreadyExistsInterceptor(),
    new UserNotFoundInterceptor(),
    new TokenExpiredInterceptor(),
  );

  await app.listen(3333);
}
bootstrap();
