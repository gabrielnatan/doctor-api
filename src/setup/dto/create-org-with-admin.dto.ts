import { OrganizationType, Role } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateOrgWithAdminDto {
  @IsString()
  name: string;

  @IsString()
  cnpj: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  logoUrl?: string;

  @IsUUID()
  @IsOptional()
  addressId?: string;

  @IsEnum(OrganizationType)
  type: OrganizationType;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  admin_name: string;

  @IsString()
  admin_phone: string;

  @IsEnum(Role)
  role: Role;
}
