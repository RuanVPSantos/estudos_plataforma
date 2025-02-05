
import { PrismaClient } from "@prisma/client";
import { CategoriaInterface, CategoriaInput, CategoriaUpdateInput } from "./interface";

export default class CategoriaModel {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async createCategoria(data: CategoriaInput): Promise<CategoriaInterface> {
        return await this.prisma.categoria.create({ data });
    }

    async getCategorias(): Promise<CategoriaInterface[]> {
        return await this.prisma.categoria.findMany();
    }

    async getCategoriaById(id: number): Promise<CategoriaInterface> {
        return await this.prisma.categoria.findUniqueOrThrow({ where: { id } });
    }

    async updateCategoria(id: number, data: CategoriaUpdateInput): Promise<CategoriaInterface> {
        return await this.prisma.categoria.update({ where: { id }, data });
    }

    async deleteCategoria(id: number): Promise<CategoriaInterface> {
        return await this.prisma.categoria.delete({ where: { id } });
    }
}