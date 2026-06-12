import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  /** Turnos disponibles para un perfil en una fecha (público) */
  @Get('slots/:profileId')
  getSlots(
    @Param('profileId') profileId: string,
    @Query('date') date: string,
  ) {
    return this.sessionsService.getSlots(profileId, date);
  }

  /** Reservar sesión (estudiante autenticado) */
  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Req() req: any, @Body() dto: CreateSessionDto) {
    return this.sessionsService.create(req.user.uniqueID, dto);
  }

  /** Mis sesiones como estudiante */
  @Get('my')
  @UseGuards(AuthGuard('jwt'))
  getMyStudentSessions(@Req() req: any) {
    return this.sessionsService.getByStudent(req.user.uniqueID);
  }

  /** Sesiones recibidas como profesor (por profileId) */
  @Get('teacher/:profileId')
  @UseGuards(AuthGuard('jwt'))
  getTeacherSessions(@Param('profileId') profileId: string) {
    return this.sessionsService.getByTeacher(profileId);
  }

  /** Cancelar sesión */
  @Patch(':id/cancel')
  @UseGuards(AuthGuard('jwt'))
  cancel(@Param('id') id: string, @Req() req: any) {
    return this.sessionsService.cancel(id, req.user.uniqueID);
  }
}
