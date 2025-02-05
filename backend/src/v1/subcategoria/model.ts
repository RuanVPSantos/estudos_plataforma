
import { PrismaClient } from "@prisma/client";
import { SubCategoriaInterface, SubCategoriaInput, SubCategoriaUpdateInput } from "./interface";

export default class SubCategoriaModel {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async createSubCategoria(data: SubCategoriaInput): Promise<SubCategoriaInterface> {
        return await this.prisma.subCategoria.create({ data });
    }

    async getSubCategorias(): Promise<SubCategoriaInterface[]> {
        return await this.prisma.subCategoria.findMany();
    }

    async getSubCategoriaById(id: number): Promise<SubCategoriaInterface> {
        return await this.prisma.subCategoria.findUniqueOrThrow({
            where: { id }, include: {
                Conteudos: {
                    orderBy: {
                        ordem: 'asc'
                    }
                }
            }
        });
    }

    async updateSubCategoria(id: number, data: SubCategoriaUpdateInput): Promise<SubCategoriaInterface> {
        return await this.prisma.subCategoria.update({ where: { id }, data });
    }

    async deleteSubCategoria(id: number): Promise<SubCategoriaInterface> {
        return await this.prisma.subCategoria.delete({ where: { id } });
    }
}