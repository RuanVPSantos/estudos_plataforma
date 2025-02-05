/*
  Warnings:

  - You are about to drop the `Administrador` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Administrador_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Administrador";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Usuario" ("createdAt", "email", "id", "nome", "senha", "updatedAt") SELECT "createdAt", "email", "id", "nome", "senha", "updatedAt" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
