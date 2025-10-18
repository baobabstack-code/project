-- CreateEnum
CREATE TYPE "public"."ContactStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'RESOLVED');

-- AlterTable
ALTER TABLE "public"."contact_form_submissions" ADD COLUMN     "adminNote" TEXT,
ADD COLUMN     "status" "public"."ContactStatus" NOT NULL DEFAULT 'NEW';
