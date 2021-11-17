import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entity/Users.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Vacations } from 'src/entity/Vacations.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Vacations]),
    forwardRef(() => AuthModule),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
