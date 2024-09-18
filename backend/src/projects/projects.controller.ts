import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import ResponseHelpers from 'src/helpers/response.helper';
import { StatusCodes } from 'src/consts/statusCodes';
import { Response } from 'express';
import CreateProjectDTO from './dtos/create-project.dto';
import UpdateProjectDTO from './dtos/update-project-dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get('')
  async getAllProjects(@Res() res: Response) {
    const projects = await this.projectsService.getAllProjects();
    const response = new ResponseHelpers(res);
    response.status(StatusCodes.OK).success(projects);
  }

  @Get('/search')
  async searchProjects(
    @Query()
    queries: {
      group_id?: string[] | string;
      tag_id?: string[] | string;
      q?: string;
    },
    @Res() res: Response
  ) {
    const projects = await this.projectsService.searchProjects(queries);
    const response = new ResponseHelpers(res);
    response.status(StatusCodes.OK).success(projects);
  }

  @Post('')
  async create(@Body() input: CreateProjectDTO, @Res() res: Response) {
    const response = new ResponseHelpers(res);
    try {
      const createProjectResponse = await this.projectsService.create(input);
      response
        .status(StatusCodes.CREATED)
        .success(createProjectResponse.project);
    } catch (err: any) {
      response.status(StatusCodes.BAD_REQUEST).error(err.toString());
    }
  }

  @Patch('/:id')
  async update(
    @Param() params: { id: string },
    @Body() input: UpdateProjectDTO,
    @Res() res: Response
  ) {
    const response = new ResponseHelpers(res);
    const updateProjectResponse = await this.projectsService.update(
      parseInt(params.id),
      input
    );
    if (updateProjectResponse.status === 'error') {
      response
        .status(StatusCodes.BAD_REQUEST)
        .error(updateProjectResponse.error);
      return;
    }
    response.status(StatusCodes.OK).success(updateProjectResponse.project);
  }

  @Get('/:id')
  async getProjectById(@Param() params: { id: string }, @Res() res: Response) {
    const project = await this.projectsService.getProjectById(
      parseInt(params.id)
    );
    const response = new ResponseHelpers(res);
    if (!project) {
      response
        .status(StatusCodes.NOT_FOUND)
        .error('There is no project with that id');
      return;
    }
    response.status(StatusCodes.OK).success(project);
  }
}
