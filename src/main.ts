import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import * as interceptor from '@common/@errors/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://clinica-life-next.onrender.com',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(
    new interceptor.AppointmentAlreadyExistsInterceptor(),
    new interceptor.IncorrectTypeInterceptor(),
    new interceptor.InvalidAppointmentTimeInterceptor(),
    new interceptor.InvalidCredentialsInterceptor(),
    new interceptor.OutOfOfficeHoursInterceptor(),
    new interceptor.PatientAlreadyExistsInterceptor(),
    new interceptor.PatientNotFoundInterceptor(),
    new interceptor.ProcedureNotFoundInterceptor(),
    new interceptor.ProfessionalAlreadyExistsInterceptor(),
    new interceptor.ProfessionalAlreadyRegisteredInThisRoomInterceptor(),
    new interceptor.ProfessionalNotAllowedInterceptor(),
    new interceptor.ProfessionalNotFoundInterceptor(),
    new interceptor.ProfessionalUnavailableInterceptor(),
    new interceptor.RoomNotFoundInterceptor(),
    new interceptor.UserAlreadyExistsInterceptor(),
    new interceptor.UserNotFoundInterceptor(),
    new interceptor.TokenExpiredInterceptor(),
  );

  await app.listen(3333);
}
bootstrap();
