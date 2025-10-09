import { Controller, Get } from '@nestjs/common';
import { FacultiesService } from './faculties.service';

@Controller('faculties')
export class FacultiesController {
  constructor(private readonly facultiesService: FacultiesService) {}

  @Get() // 👈 Aquí defines la ruta GET /faculties
  async findAll() {
    return this.facultiesService.getAll();
  }
}
