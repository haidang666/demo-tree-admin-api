import { Injectable } from '@nestjs/common';
import { Prisma, Project } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import CreateProjectDTO from './dtos/create-project.dto';
import { ResourcesService } from 'src/resources/resources.service';
import CreateResourceDTO from 'src/resources/dtos/create-resource.dto';
import { getPrismaError } from 'src/helpers/prisma.helper';
import UpdateProjectDTO from './dtos/update-project-dto';

@Injectable()
export class ProjectsService {
  constructor(
    private prisma: PrismaService,
    private resourcesService: ResourcesService
  ) {}

  async getAllProjects(): Promise<Project[]> {
    const projects = await this.prisma.project.findMany({
      include: {
        ProjectGroupTag: {
          include: { group: true, tag: true },
        },
      },
    });
    const projectsWithThumbnail = await Promise.all(
      projects.map(async (p) => {
        const thumbnail = await this.prisma.resource.findFirst({
          where: {
            parent_resource_id: p.folder_id,
            is_thumbnail: true,
          },
        });
        return {
          ...p,
          thumbnail: thumbnail,
        };
      })
    );
    return projectsWithThumbnail;
  }

  async getProjectById(id: number): Promise<Project> {
    return await this.prisma.project.findFirst({
      where: { id },
      include: {
        ProjectGroupTag: {
          include: {
            group: true,
            tag: true,
          },
        },
        resource: {
          include: {
            child_resources: true,
            parent_resource: true,
          },
        },
      },
    });
  }

  async create(input: CreateProjectDTO) {
    return this.prisma.$transaction(async (tx) => {
      try {
        const createResourceDTO: CreateResourceDTO = {
          resource_id: input.folder_id,
          type: 'folder',
          is_thumbnail: false,
        };
        const createResourceResponse = await this.resourcesService.createWithTx(
          createResourceDTO,
          tx
        );

        if (createResourceResponse.status === 'error') return null;

        const project = await tx.project.create({
          data: {
            project_name: input.name,
            folder_id: createResourceResponse.resource.id,
            description: input.description ?? null,
            slug: input.name.toLowerCase().replaceAll(' ', '-'),
          },
        });

        const arr: any[] = [];
        input.groups_tags.map((groupTag) => {
          const groupId = groupTag.group_id;
          groupTag.tag_ids.map((tagId) => {
            arr.push(
              tx.projectGroupTag.create({
                data: {
                  group_id: groupId,
                  tag_id: tagId,
                  project_id: project.id,
                },
              })
            );
          });
        });

        await Promise.all(arr);
        return {
          status: 'success',
          project,
        };
      } catch (err) {
        throw Error(getPrismaError(err));
      }
    });
  }

  async update(
    id: number,
    input: UpdateProjectDTO
  ): Promise<
    | {
        status: 'success';
        project: Project;
      }
    | {
        status: 'error';
        error: string;
      }
  > {
    const { is_show, name, description } = input;
    try {
      const project = await this.prisma.project.update({
        where: { id },
        data: {
          project_name: name,
          is_show,
          description,
        },
      });
      return {
        status: 'success',
        project,
      };
    } catch (err) {
      return {
        status: 'error',
        error: getPrismaError(err),
      };
    }
  }

  async searchProjects(queries: {
    tag_id?: string[] | string;
    group_id?: string[] | string;
    q?: string;
  }): Promise<Project[]> {
    const projectWhereInputs: Prisma.ProjectWhereInput[] = [];
    if (queries.group_id) {
      let groupIds = [];
      if (typeof queries.group_id === 'string') {
        groupIds = [parseInt(queries.group_id)];
      } else {
        groupIds = queries.group_id.map((item: string) => parseInt(item));
      }
      projectWhereInputs.push({
        ProjectGroupTag: {
          some: {
            group_id: { in: groupIds },
          },
        },
      });
    }

    if (queries.tag_id) {
      let tagIds = [];
      if (typeof queries.tag_id === 'string') {
        tagIds = [parseInt(queries.tag_id)];
      } else {
        tagIds = queries.tag_id.map((item: string) => parseInt(item));
      }
      projectWhereInputs.push({
        ProjectGroupTag: {
          some: {
            tag_id: { in: tagIds },
          },
        },
      });
    }

    if (queries.q) {
      projectWhereInputs.push({
        project_name: {
          contains: queries.q,
          mode: 'insensitive',
        },
      });
    }

    const projects = await this.prisma.project.findMany({
      include: {
        ProjectGroupTag: {
          include: { group: true, tag: true },
        },
      },
      where: {
        AND: projectWhereInputs,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const projectsWithThumbnail = await Promise.all(
      projects.map(async (p) => {
        const thumbnail = await this.prisma.resource.findFirst({
          where: {
            parent_resource_id: p.folder_id,
            is_thumbnail: true,
          },
        });
        return {
          ...p,
          thumbnail: thumbnail,
        };
      })
    );
    return projectsWithThumbnail;
  }
}
