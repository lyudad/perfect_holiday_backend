import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, AuthModule, ProfileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
