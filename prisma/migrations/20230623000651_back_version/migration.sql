/*
  Warnings:

  - You are about to alter the column `estado` on the `orden` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `orden` MODIFY `estado` BOOLEAN NOT NULL DEFAULT false;
