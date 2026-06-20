import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  findAll(categoryId?: number) {
    return this.prisma.product.findMany({
      where: categoryId ? { categoryId } : undefined,
      include: { category: true },
    });
  }
  
}
