
import { PrismaClient } from "@prisma/client";
import { AmbienteInterface, AmbienteInput, AmbienteUpdateInput } from "./interface";

export default class AmbienteModel {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async createAmbiente(data: AmbienteInput): Promise<AmbienteInterface> {
        return await this.prisma.ambiente.create({ data });
    }

    async getAmbientes(): Promise<AmbienteInterface[]> {
        return await this.prisma.ambiente.findMany(
            {
                include: {
                    Categorias: {
                        include: {
                            SubCategorias: true
                        },
                    },
                },
            }
        );
    }

    async getAmbienteById(id: number): Promise<AmbienteInterface> {
        return await this.prisma.ambiente.findUniqueOrThrow({ where: { id } });
    }

    async updateAmbiente(id: number, data: AmbienteUpdateInput): Promise<AmbienteInterface> {
        return await this.prisma.ambiente.update({ where: { id }, data });
    }

    async deleteAmbiente(id: number): Promise<AmbienteInterface> {
        return await this.prisma.ambiente.delete({ where: { id } });
    }
}