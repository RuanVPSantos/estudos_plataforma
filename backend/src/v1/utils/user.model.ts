
import { PrismaClient } from "@prisma/client";
import { UsuarioInterface } from "./interface";

export default class UsuarioModel {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }
    async getUsuarioById(id: number): Promise<UsuarioInterface> {
        return await this.prisma.usuario.findUniqueOrThrow({ where: { id } });
    }

}