
import SubCategoriaServices from "./service";
import SubCategoriaModel from "./model";
import { SubCategoriaInterface, SubCategoriaInput, SubCategoriaUpdateInput } from "./interface";
import { getPrismaPrincipal } from "../utils/prisma.clients";

const modelService = new SubCategoriaServices(new SubCategoriaModel(getPrismaPrincipal()));

export default class SubCategoriaController {
    async getAllSubCategorias(): Promise<SubCategoriaInterface[]> {
        return await modelService.getAllSubCategorias();
    }
    async getSubCategoriaById(id: number): Promise<SubCategoriaInterface> {
        return await modelService.getSubCategoriaById(id);
    }

    async createSubCategoria(data: SubCategoriaInput): Promise<SubCategoriaInterface> {
        return await modelService.createSubCategoria(data);
    }

    async updateSubCategoria(id: number, data: SubCategoriaUpdateInput): Promise<SubCategoriaInterface> {
        return await modelService.updateSubCategoria(id, data);
    }

    async deleteSubCategoria(id: number): Promise<SubCategoriaInterface> {
        return await modelService.deleteSubCategoria(id);
    }
}