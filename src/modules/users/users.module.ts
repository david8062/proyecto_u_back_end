import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '@/prisma/prisma.service';
import { UserRepository } from './repository/user.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository, PrismaService],
  exports: [UserRepository],
})
export class UsersModule {}
