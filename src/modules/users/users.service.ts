import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepository } from './repository/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

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
    const data = {
      primer_nombre: dto.firstName,
      segundo_nombre: dto.middleName,
      primer_apellido: dto.lastName,
      segundo_apellido: dto.secondLastName,
      cod_estudiante: dto.studentCode,
      email: dto.email,
      has_password: dto.password,
      faculty_uuid: dto.facultyId,
      user_rol_id: dto.userRoleId,
      id_password_reset: dto.passwordResetId,
    };

    return this.userRepository.create(data);
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
      user_rol_id: dto.userRoleId,
      id_password_reset: dto.passwordResetId,
    };

    return this.userRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    return this.userRepository.delete(id);
  }
}
