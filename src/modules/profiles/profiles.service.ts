import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { IBaseService } from '@/common/base/base.service.interface';
import { PrismaService } from '@/prisma/prisma.service';
import { Profile } from '@prisma/client';

@Injectable()
export class ProfilesService implements IBaseService<Profile> {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Profile[]> {
    return this.prisma.profile.findMany();
  }

  async getById(id: string): Promise<Profile> {
    const profile = await this.prisma.profile.findUnique({
      where: { UniqueID: id },
    });

    if (!profile) {
      throw new NotFoundException(`Profile with id ${id} not found`);
    }

    return profile;
  }

  async create(data: CreateProfileDto): Promise<Profile> {
    return this.prisma.profile.create({
      data,
    });
  }

  async update(id: string, data: UpdateProfileDto): Promise<Profile> {
    const existingProfile = await this.prisma.profile.findUnique({
      where: { UniqueID: id },
    });

    if (!existingProfile) {
      throw new NotFoundException(`Profile with id ${id} not found`);
    }

    return this.prisma.profile.update({
      where: { UniqueID: id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    const existingProfile = await this.prisma.profile.findUnique({
      where: { UniqueID: id },
    });

    if (!existingProfile) {
      throw new NotFoundException(`Profile with id ${id} not found`);
    }

    await this.prisma.profile.delete({
      where: { UniqueID: id },
    });
  }
}
