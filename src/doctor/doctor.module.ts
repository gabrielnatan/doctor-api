import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DoctorController],
  providers: [DoctorService],
  exports: [DoctorService], // opcional, caso outros módulos precisem
})
export class DoctorModule {}
