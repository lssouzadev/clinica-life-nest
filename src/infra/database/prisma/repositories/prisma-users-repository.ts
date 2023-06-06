import { Prisma, User } from '@prisma/client';
import { UsersRepository } from '@application/repositories/users-repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = await this.prisma.user.create({
      data,
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async save(data: User) {
    const user = await this.prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    });

    return user;
  }
}
