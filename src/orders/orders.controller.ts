import { Controller, Get, Post, Patch, Body, Param, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private service: OrdersService) {}

  @Post()
  create(@Body() body: {
    name: string;
    phone: string;
    address: string;
    items: { productId: number; quantity: number }[];
  }) {
    return this.service.create(body);
  }

  @Get()
  findByPhone(@Query('phone') phone: string) {
    return this.service.findByPhone(phone);
  }

  @Patch(':id')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.service.updateStatus(Number(id), status);
  }
}
