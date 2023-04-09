import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'e-commerce-db',
      autoLoadEntities: true,
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
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
  ],
})
export class AppModule {}
