import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { CountriesModule } from './countries/countries.module';
import { AddressesModule } from './addresses/addresses.module';
import { CategoriesModule } from './categories/categories.module';
import { VariationsModule } from './variations/variations.module';
import { VariationItemsModule } from './variation-items/variation-items.module';
import { ProductsModule } from './products/products.module';
import { ProductItemsModule } from './product-items/product-items.module';
import { PromotionsModule } from './promotions/promotions.module';
import { CartItemsModule } from './cart-items/cart-items.module';
import { ShippingMethodsModule } from './shipping-methods/shipping-methods.module';
import { OrdersModule } from './orders/orders.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        namingStrategy: new SnakeNamingStrategy(),
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    AuthModule,
    UsersModule,
    CountriesModule,
    AddressesModule,
    CategoriesModule,
    VariationsModule,
    VariationItemsModule,
    ProductsModule,
    ProductItemsModule,
    PromotionsModule,
    CartItemsModule,
    ShippingMethodsModule,
    OrdersModule,
    ReviewsModule,
    UploadsModule,
  ],
})
export class AppModule {}
