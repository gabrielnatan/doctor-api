import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrgWithAdminDto } from './dto/create-org-with-admin.dto';
import { OrganizationService } from '../organization/organization.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class SetupService {
  constructor(
    private prisma: PrismaService,
    private organizationService: OrganizationService,
    private usersService: UsersService,
  ) {}

  async createOrgWithAdmin(dto: CreateOrgWithAdminDto) {
    return this.prisma.$transaction(async () => {
      const org = await this.organizationService.create({
        name: dto.name,
        cnpj: dto.cnpj,
        type: dto.type,
      });

      const user = await this.usersService.create({
        email: dto.email,
        name: dto.admin_name,
        password: dto.password,
        phone: dto.admin_phone,
        role: dto.role,
        organizationId: org.id,
      });

      return { org, user };
    });
  }
}
