import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { passportConfig } from 'src/config/passport.config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register(passportConfig),
    JwtModule.register(jwtConfig),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  exports: [JwtStrategy, PassportModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
