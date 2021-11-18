import { ApiProperty } from '@nestjs/swagger';

export class UpdateIsBlockDto {
  @ApiProperty()
  is_block: boolean;
}
