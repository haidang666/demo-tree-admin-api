import { ResourceType } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class CreateResourceDTO {
  @IsString()
  @IsNotEmpty()
  resource_id: string;

  @IsEnum(ResourceType)
  type: ResourceType;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  parent_resource_id?: number;

  @IsBoolean()
  @IsOptional()
  is_thumbnail: boolean;
}
