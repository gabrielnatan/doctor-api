import { IsString, IsOptional, IsNumber, IsInt, IsUUID } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  price: number;

  @IsInt()
  duration: number;

  @IsUUID()
  organizationId: string;
}
