/*
  Warnings:

  - Made the column `folder_id` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_folder_id_fkey";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "folder_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
