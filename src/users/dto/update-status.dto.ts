import { StatusVacationType } from 'src/entity/Vacations.entity';
import { IsNotEmpty } from 'class-validator';

export class UpdateStatusDto {
  @IsNotEmpty()
  status: StatusVacationType;
}
