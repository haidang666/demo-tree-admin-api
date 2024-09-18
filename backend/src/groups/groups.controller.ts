import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { StatusCodes } from 'src/consts/statusCodes';
import { Response } from 'express';
import ResponseHelpers from 'src/helpers/response.helper';
import CreateGroupDTO from './dtos/create-group.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get('')
  async getAllGroups(@Res() res: Response) {
    const groups = await this.groupsService.getAllGroups();
    const response = new ResponseHelpers(res);
    response.status(StatusCodes.OK).success(groups);
  }

  @Get('/:id')
  async getGroupById(@Param() params: { id: string }, @Res() res: Response) {
    const group = await this.groupsService.getGroupById(parseInt(params.id));
    const response = new ResponseHelpers(res);
    if (!group) {
      response
        .status(StatusCodes.NOT_FOUND)
        .error('There is no group with that id');
      return;
    }
    response.status(StatusCodes.OK).success(group);
  }

  @Post('')
  async create(@Body() createGroupDTO: CreateGroupDTO, @Res() res: Response) {
    const createGroupRes = await this.groupsService.create(createGroupDTO);
    const response = new ResponseHelpers(res);
    if (createGroupRes.status === 'error') {
      response.status(StatusCodes.BAD_REQUEST).error(createGroupRes.error);
      return;
    }
    response.status(StatusCodes.CREATED).success(createGroupRes.group);
  }

  @Patch(':id')
  async update(
    @Param() params: { id: string },
    @Body() updateGroupDTO: CreateGroupDTO,
    @Res() res: Response
  ) {
    const createGroupRes = await this.groupsService.update(
      parseInt(params.id),
      updateGroupDTO
    );
    const response = new ResponseHelpers(res);
    if (createGroupRes.status === 'error') {
      response.status(StatusCodes.BAD_REQUEST).error(createGroupRes.error);
      return;
    }
    response.status(StatusCodes.OK).success(createGroupRes.group);
  }
}
