import { IBaseService } from '@/common/base/base.service.interface';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Faculty } from '@prisma/client';

@Injectable()
export class FacultiesService implements IBaseService<Faculty> {
    
    constructor(private readonly prisma: PrismaService) {}
    getById(id: string | number): Promise<{ uniqueID: string; faculty_name: string; } | null> {
        throw new Error('Method not implemented.');
    }
    create(data: unknown): Promise<{ uniqueID: string; faculty_name: string; }> {
        throw new Error('Method not implemented.');
    }
    update(id: string | number, data: unknown): Promise<{ uniqueID: string; faculty_name: string; }> {
        throw new Error('Method not implemented.');
    }
    delete(id: string | number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
    async getAll(): Promise<Faculty[]> {
     return this.prisma.faculty.findMany();
    }
}
