import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { UpdateCategoriesDto } from './dto/update.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll() {
    return this.categoriesService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoriesService.getById(+id);
    if (!category) throw new Error('category not found');
    return category;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() UpdateCategoriesDto: UpdateCategoriesDto,
  ) {
    const updateCategory = await this.categoriesService.update(
      +id,
      UpdateCategoriesDto,
    );
    if (!updateCategory) throw new Error('category not found');
    return updateCategory;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.categoriesService.delete(id);
    return null;
  }
}
