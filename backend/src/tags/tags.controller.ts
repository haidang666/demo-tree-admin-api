import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { TagsService } from './tags.service';
import { StatusCodes } from 'src/consts/statusCodes';
import ResponseHelpers from 'src/helpers/response.helper';
import { Response } from 'express';
import CreateTagDTO from './dtos/create-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get('')
  async getAllTags(@Res() res: Response) {
    const tags = await this.tagsService.getAllTags();
    const response = new ResponseHelpers(res);
    response.status(StatusCodes.OK).success(tags);
  }

  @Get('/:id')
  async getTagById(@Param() params: { id: string }, @Res() res: Response) {
    const tag = await this.tagsService.getTagById(parseInt(params.id));
    const response = new ResponseHelpers(res);
    if (!tag) {
      response
        .status(StatusCodes.NOT_FOUND)
        .error('There is no tag with that id');
      return;
    }
    response.status(StatusCodes.OK).success(tag);
  }

  @Post('')
  async create(@Body() createTagDTO: CreateTagDTO, @Res() res: Response) {
    const createTagRes = await this.tagsService.create(createTagDTO);
    const response = new ResponseHelpers(res);
    if (createTagRes.status === 'error') {
      response.status(StatusCodes.BAD_REQUEST).error(createTagRes.error);
      return;
    }
    response.status(StatusCodes.CREATED).success(createTagRes.tag);
  }

  @Patch(':id')
  async update(
    @Param() params: { id: string },
    @Body() updateTagDTO: CreateTagDTO,
    @Res() res: Response
  ) {
    const createTagRes = await this.tagsService.update(
      parseInt(params.id),
      updateTagDTO
    );
    const response = new ResponseHelpers(res);
    if (createTagRes.status === 'error') {
      response.status(StatusCodes.BAD_REQUEST).error(createTagRes.error);
      return;
    }
    response.status(StatusCodes.OK).success(createTagRes.tag);
  }
}
