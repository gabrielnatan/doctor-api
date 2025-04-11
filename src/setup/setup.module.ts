import { Module } from '@nestjs/common';
import { SetupController } from './setup.controller';
import { SetupService } from './setup.service';
import { PrismaModule } from '../prisma/prisma.module';
import { OrganizationModule } from '../organization/organization.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, OrganizationModule, UsersModule],
  controllers: [SetupController],
  providers: [SetupService],
})
export class SetupModule {}
