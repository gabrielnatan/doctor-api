import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsEnum(Role)
  role: Role;

  @IsOptional()
  @IsUUID()
  organizationId?: string;
}
