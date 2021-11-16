import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategies/guards/jwt-auth.guard';
import { Vacations } from 'src/entity/Vacations.entity';
import { CasualService } from '../services/casual.service';

@Controller('casual')
export class CasualController {
  constructor(private readonly casualService: CasualService) {}

  //  GET  /casual   Находит все отпуска работкиков
  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Vacations[]> {
    return this.casualService.findAll();
  }

  // GET   /casual/id   Находит все выходные пользователя по его id
  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  findAllRestDays(@Param('id') id: string): Promise<Vacations> {
    return this.casualService.findAllRestDays(id);
  }

  // POST /casual/id Создает начальный день, конечный день и тип отпуска
  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(
    @Body() createRestday,
    @Param('id') idfrompath: string,
  ): Promise<Vacations> {
    return this.casualService.create(createRestday, idfrompath);
  }

  // PUT /casual/id Подтверждаем или отклоняем отпуск (Меняет поле STATUS   approve | pending)
  @Put(':id')
  updateStatus(
    @Body() changeStatus,
    @Param('id') idfrompath: string,
  ): Promise<Vacations> {
    return this.casualService.updateStatus(changeStatus, idfrompath);
  }

  // DELETE  /casual/id   Удаляет забронированый отпуск с таблицы по id vacations
  @Delete(':id')
  deleteRestDay(
    @Body() deleteRest,
    @Param('id') idfrompath: string,
  ): Promise<Vacations> {
    return this.casualService.deleteRestDay(deleteRest, idfrompath);
  }
}
