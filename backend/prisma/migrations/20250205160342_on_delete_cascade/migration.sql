-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Categoria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "ambienteId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Categoria_ambienteId_fkey" FOREIGN KEY ("ambienteId") REFERENCES "Ambiente" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Categoria" ("ambienteId", "createdAt", "descricao", "id", "nome", "updatedAt") SELECT "ambienteId", "createdAt", "descricao", "id", "nome", "updatedAt" FROM "Categoria";
DROP TABLE "Categoria";
ALTER TABLE "new_Categoria" RENAME TO "Categoria";
CREATE TABLE "new_Conteudo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,
    "subCategoriaId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Conteudo_subCategoriaId_fkey" FOREIGN KEY ("subCategoriaId") REFERENCES "SubCategoria" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Conteudo" ("createdAt", "id", "nome", "ordem", "subCategoriaId", "tipo", "updatedAt", "valor") SELECT "createdAt", "id", "nome", "ordem", "subCategoriaId", "tipo", "updatedAt", "valor" FROM "Conteudo";
DROP TABLE "Conteudo";
ALTER TABLE "new_Conteudo" RENAME TO "Conteudo";
CREATE TABLE "new_SubCategoria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "categoriaId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SubCategoria_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SubCategoria" ("categoriaId", "createdAt", "descricao", "id", "nome", "updatedAt") SELECT "categoriaId", "createdAt", "descricao", "id", "nome", "updatedAt" FROM "SubCategoria";
DROP TABLE "SubCategoria";
ALTER TABLE "new_SubCategoria" RENAME TO "SubCategoria";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
