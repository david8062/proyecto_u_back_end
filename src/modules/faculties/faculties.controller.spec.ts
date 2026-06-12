import { Test, TestingModule } from '@nestjs/testing';
import { FacultiesController } from './faculties.controller';
import { FacultiesService } from './faculties.service';

describe('FacultiesController', () => {
  let controller: FacultiesController;

  const serviceMock = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacultiesController],
      providers: [{ provide: FacultiesService, useValue: serviceMock }],
    }).compile();

    controller = module.get<FacultiesController>(FacultiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
