import { Injectable } from '@nestjs/common';
import { Group } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import CreateGroupDTO from './dtos/create-group.dto';
import { getPrismaError } from 'src/helpers/prisma.helper';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  async getAllGroups(): Promise<Group[]> {
    return await this.prisma.group.findMany();
  }

  async getGroupById(id: number): Promise<Group | null> {
    return await this.prisma.group.findUnique({ where: { id } });
  }

  async create(input: CreateGroupDTO): Promise<
    | { status: 'success'; group: Group }
    | {
        status: 'error';
        error: string;
      }
  > {
    try {
      const group = await this.prisma.group.create({
        data: {
          name: input.name,
        },
      });
      return {
        status: 'success',
        group,
      };
    } catch (error) {
      return {
        status: 'error',
        error: getPrismaError(error),
      };
    }
  }
  async update(
    id: number,
    input: CreateGroupDTO
  ): Promise<
    | { status: 'success'; group: Group }
    | {
        status: 'error';
        error: string;
      }
  > {
    try {
      const group = await this.prisma.group.update({
        where: { id },
        data: {
          name: input.name,
        },
      });
      return {
        status: 'success',
        group,
      };
    } catch (error) {
      return {
        status: 'error',
        error: getPrismaError(error),
      };
    }
  }
}
