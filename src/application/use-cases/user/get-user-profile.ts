import { User } from '@prisma/client';
import { UsersRepository } from '@application/repositories/users-repository';
import { UserNotFoundError } from '@common/@errors/types/user-not-found-error';
import { Injectable } from '@nestjs/common';

interface GetUserProfileUseCaseRequest {
  userId: string;
}

interface GetUserProfileUseCaseResponse {
  user: User;
}

@Injectable()
export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    return {
      user,
    };
  }
}
