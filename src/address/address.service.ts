import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Address } from '@prisma/client';
import { ErrorMessages } from 'src/common/errors/error-messages';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  create(createAddressDto: CreateAddressDto) {
    return this.prisma.address.create({
      data: createAddressDto,
    });
  }

  findAll() {
    return this.prisma.address.findMany();
  }

  async findOne(id: string): Promise<Address> {
    const address = await this.prisma.address.findUnique({
      where: { id },
    });

    if (!address) {
      throw new NotFoundException(ErrorMessages.ADDRESS.NOT_FOUND(id));
    }

    return address;
  }

  update(id: string, updateAddressDto: UpdateAddressDto) {
    return this.prisma.address.update({
      where: { id },
      data: updateAddressDto,
    });
  }

  remove(id: string) {
    return this.prisma.address.delete({
      where: { id },
    });
  }
}
