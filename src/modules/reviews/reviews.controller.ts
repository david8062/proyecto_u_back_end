import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ResponseInterceptor } from '@/common/interceptors/response.interceptor';

@UseInterceptors(ResponseInterceptor)
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  async findAll() {
    return this.reviewsService.getAll(); // ✅ devuelve arreglo de reviews
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const review = await this.reviewsService.getById(id);
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return review; // ✅ devuelve un review
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewsService.create(dto); // ✅ devuelve el objeto creado
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    const updatedReview = await this.reviewsService.update(id, updateReviewDto);
    if (!updatedReview) {
      throw new NotFoundException('Review not found');
    }
    return updatedReview; // ✅ devuelve el objeto actualizado
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.reviewsService.delete(id);
    return { deleted: true }; // ✅ opcional: puedes devolver null o un flag
  }
}
