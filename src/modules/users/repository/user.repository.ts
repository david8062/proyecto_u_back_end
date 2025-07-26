import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { IBaseRepository } from '@/common/base/base.repository.interface';

@Injectable()
export class UserRepository implements IBaseRepository<User> {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { uniqueID: id },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({ data });
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return await this.prisma.user.update({
      where: { uniqueID: id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { uniqueID: id },
    });
  }
}
