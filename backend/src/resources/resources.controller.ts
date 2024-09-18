import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ResourcesService } from './resources.service';
import CreateResourceDTO from './dtos/create-resource.dto';
import ResponseHelpers from 'src/helpers/response.helper';
import { StatusCodes } from 'src/consts/statusCodes';
import { Response } from 'express';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get('/:id')
  async getResourceById(@Param() params: { id: string }, @Res() res: Response) {
    const resource = await this.resourcesService.getResourceById(
      parseInt(params.id)
    );
    const response = new ResponseHelpers(res);
    if (!resource) {
      response
        .status(StatusCodes.NOT_FOUND)
        .error('There is no resource with that id');
      return;
    }
    response.status(StatusCodes.OK).success(resource);
  }

  @Post('')
  async create(@Body() input: CreateResourceDTO, @Res() res: Response) {
    console.log({ input });
    const createResourceRes = await this.resourcesService.create(input);
    const response = new ResponseHelpers(res);
    if (createResourceRes.status === 'error') {
      response.status(StatusCodes.BAD_REQUEST).error(createResourceRes.error);
      return;
    }
    response.status(StatusCodes.CREATED).success(createResourceRes.resource);
  }

  @Delete('/:id')
  async deleteResource(@Param() params: { id: string }, @Res() res: Response) {
    const deleteResourceRes = await this.resourcesService.deleteResource(
      parseInt(params.id)
    );
    const response = new ResponseHelpers(res);
    if (deleteResourceRes.status === 'error') {
      response.status(StatusCodes.BAD_REQUEST).error(deleteResourceRes.error);
      return;
    }
    response.status(StatusCodes.OK).success({ message: 'success' });
  }
}
