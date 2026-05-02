import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(body: {
    name: string;
    phone: string;
    address: string;
    items: { productId: number; quantity: number }[];
  }) {
    const { name, address, items } = body;

    if (!name || !body.phone || !items || items.length === 0) {
      throw new BadRequestException('name, phone and items are required');
    }

    const phone = normalizePhone(body.phone);

    const orderItems = await Promise.all(
      items.map(async (item) => {
        const product = await this.prisma.product.findUnique({
          where: { id: item.productId },
        });
        if (!product) {
          throw new NotFoundException(`Product ${item.productId} not found`);
        }
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        };
      }),
    );

    return this.prisma.order.create({
      data: {
        name,
        phone,
        address,
        items: { create: orderItems },
      },
      include: { items: { include: { product: true } } },
    });
  }

  findByPhone(rawPhone: string) {
    const phone = normalizePhone(rawPhone);
    return this.prisma.order.findMany({
      where: { phone },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(id: number, status: string) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');

    return this.prisma.order.update({
      where: { id },
      data: { status },
    });
  }
}
