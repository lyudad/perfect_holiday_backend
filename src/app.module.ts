import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CasualModule } from './casual/casual.module';
import { Users } from './users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: Number(process.env.SQL_PORT),
      username: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DB,
      entities: [Users],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    CasualModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
