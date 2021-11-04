import { Module } from '@nestjs/common';
import { CasualService } from './services/casual.service';
import { CasualController } from './controllers/casual.controller';

@Module({
  providers: [CasualService],
  controllers: [CasualController]
})
export class CasualModule {}
