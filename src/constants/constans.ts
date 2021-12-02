import { CronOptions } from '@nestjs/schedule';

export enum Roles {
  EMPLOYEE = 'employee',
  ADMIN = 'admin',
  SUPER = 'super',
}
type TNewYearUpdatesDays = {
  QUANTITY_AVAILABLE_VACATION: number;
  QUANTITY_AVAILABLE_SICK_DAYS: number;
  CRON_DATE: string | Date;
  CRON_OPTIONS: CronOptions;
};
export const NewYearUpdatesDays: TNewYearUpdatesDays = {
  QUANTITY_AVAILABLE_VACATION: 15,
  QUANTITY_AVAILABLE_SICK_DAYS: 5,
  CRON_DATE: '0 0 0 1 1 *',
  CRON_OPTIONS: {
    name: 'notifications',
    timeZone: 'Europe/Kiev',
  },
};
