import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NewYearUpdatesDays } from 'src/constants/constans';
import { getConnection, UpdateResult } from 'typeorm';

@Injectable()
export class CronjobService {
  @Cron(NewYearUpdatesDays.CRON_DATE, NewYearUpdatesDays.CRON_OPTIONS)
  handleCron(): void {
    this.toUpdateNewYearRestDays();
  }
  toUpdateNewYearRestDays(): Promise<UpdateResult> {
    return getConnection()
      .createQueryBuilder()
      .update('users')
      .set({
        available_vacation: () =>
          `available_vacation + ${NewYearUpdatesDays.QUANTITY_AVAILABLE_VACATION}`,
        available_sick_days: () =>
          `available_sick_days - ${NewYearUpdatesDays.QUANTITY_AVAILABLE_SICK_DAYS}`,
      })
      .execute();
  }
}
