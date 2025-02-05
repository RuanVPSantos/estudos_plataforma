
import ConteudoServices from "./service";
import ConteudoModel from "./model";
import { ConteudoInterface, ConteudoInput, ConteudoUpdateInput } from "./interface";
import { getPrismaPrincipal } from "../utils/prisma.clients";

const modelService = new ConteudoServices(new ConteudoModel(getPrismaPrincipal()));

export default class ConteudoController {
    async getAllConteudos(): Promise<ConteudoInterface[]> {
        return await modelService.getAllConteudos();
    }
    async getConteudoById(id: number): Promise<ConteudoInterface> {
        return await modelService.getConteudoById(id);
    }

    async createConteudo(data: ConteudoInput): Promise<ConteudoInterface> {
        return await modelService.createConteudo(data);
    }

    async subirOrdemConteudo(id: number): Promise<ConteudoInterface> {
        return await modelService.subirOrdemConteudo(id);
    }

    async descerOrdemConteudo(id: number): Promise<ConteudoInterface> {
        return await modelService.descerOrdemConteudo(id);
    }

    async updateConteudo(id: number, data: ConteudoUpdateInput): Promise<ConteudoInterface> {
        return await modelService.updateConteudo(id, data);
    }

    async deleteConteudo(id: number): Promise<ConteudoInterface> {
        return await modelService.deleteConteudo(id);
    }
}