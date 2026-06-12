import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { Availability } from '@prisma/client';

@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Post()
  async create(@Body() dto: CreateAvailabilityDto): Promise<Availability> {
    return this.availabilityService.create(dto);
  }

  @Get('profile/:profileId')
  async findByProfile(@Param('profileId') profileId: string): Promise<Availability[]> {
    return this.availabilityService.getByProfile(profileId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Availability> {
    return this.availabilityService.getById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateAvailabilityDto): Promise<Availability> {
    return this.availabilityService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.availabilityService.delete(id);
    return { message: `Availability ${id} deleted` };
  }
}
