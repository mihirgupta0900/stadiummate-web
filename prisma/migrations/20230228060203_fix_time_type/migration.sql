/*
  Warnings:

  - You are about to drop the column `date` on the `WatchParty` table. All the data in the column will be lost.
  - Changed the type of `time` on the `WatchParty` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "WatchParty" DROP COLUMN "date",
DROP COLUMN "time",
ADD COLUMN     "time" TIMESTAMPTZ NOT NULL;
