import { Prisma, User } from '@prisma/client';
import { UsersRepository } from 'src/@types/repositories/users-repository';
import { randomUUID } from 'crypto';

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async create(data: Prisma.UserUncheckedCreateInput) {
    if (data.type === 'professional') {
      const user = {
        id: data.id ?? randomUUID(),
        name: data.name,
        email: data.email,
        password_hash: data.password_hash,
        created_at: new Date(),
        type: data.type,
        patient_id: null,
        professional_id: data.professional_id || null,
      };

      this.items.push(user);

      return user;
    }

    const user = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
      type: data.type,
      professional_id: null,
      patient_id: data.patient_id || null,
    };

    this.items.push(user);

    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async save(user: User) {
    const userIndex = this.items.findIndex((item) => item.id === user.id);

    if (userIndex >= 0) {
      this.items[userIndex] = user;
    }

    return user;
  }
}
