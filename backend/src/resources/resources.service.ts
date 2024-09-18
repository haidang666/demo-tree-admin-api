import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import CreateResourceDTO from './dtos/create-resource.dto';
import { Resource } from '@prisma/client';
import { getPrismaError } from 'src/helpers/prisma.helper';

@Injectable()
export class ResourcesService {
  constructor(private prisma: PrismaService) {}

  async create(input: CreateResourceDTO): Promise<
    | {
        status: 'success';
        resource: Resource;
      }
    | {
        status: 'error';
        error: string;
      }
  > {
    try {
      console.log(input.is_thumbnail !== undefined);
      const resource = await this.prisma.resource.create({
        data: {
          resource_id: input.resource_id,
          type: input.type,
          parent_resource_id: input.parent_resource_id ?? null,
          is_thumbnail:
            input.is_thumbnail !== undefined ? input.is_thumbnail : false,
        },
      });
      return {
        status: 'success',
        resource,
      };
    } catch (err) {
      return {
        status: 'error',
        error: getPrismaError(err),
      };
    }
  }
  async createWithTx(
    input: CreateResourceDTO,
    tx?: any
  ): Promise<
    | {
        status: 'success';
        resource: Resource;
      }
    | {
        status: 'error';
        error: string;
      }
  > {
    try {
      const resource = await tx.resource.create({
        data: {
          resource_id: input.resource_id,
          type: input.type,
          parent_resource_id: input.parent_resource_id ?? null,
          is_thumbnail:
            input.is_thumbnail !== undefined ? input.is_thumbnail : false,
        },
      });
      return {
        status: 'success',
        resource,
      };
    } catch (err) {
      return {
        status: 'error',
        error: getPrismaError(err),
      };
    }
  }
  async getResourceById(id: number): Promise<Resource> {
    const resource = await this.prisma.resource.findFirst({
      where: { id },
      include: {
        child_resources: true,
        parent_resource: true,
      },
    });
    return resource;
  }
  async deleteResource(
    id: number
  ): Promise<{ status: 'success' } | { status: 'error'; error: string }> {
    try {
      await this.prisma.resource.delete({ where: { id } });
      return {
        status: 'success',
      };
    } catch (err) {
      return {
        status: 'error',
        error: getPrismaError(err),
      };
    }
  }
}
