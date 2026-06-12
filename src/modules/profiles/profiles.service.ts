import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { IBaseService } from '@/common/base/base.service.interface';
import { PrismaService } from '@/prisma/prisma.service';
import { Profile } from '@prisma/client';

const profileIncludes = {
  user: { select: { primer_nombre: true, primer_apellido: true, email: true } },
  education: true,
  subjects: { include: { category: true } },
  pricingPlans: { where: { is_active: true } },
  availability: { where: { is_active: true } },
};

@Injectable()
export class ProfilesService implements IBaseService<Profile> {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(categoryId?: string): Promise<Profile[]> {
    const where: any = { is_active: true };

    if (categoryId) {
      where.subjects = { some: { category_id: categoryId } };
    }

    return this.prisma.profile.findMany({ where, include: profileIncludes });
  }

  async getById(id: string): Promise<Profile> {
    const profile = await this.prisma.profile.findUnique({
      where: { UniqueID: id },
      include: profileIncludes,
    });

    if (!profile) throw new NotFoundException(`Profile ${id} not found`);
    return profile;
  }

  async getByUserId(userId: string): Promise<Profile> {
    const profile = await this.prisma.profile.findFirst({
      where: { user_id: userId },
      include: profileIncludes,
    });

    if (!profile) throw new NotFoundException(`Profile for user ${userId} not found`);
    return profile;
  }

  async create(data: CreateProfileDto): Promise<Profile> {
    return this.prisma.profile.create({ data });
  }

  async update(id: string, data: UpdateProfileDto): Promise<Profile> {
    const existing = await this.prisma.profile.findUnique({ where: { UniqueID: id } });
    if (!existing) throw new NotFoundException(`Profile ${id} not found`);
    return this.prisma.profile.update({
      where: { UniqueID: id },
      data,
      include: profileIncludes,
    });
  }

  async delete(id: string): Promise<void> {
    const existing = await this.prisma.profile.findUnique({ where: { UniqueID: id } });
    if (!existing) throw new NotFoundException(`Profile ${id} not found`);
    await this.prisma.profile.delete({ where: { UniqueID: id } });
  }
}
