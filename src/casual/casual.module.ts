import { forwardRef, Module } from '@nestjs/common';
import { CasualService } from './services/casual.service';
import { CasualController } from './controllers/casual.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacations } from 'src/entity/Vacations.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vacations]),
    forwardRef(() => AuthModule),
  ],
  providers: [CasualService],
  controllers: [CasualController],
  exports: [CasualService],
})
export class CasualModule {}
