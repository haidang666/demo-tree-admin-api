import { IsNotEmpty, IsString } from 'class-validator';

export default class CreateTagDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}
