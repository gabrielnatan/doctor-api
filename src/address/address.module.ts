import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AddressController } from './address.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
