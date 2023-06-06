import { UsersRepository } from '@application/repositories/users-repository';
import { User } from '@prisma/client';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from '@common/@errors/types/user-already-exists-error';
import { IncorrectTypeError } from '@common/@errors/types/incorrect-type-error';
import { ProfessionalNotFoundError } from '@common/@errors/types/professional-not-found-error';
import { PatientNotFoundError } from '@common/@errors/types/patient-not-found-error';
import { ProfessionalsRepository } from '@application/repositories/professionals-repository';
import { PatientsRepository } from '@application/repositories/patients-repository';
import { Injectable } from '@nestjs/common';

interface RegisterUserUseCaseRequest {
  username: string;
  email: string;
  password: string;
  type: string;
  professionalId?: string | null;
  patientId?: string | null;
}

interface RegisterUserUseCaseResponse {
  user: User;
}

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private professionalsRepository: ProfessionalsRepository,
    private patientsRepository: PatientsRepository,
  ) {}

  async execute({
    username,
    email,
    password,
    type,
    professionalId,
    patientId,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const createdProfessionalId = professionalId ?? null;
    const createdPatientId = patientId ?? null;

    let professional;

    if (createdProfessionalId) {
      professional = await this.professionalsRepository.findById(
        createdProfessionalId,
      );
    }

    let patient;
    if (createdPatientId) {
      patient = await this.patientsRepository.findById(createdPatientId);
    }

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    if (type !== 'patient' && type !== 'professional') {
      throw new IncorrectTypeError();
    }

    if (type === 'professional' && createdProfessionalId === null) {
      throw new ProfessionalNotFoundError();
    }

    if (type === 'patient' && createdPatientId === null) {
      throw new PatientNotFoundError();
    }

    if (type === 'professional') {
      const user = await this.usersRepository.create({
        name: professional?.name ?? username,
        email,
        password_hash,
        type,
        professional_id: professionalId,
      });

      return {
        user,
      };
    }

    const user = await this.usersRepository.create({
      name: patient?.name ?? username,
      email,
      password_hash,
      type,
      patient_id: patientId,
    });

    return {
      user,
    };
  }
}
