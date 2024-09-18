-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('folder', 'image', 'video');

-- CreateTable
CREATE TABLE "Resource" (
    "id" SERIAL NOT NULL,
    "resource_id" TEXT NOT NULL,
    "type" "ResourceType" NOT NULL,
    "description" TEXT NOT NULL,
    "parent_resource_id" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "folder_id" INTEGER NOT NULL,
    "project_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resource_resource_id_key" ON "Resource"("resource_id");

-- CreateIndex
CREATE UNIQUE INDEX "Project_folder_id_key" ON "Project"("folder_id");

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_parent_resource_id_fkey" FOREIGN KEY ("parent_resource_id") REFERENCES "Resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
