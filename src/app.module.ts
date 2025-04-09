import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './config/jwt.config';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PatientModule } from './patient/patient.module';
import { AddressModule } from './address/address.module';
import { DoctorController } from './doctor/doctor.controller';
import { DoctorService } from './doctor/doctor.service';
import { DoctorModule } from './doctor/doctor.module';

@Module({
  imports: [
    JwtModule.register(jwtConfig),
    PrismaModule,
    UsersModule,
    AuthModule,
    PatientModule,
    AddressModule,
    DoctorModule,
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class AppModule {}
