import { Test, TestingModule } from '@nestjs/testing';
import { FacultiesService } from './faculties.service';
import { PrismaService } from '@/prisma/prisma.service';

describe('FacultiesService', () => {
  let service: FacultiesService;

  const prismaMock = {
    faculty: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FacultiesService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<FacultiesService>(FacultiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
