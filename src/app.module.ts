import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [
    PrismaModule,
    CategoriesModule,
    ProductsModule,
    OrdersModule,
    BotModule,
    AuthModule,
  ],
})
export class AppModule {}