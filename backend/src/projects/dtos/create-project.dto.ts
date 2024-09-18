import { Optional } from '@nestjs/common';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class GroupWithTags {
  @IsNumber()
  @IsNotEmpty()
  group_id: number;

  @IsArray()
  @IsNumber({}, { each: true })
  tag_ids: number[];
}

class CreateProjectDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  start_date: string;

  @IsString()
  @IsNotEmpty()
  folder_id: string;

  @Optional()
  @IsString()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => GroupWithTags)
  groups_tags: GroupWithTags[];
}

export default CreateProjectDTO;
