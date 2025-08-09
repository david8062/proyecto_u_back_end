import { TagModule } from './modules/tag/tag.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [TagModule, UsersModule, AuthModule, PrismaModule],
})
export class AppModule {}
