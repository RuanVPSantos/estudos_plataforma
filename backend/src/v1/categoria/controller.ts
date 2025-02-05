
import CategoriaServices from "./service";
import CategoriaModel from "./model";
import { CategoriaInterface, CategoriaInput, CategoriaUpdateInput } from "./interface";
import { getPrismaPrincipal } from "../utils/prisma.clients";

const modelService = new CategoriaServices(new CategoriaModel(getPrismaPrincipal()));

export default class CategoriaController {
    async getAllCategorias(): Promise<CategoriaInterface[]> {
        return await modelService.getAllCategorias();
    }
    async getCategoriaById(id: number): Promise<CategoriaInterface> {
        return await modelService.getCategoriaById(id);
    }

    async createCategoria(data: CategoriaInput): Promise<CategoriaInterface> {
        return await modelService.createCategoria(data);
    }

    async updateCategoria(id: number, data: CategoriaUpdateInput): Promise<CategoriaInterface> {
        return await modelService.updateCategoria(id, data);
    }

    async deleteCategoria(id: number): Promise<CategoriaInterface> {
        return await modelService.deleteCategoria(id);
    }
}