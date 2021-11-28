import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CasualModule } from './casual/casual.module';
import { Users } from './entity/Users.entity';
import { ConfigModule } from '@nestjs/config';
import { Vacations } from './entity/Vacations.entity';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Users, Vacations],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    CasualModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
