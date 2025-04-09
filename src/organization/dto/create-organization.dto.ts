import { OrganizationType } from '@prisma/client';
import { IsString, IsOptional, IsUUID, IsEnum } from 'class-validator';

export class CreateOrganizationDto {
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
}
