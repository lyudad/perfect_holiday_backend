import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entity/Users.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RolesGuard } from 'src/roles/roles.guard';
import { CasualService } from 'src/casual/services/casual.service';
import { Vacations } from 'src/entity/Vacations.entity';

@Module({
  providers: [
    AuthService,
    UsersService,
    CasualService,
    JwtStrategy,
    RolesGuard,
    LocalStrategy,
  ],
  controllers: [AuthController],
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([Users, Vacations]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
