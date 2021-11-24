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
import { CasualService } from '../services/casual.service';

@Controller('casual')
export class CasualController {
  constructor(private readonly casualService: CasualService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.casualService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('pending')
  findAllNotApprovedRestDays() {
    return this.casualService.findAllNotApprovedRestDays();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findAllRestDays(@Param('id') id: string) {
    return this.casualService.findAllRestDays(id);
  }

  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  createStartAndLastRestDay(
    @Body() createRestday,
    @Param('id') idfrompath: string,
  ) {
    return this.casualService.createStartAndLastRestDay(
      createRestday,
      idfrompath,
    );
  }

  @Put(':id')
  updateStatus(@Body() changeStatus, @Param('id') idfrompath: string) {
    return this.casualService.updateStatus(changeStatus, idfrompath);
  }

  @Delete(':id')
  deleteRestDay(@Body() deleteRest, @Param('id') idfrompath: string) {
    return this.casualService.deleteRestDay(deleteRest, idfrompath);
  }
}
