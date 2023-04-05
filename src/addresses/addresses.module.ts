import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import { AddressEntity } from './entities/address.entity';
import { CountriesModule } from 'src/countries/countries.module';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity]), CountriesModule],
  controllers: [AddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}
