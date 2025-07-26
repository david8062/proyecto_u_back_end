import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '@/prisma/prisma.service';
import { UserRepository } from './repository/user.repository';

@Module({
  controllers: [UsersController], // ✅ solo controladores
  providers: [UsersService, UserRepository, PrismaService], // ✅ aquí van los servicios y repositorios
  exports: [UserRepository], // si necesitas usarlo fuera
})
export class UsersModule {}
