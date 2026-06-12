import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { PricingPlan } from '@prisma/client';
import { CreatePricingPlanDto } from './dto/create-pricing-plan.dto';
import { UpdatePricingPlanDto } from './dto/update-pricing-plan.dto';

@Injectable()
export class PricingPlansService {
  constructor(private readonly prisma: PrismaService) {}

  async getByProfile(profileId: string): Promise<PricingPlan[]> {
    return this.prisma.pricingPlan.findMany({
      where: { profile_id: profileId },
    });
  }

  async getById(id: string): Promise<PricingPlan> {
    const item = await this.prisma.pricingPlan.findUnique({
      where: { uniqueID: id },
    });
    if (!item) throw new NotFoundException(`PricingPlan ${id} not found`);
    return item;
  }

  async create(data: CreatePricingPlanDto): Promise<PricingPlan> {
    return this.prisma.pricingPlan.create({ data });
  }

  async update(id: string, data: UpdatePricingPlanDto): Promise<PricingPlan> {
    await this.getById(id);
    return this.prisma.pricingPlan.update({ where: { uniqueID: id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    await this.prisma.pricingPlan.delete({ where: { uniqueID: id } });
  }
}
