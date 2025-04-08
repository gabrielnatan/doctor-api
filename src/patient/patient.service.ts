import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Patient, Prisma } from '@prisma/client';
import { ErrorMessages } from 'src/common/errors/error-messages';
import { UpdatePatientDto } from './dto/update-pacient.dto';

@Injectable()
export class PatientService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPatientDto: CreatePatientDto) {
    const { birthDate, bloodType, cpf, gender, photoUrl, userId, address } =
      createPatientDto;

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

    return this.prisma.patient.create({
      data: {
        birthDate,
        bloodType,
        cpf,
        gender,
        photoUrl,
        userId,
        addressId: createdAddress.id,
      },
    });
  }

  async findAll() {
    return await this.prisma.patient.findMany();
  }

  async findOne(id: string): Promise<Patient> {
    const patient = await this.prisma.patient.findFirst({
      where: { id },
    });

    if (!patient) {
      throw new NotFoundException(ErrorMessages.USER.NOT_FOUND(id));
    }

    return patient;
  }

  async findByEmail(email: string) {
    return await this.prisma.patient.findFirst({
      where: {
        user: {
          email,
        },
      },
    });
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    const { address, ...patientData } = updatePatientDto;

    const dataToUpdate: Prisma.PatientUpdateInput = {
      ...patientData,
      ...(address && {
        address: {
          update: { ...address },
        },
      }),
    };

    return this.prisma.patient.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  async remove(id: string) {
    return await this.prisma.patient.delete({
      where: { id },
    });
  }
}
