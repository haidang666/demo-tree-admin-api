-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Resource" ALTER COLUMN "description" DROP NOT NULL;
