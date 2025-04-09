import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { Doctor, Prisma } from '@prisma/client';
import { ErrorMessages } from 'src/common/errors/error-messages';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const { userId, crm, specialtyId, bio, photoUrl, address } =
      createDoctorDto;

    const createdAddress = await this.prisma.address.create({
      data: {
        street: address.street,
        number: address.number,
        complement: address.complement,
        district: address.district,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        country: address.country ?? 'Brazil',
      },
    });

    return this.prisma.doctor.create({
      data: {
        userId,
        crm,
        specialtyId,
        bio,
        photoUrl,
        addressId: createdAddress.id,
      },
    });
  }

  async findAll(): Promise<Doctor[]> {
    return this.prisma.doctor.findMany({
      include: {
        address: true,
        specialty: true,
        user: true,
      },
    });
  }

  async findOne(id: string): Promise<Doctor> {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id },
      include: {
        address: true,
        specialty: true,
        user: true,
      },
    });

    if (!doctor) {
      throw new NotFoundException(ErrorMessages.DOCTOR.NOT_FOUND);
    }

    return doctor;
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    const { address, ...doctorData } = updateDoctorDto;

    const dataToUpdate: Prisma.DoctorUpdateInput = {
      ...doctorData,
      ...(address && {
        address: {
          update: {
            ...address,
          },
        },
      }),
    };

    return this.prisma.doctor.update({
      where: { id },
      data: dataToUpdate,
      include: {
        address: true,
        user: true,
        specialty: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.doctor.delete({
      where: { id },
    });
  }
}
