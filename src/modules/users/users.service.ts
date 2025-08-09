import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepository } from './repository/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly prisma: PrismaService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.create({
      primer_nombre: dto.firstName,
      segundo_nombre: dto.middleName,
      primer_apellido: dto.lastName,
      segundo_apellido: dto.secondLastName ?? '',
      cod_estudiante: dto.studentCode,
      email: dto.email,
      has_password: hashedPassword,
      faculty: {
        connect: { uniqueID: dto.facultyId },
      },
      role: {
        connect: { uniqueID: dto.roles },
      },
      passwordReset: dto.passwordResetId
        ? { connect: { uniqueID: dto.passwordResetId } }
        : undefined,
    });

    return user;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.findById(id); // throws if not found

    const data = {
      primer_nombre: dto.firstName,
      segundo_nombre: dto.middleName,
      primer_apellido: dto.lastName,
      segundo_apellido: dto.secondLastName,
      cod_estudiante: dto.studentCode,
      email: dto.email,
      has_password: dto.password,
      faculty_uuid: dto.facultyId,
      id_password_reset: dto.passwordResetId,
    };

    const updatedUser = await this.userRepository.update(id, data);

    // Opcional: actualizar roles

    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    await this.findById(id); // Asegura que el usuario exista
    await this.userRepository.delete(id);
  }
}
