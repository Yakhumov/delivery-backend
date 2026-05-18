import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  findAll(parentId?: number) {
    return this.prisma.category.findMany({
      where: { parentId: parentId ?? null },
    });
  }
}
