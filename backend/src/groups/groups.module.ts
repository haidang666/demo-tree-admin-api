import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [GroupsController],
  imports: [PrismaModule],
  providers: [GroupsService],
})
export class GroupsModule {}
