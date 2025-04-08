import { IsString, IsDateString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';

export class CreatePatientDto {
  @IsString()
  userId: string;

  @IsString()
  cpf: string;

  @IsDateString()
  birthDate: Date;

  @IsString()
  gender: string;

  @IsString()
  bloodType: string;

  @IsString()
  photoUrl: string;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
