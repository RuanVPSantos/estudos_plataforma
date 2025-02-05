
import { PrismaClient } from "@prisma/client";
import { ConteudoInterface, ConteudoInput, ConteudoUpdateInput } from "./interface";

export default class ConteudoModel {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async createConteudo(data: ConteudoInput): Promise<ConteudoInterface> {
        return await this.prisma.conteudo.create({ data });
    }

    async getConteudos(): Promise<ConteudoInterface[]> {
        return await this.prisma.conteudo.findMany();
    }

    async getConteudoBySubCategoriaId(subCategoriaId: number): Promise<ConteudoInterface[]> {
        return await this.prisma.conteudo.findMany({ where: { subCategoriaId }, orderBy: { ordem: 'asc' } });
    }

    async getConteudoById(id: number): Promise<ConteudoInterface> {
        return await this.prisma.conteudo.findUniqueOrThrow({ where: { id } });
    }

    async updateConteudo(id: number, data: ConteudoUpdateInput): Promise<ConteudoInterface> {
        return await this.prisma.conteudo.update({ where: { id }, data });
    }

    async deleteConteudo(id: number): Promise<ConteudoInterface> {
        return await this.prisma.conteudo.delete({ where: { id } });
    }
}