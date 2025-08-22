import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma, Review } from '@prisma/client';
import { IBaseService } from '@/common/base/base.service.interface';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService
  implements IBaseService<Review, CreateReviewDto, UpdateReviewDto>
{
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Review[]> {
    return this.prisma.review.findMany();
  }

  async getById(id: string | number): Promise<Review | null> {
    return this.prisma.review.findUnique({
      where: { uniqueID: String(id) },
    });
  }

  async create(data: CreateReviewDto): Promise<Review> {
    try {
      return await this.prisma.review.create({
        data,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create review: ${error.message}`);
      }
      throw new Error('Failed to create review: Unknown error');
    }
  }

  async update(id: string | number, data: UpdateReviewDto): Promise<Review> {
    return this.prisma.review.update({
      where: { uniqueID: String(id) },
      data,
    });
  }

  async delete(id: string | number): Promise<void> {
    try {
      await this.prisma.review.delete({
        where: { uniqueID: String(id) },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Review not found');
      }
      throw error;
    }
  }
}
