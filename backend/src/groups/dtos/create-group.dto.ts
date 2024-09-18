import { IsNotEmpty, IsString } from 'class-validator';

export default class CreateGroupDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}
