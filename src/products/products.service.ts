import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { toPublicAssetUrl } from '../common/asset-url';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(categoryId?: number) {
    const products = await this.prisma.product.findMany({
      where: categoryId ? { categoryId } : undefined,
      include: { category: true },
      orderBy: { id: 'asc' },
    });

    return products.map((product) => ({
      ...product,
      imageUrl: toPublicAssetUrl(product.imageUrl),
      category: {
        ...product.category,
        imageUrl: toPublicAssetUrl(product.category.imageUrl),
      },
    }));
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return {
      ...product,
      imageUrl: toPublicAssetUrl(product.imageUrl),
      category: {
        ...product.category,
        imageUrl: toPublicAssetUrl(product.category.imageUrl),
      },
    };
  }
}
