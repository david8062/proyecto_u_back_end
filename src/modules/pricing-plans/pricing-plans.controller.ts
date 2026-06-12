import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PricingPlansService } from './pricing-plans.service';
import { CreatePricingPlanDto } from './dto/create-pricing-plan.dto';
import { UpdatePricingPlanDto } from './dto/update-pricing-plan.dto';
import { PricingPlan } from '@prisma/client';

@Controller('pricing-plans')
export class PricingPlansController {
  constructor(private readonly pricingPlansService: PricingPlansService) {}

  @Post()
  async create(@Body() dto: CreatePricingPlanDto): Promise<PricingPlan> {
    return this.pricingPlansService.create(dto);
  }

  @Get('profile/:profileId')
  async findByProfile(@Param('profileId') profileId: string): Promise<PricingPlan[]> {
    return this.pricingPlansService.getByProfile(profileId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PricingPlan> {
    return this.pricingPlansService.getById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePricingPlanDto): Promise<PricingPlan> {
    return this.pricingPlansService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.pricingPlansService.delete(id);
    return { message: `PricingPlan ${id} deleted` };
  }
}
