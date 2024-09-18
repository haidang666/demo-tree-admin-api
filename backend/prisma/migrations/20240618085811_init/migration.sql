/*
  Warnings:

  - You are about to drop the `ProjectGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_folder_id_fkey";

-- DropForeignKey
ALTER TABLE "ProjectGroup" DROP CONSTRAINT "ProjectGroup_group_id_fkey";

-- DropForeignKey
ALTER TABLE "ProjectGroup" DROP CONSTRAINT "ProjectGroup_project_id_fkey";

-- DropForeignKey
ALTER TABLE "ProjectGroup" DROP CONSTRAINT "ProjectGroup_tag_id_fkey";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "folder_id" DROP NOT NULL;

-- DropTable
DROP TABLE "ProjectGroup";

-- CreateTable
CREATE TABLE "ProjectGroupTag" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ProjectGroupTag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectGroupTag_project_id_group_id_tag_id_key" ON "ProjectGroupTag"("project_id", "group_id", "tag_id");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "Resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectGroupTag" ADD CONSTRAINT "ProjectGroupTag_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectGroupTag" ADD CONSTRAINT "ProjectGroupTag_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectGroupTag" ADD CONSTRAINT "ProjectGroupTag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
