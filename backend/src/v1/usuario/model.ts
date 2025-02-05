
import { PrismaClient } from "@prisma/client";
import { UsuarioInterface, UsuarioInput, UsuarioUpdateInput } from "./interface";

export default class UsuarioModel {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async createUsuario(data: UsuarioInput): Promise<UsuarioInterface> {
        return await this.prisma.usuario.create({ data });
    }

    async getUsuarios(): Promise<UsuarioInterface[]> {
        return await this.prisma.usuario.findMany();
    }

    async getUsuarioByEmail(email: string): Promise<UsuarioInterface> {
        return await this.prisma.usuario.findUnique({ where: { email } });
    }

    async getUsuarioById(id: number): Promise<UsuarioInterface> {
        return await this.prisma.usuario.findUniqueOrThrow({ where: { id } });
    }

    async updateUsuario(id: number, data: UsuarioUpdateInput): Promise<UsuarioInterface> {
        return await this.prisma.usuario.update({ where: { id }, data });
    }

    async deleteUsuario(id: number): Promise<UsuarioInterface> {
        return await this.prisma.usuario.delete({ where: { id } });
    }
}