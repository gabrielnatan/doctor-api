import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateServiceDto) {
    return this.prisma.service.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.service.findMany({
      include: { organization: true },
    });
  }

  async findOne(id: string) {
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: { organization: true },
    });

    if (!service) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }

    return service;
  }

  update(id: string, dto: UpdateServiceDto) {
    return this.prisma.service.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.service.delete({
      where: { id },
    });
  }
}
