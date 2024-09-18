import { Optional } from '@nestjs/common';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

class UpdateProjectDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Optional()
  @IsString()
  description?: string;

  @IsBoolean()
  is_show: boolean;
}

export default UpdateProjectDTO;
