import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization, Prisma } from '@prisma/client';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateOrganizationDto): Promise<Organization> {
    const { addressId, ...rest } = dto;

    const data: Prisma.OrganizationCreateInput = {
      ...rest,
      ...(addressId && {
        address: {
          connect: { id: addressId },
        },
      }),
    };

    return this.prisma.organization.create({
      data,
    });
  }

  findAll(): Promise<Organization[]> {
    return this.prisma.organization.findMany({
      include: {
        address: true,
        doctors: true,
        services: true,
        products: true,
      },
    });
  }

  async findOne(id: string): Promise<Organization> {
    const org = await this.prisma.organization.findUnique({
      where: { id },
      include: {
        address: true,
        doctors: true,
        services: true,
        products: true,
      },
    });

    if (!org) {
      throw new NotFoundException(`Organization with id ${id} not found`);
    }

    return org;
  }

  update(id: string, dto: UpdateOrganizationDto): Promise<Organization> {
    const { addressId, ...rest } = dto;

    const dataToUpdate: Prisma.OrganizationUpdateInput = {
      ...rest,
      ...(addressId && {
        address: {
          connect: { id: addressId },
        },
      }),
    };

    return this.prisma.organization.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  remove(id: string): Promise<Organization> {
    return this.prisma.organization.delete({
      where: { id },
    });
  }
}
