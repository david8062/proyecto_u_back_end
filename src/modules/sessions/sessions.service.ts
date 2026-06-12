import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Session, SessionStatus } from '@prisma/client';
import { CreateSessionDto } from './dto/create-session.dto';

export interface TimeSlot {
  start_time: string;
  end_time: string;
  available: boolean;
}

const DAY_INDEX: Record<string, number> = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
};

const sessionIncludes = {
  profile: {
    include: {
      user: {
        select: {
          primer_nombre: true,
          primer_apellido: true,
          email: true,
        },
      },
    },
  },
  availability: true,
};

@Injectable()
export class SessionsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSlots(profileId: string, date: string): Promise<TimeSlot[]> {
    const jsDay = new Date(date + 'T00:00:00').getDay();

    const blocks = await this.prisma.availability.findMany({
      where: { profile_id: profileId, is_active: true },
    });

    const block = blocks.find((b) => DAY_INDEX[b.day_of_week] === jsDay);
    if (!block) return [];

    const bookedSlots = await this.prisma.session.findMany({
      where: {
        profile_id: profileId,
        availability_id: block.uniqueID,
        scheduled_date: date,
        status: { not: SessionStatus.CANCELLED },
      },
      select: { start_time: true },
    });

    const bookedSet = new Set(bookedSlots.map((s) => s.start_time));
    const slots: TimeSlot[] = [];

    const [sh, sm] = block.start_time.split(':').map(Number);
    const [eh, em] = block.end_time.split(':').map(Number);
    const startMins = sh * 60 + sm;
    const endMins = eh * 60 + em;
    const duration = block.slot_duration_minutes;

    for (let cur = startMins; cur + duration <= endMins; cur += duration) {
      const slotStart = this.minsToTime(cur);
      const slotEnd = this.minsToTime(cur + duration);
      slots.push({
        start_time: slotStart,
        end_time: slotEnd,
        available: !bookedSet.has(slotStart),
      });
    }

    return slots;
  }

  async create(studentId: string, dto: CreateSessionDto): Promise<Session> {
    const availability = await this.prisma.availability.findUnique({
      where: { uniqueID: dto.availability_id },
    });
    if (!availability)
      throw new NotFoundException('Bloque de disponibilidad no encontrado');
    if (availability.profile_id !== dto.profile_id) {
      throw new BadRequestException(
        'El bloque no pertenece al perfil indicado',
      );
    }

    const conflict = await this.prisma.session.findFirst({
      where: {
        profile_id: dto.profile_id,
        availability_id: dto.availability_id,
        scheduled_date: dto.scheduled_date,
        start_time: dto.start_time,
        status: { not: SessionStatus.CANCELLED },
      },
    });
    if (conflict)
      throw new BadRequestException('El turno seleccionado ya está reservado');

    const [sh, sm] = dto.start_time.split(':').map(Number);
    const endMins = sh * 60 + sm + availability.slot_duration_minutes;
    const end_time = this.minsToTime(endMins);

    return this.prisma.session.create({
      data: {
        student_id: studentId,
        profile_id: dto.profile_id,
        availability_id: dto.availability_id,
        service_type: dto.service_type,
        scheduled_date: dto.scheduled_date,
        start_time: dto.start_time,
        end_time,
        notes: dto.notes,
      },
      include: sessionIncludes,
    });
  }

  async getByStudent(studentId: string): Promise<Session[]> {
    return this.prisma.session.findMany({
      where: { student_id: studentId },
      include: sessionIncludes,
      orderBy: [{ scheduled_date: 'desc' }, { start_time: 'asc' }],
    });
  }

  async getByTeacher(profileId: string): Promise<Session[]> {
    return this.prisma.session.findMany({
      where: { profile_id: profileId },
      include: {
        student: {
          select: { primer_nombre: true, primer_apellido: true, email: true },
        },
        availability: true,
      },
      orderBy: [{ scheduled_date: 'asc' }, { start_time: 'asc' }],
    });
  }

  async cancel(sessionId: string, userId: string): Promise<Session> {
    const session = await this.prisma.session.findUnique({
      where: { uniqueID: sessionId },
      include: { profile: true },
    });
    if (!session) throw new NotFoundException('Sesión no encontrada');

    const isStudent = session.student_id === userId;
    const isTeacher = session.profile.user_id === userId;
    if (!isStudent && !isTeacher) throw new ForbiddenException('No autorizado');

    if (session.status === SessionStatus.CANCELLED) {
      throw new BadRequestException('La sesión ya está cancelada');
    }

    return this.prisma.session.update({
      where: { uniqueID: sessionId },
      data: { status: SessionStatus.CANCELLED },
      include: sessionIncludes,
    });
  }

  async updateStatus(
    sessionId: string,
    status: SessionStatus,
  ): Promise<Session> {
    const session = await this.prisma.session.findUnique({
      where: { uniqueID: sessionId },
    });
    if (!session) throw new NotFoundException('Sesión no encontrada');
    return this.prisma.session.update({
      where: { uniqueID: sessionId },
      data: { status },
      include: sessionIncludes,
    });
  }

  private minsToTime(mins: number): string {
    const h = Math.floor(mins / 60)
      .toString()
      .padStart(2, '0');
    const m = (mins % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
  }
}
