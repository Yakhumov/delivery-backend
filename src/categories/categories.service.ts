import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { toPublicAssetUrl } from '../common/asset-url';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(parentId?: number) {
    const categories = await this.prisma.category.findMany({
      where: { parentId: parentId ?? null },
    });

    return categories.map((category) => ({
      ...category,
      imageUrl: toPublicAssetUrl(category.imageUrl),
    }));
  }
}
