// src/product/dto/create-product.dto.ts

import { IsString, IsOptional, IsNumber, IsInt, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  price: number;

  @IsInt()
  stock: number;

  @IsString()
  sku: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsUUID()
  organizationId: string;
}
