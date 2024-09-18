import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ResourcesModule } from 'src/resources/resources.module';

@Module({
  controllers: [ProjectsController],
  imports: [PrismaModule, ResourcesModule],
  providers: [ProjectsService],
})
export class ProjectsModule {}
