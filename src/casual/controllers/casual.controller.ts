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
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { CasualService } from '../services/casual.service';

@Controller('casual')
export class CasualController {
  constructor(private readonly casualService: CasualService) {}

  @Roles(Role.Admin, Role.SuperAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.casualService.findAll();
  }

  @Roles(Role.Admin, Role.SuperAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('pending')
  findAllNotApprovedRestDays() {
    return this.casualService.findAllNotApprovedRestDays();
  }

  @Roles(Role.Employee, Role.Admin, Role.SuperAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findAllRestDays(@Param('id') id: string) {
    return this.casualService.findAllRestDays(id);
  }

  @Roles(Role.Employee)
  @UseGuards(JwtAuthGuard, RolesGuard)
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

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put()
  updateStatus(@Body() changeStatus) {
    return this.casualService.updateStatus(changeStatus);
  }

  @Roles(Role.Admin, Role.SuperAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('editing')
  updateRestDays(@Body() updateDays) {
    return this.casualService.updateRestDays(updateDays);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  deleteRestDay(@Body() deleteRest, @Param('id') idfrompath: string) {
    return this.casualService.deleteRestDay(deleteRest, idfrompath);
  }

  roles: Role[];
}
