import { Body, Controller, Post } from '@nestjs/common';
import { SetupService } from './setup.service';
import { CreateOrgWithAdminDto } from './dto/create-org-with-admin.dto';

@Controller('setup')
export class SetupController {
  constructor(private setupService: SetupService) {}

  @Post('organization-with-admin')
  async createOrgWithAdmin(@Body() dto: CreateOrgWithAdminDto) {
    return this.setupService.createOrgWithAdmin(dto);
  }
}
