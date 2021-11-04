import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CasualModule } from './casual/casual.module';
@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, AuthModule, CasualModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
