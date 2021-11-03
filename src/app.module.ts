import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { CalendarModule } from './calendar/calendar.module';
import { EmployeeModule } from './employee/employee.module';
import { AdminModule } from './admin/admin.module';
import { SuperModule } from './super/super.module';
@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, AuthModule, ProfileModule, CalendarModule, EmployeeModule, AdminModule, SuperModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
