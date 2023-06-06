import { Patient } from '@prisma/client';
import { PatientsRepository } from '@application/repositories/patients-repository';
import { PatientAlreadyExistsError } from '@common/@errors/types/patient-already-exists-error';
import { Injectable } from '@nestjs/common';

interface RegisterPatientUseCaseRequest {
  name: string;
  cpf: string;
  phone: string;
  birthday: string;
}

interface RegisterPatientUseCaseResponse {
  patient: Patient;
}

@Injectable()
export class RegisterPatientUseCase {
  constructor(private patientsRepository: PatientsRepository) {}

  async execute({
    name,
    cpf,
    phone,
    birthday,
  }: RegisterPatientUseCaseRequest): Promise<RegisterPatientUseCaseResponse> {
    const patientWithSameCpf = await this.patientsRepository.findByDocument(
      cpf,
    );

    if (patientWithSameCpf) {
      throw new PatientAlreadyExistsError();
    }

    const patient = await this.patientsRepository.create({
      name,
      cpf,
      phone,
      birthday,
    });

    return {
      patient,
    };
  }
}
