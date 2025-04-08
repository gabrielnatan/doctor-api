import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsPostalCode,
} from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsString()
  @IsOptional()
  complement?: string;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsPostalCode('BR')
  zipCode: string;

  @IsString()
  @IsOptional()
  country?: string = 'Brazil';
}
