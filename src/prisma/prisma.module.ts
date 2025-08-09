import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Esto hace que esté disponible en toda la app sin necesidad de importarlo siempre
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
