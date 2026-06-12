import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Availability } from '@prisma/client';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';

@Injectable()
export class AvailabilityService {
  constructor(private readonly prisma: PrismaService) {}

  async getByProfile(profileId: string): Promise<Availability[]> {
    return this.prisma.availability.findMany({
      where: { profile_id: profileId },
    });
  }

  async getById(id: string): Promise<Availability> {
    const item = await this.prisma.availability.findUnique({
      where: { uniqueID: id },
    });
    if (!item) throw new NotFoundException(`Availability ${id} not found`);
    return item;
  }

  async create(data: CreateAvailabilityDto): Promise<Availability> {
    this.validateTimeRange(
      data.start_time,
      data.end_time,
      data.slot_duration_minutes,
    );
    return this.prisma.availability.create({ data });
  }

  async update(id: string, data: UpdateAvailabilityDto): Promise<Availability> {
    const existing = await this.getById(id);
    const start = data.start_time ?? existing.start_time;
    const end = data.end_time ?? existing.end_time;
    const duration =
      data.slot_duration_minutes ?? existing.slot_duration_minutes;
    this.validateTimeRange(start, end, duration);
    return this.prisma.availability.update({ where: { uniqueID: id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    await this.prisma.availability.delete({ where: { uniqueID: id } });
  }

  private validateTimeRange(
    start: string,
    end: string,
    slotMinutes: number,
  ): void {
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    const startMins = sh * 60 + sm;
    const endMins = eh * 60 + em;

    if (endMins <= startMins) {
      throw new BadRequestException('end_time debe ser posterior a start_time');
    }
    if (endMins - startMins < slotMinutes) {
      throw new BadRequestException(
        'El rango de tiempo debe ser al menos igual a slot_duration_minutes',
      );
    }
  }
}
