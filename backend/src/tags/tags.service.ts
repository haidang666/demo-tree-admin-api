import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import CreateTagDTO from './dtos/create-tag.dto';
import { getPrismaError } from 'src/helpers/prisma.helper';
import { Tag } from '@prisma/client';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async getAllTags(): Promise<Tag[]> {
    return await this.prisma.tag.findMany();
  }

  async getTagById(id: number): Promise<Tag | null> {
    return await this.prisma.tag.findUnique({ where: { id } });
  }

  async create(input: CreateTagDTO): Promise<
    | { status: 'success'; tag: Tag }
    | {
        status: 'error';
        error: string;
      }
  > {
    try {
      const tag = await this.prisma.tag.create({
        data: {
          name: input.name,
        },
      });
      return {
        status: 'success',
        tag,
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
    input: CreateTagDTO
  ): Promise<
    | { status: 'success'; tag: Tag }
    | {
        status: 'error';
        error: string;
      }
  > {
    try {
      const tag = await this.prisma.tag.update({
        where: { id },
        data: {
          name: input.name,
        },
      });
      return {
        status: 'success',
        tag,
      };
    } catch (error) {
      return {
        status: 'error',
        error: getPrismaError(error),
      };
    }
  }
}
