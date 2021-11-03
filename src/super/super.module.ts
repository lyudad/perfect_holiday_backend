import { Module } from '@nestjs/common';
import { SuperService } from './services/super.service';
import { SuperController } from './controllers/super.controller';

@Module({
  providers: [SuperService],
  controllers: [SuperController]
})
export class SuperModule {}
