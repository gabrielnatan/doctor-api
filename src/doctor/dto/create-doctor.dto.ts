import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';

export class CreateDoctorDto {
  @IsString()
  userId: string;

  @IsString()
  crm: string;

  @IsString()
  specialtyId: string;

  @IsString()
  bio: string;

  @IsString()
  photoUrl: string;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
