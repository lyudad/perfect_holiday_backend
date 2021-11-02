import { Module } from '@nestjs/common';
import { CalendarService } from './services/calendar.service';
import { CalendarController } from './controllers/calendar.controller';

@Module({
  providers: [CalendarService],
  controllers: [CalendarController]
})
export class CalendarModule {}
