import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './config/jwt.config';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    JwtModule.register(jwtConfig),
    PrismaModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
