import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { MailModule } from '../mail/mail.module';

@Module({
  providers: [AuthService, UsersService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    MailModule
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
