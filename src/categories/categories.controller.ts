import { Controller, Get, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private service: CategoriesService) {}

  @Get()
  findAll(@Query('parentId') parentId?: string) {
    return this.service.findAll(parentId ? Number(parentId) : undefined);
  }
}
