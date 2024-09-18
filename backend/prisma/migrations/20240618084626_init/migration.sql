/*
  Warnings:

  - You are about to drop the `ProjectTag` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[project_id,group_id,tag_id]` on the table `ProjectGroup` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tag_id` to the `ProjectGroup` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProjectTag" DROP CONSTRAINT "ProjectTag_project_id_fkey";

-- DropForeignKey
ALTER TABLE "ProjectTag" DROP CONSTRAINT "ProjectTag_tag_id_fkey";

-- DropIndex
DROP INDEX "ProjectGroup_project_id_group_id_key";

-- AlterTable
ALTER TABLE "ProjectGroup" ADD COLUMN     "tag_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ProjectTag";

-- CreateIndex
CREATE UNIQUE INDEX "ProjectGroup_project_id_group_id_tag_id_key" ON "ProjectGroup"("project_id", "group_id", "tag_id");

-- AddForeignKey
ALTER TABLE "ProjectGroup" ADD CONSTRAINT "ProjectGroup_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
