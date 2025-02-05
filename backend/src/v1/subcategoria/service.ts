
import SubCategoriaModel from './model';
import { SubCategoriaInterface, SubCategoriaInput, SubCategoriaUpdateInput } from './interface';

export default class SubCategoriaServices {
    private model: SubCategoriaModel;

    constructor(model: SubCategoriaModel) {
        this.model = model;
    }

    async getAllSubCategorias(): Promise<SubCategoriaInterface[]> {
        try {
            return await this.model.getSubCategorias();
        } catch (error) {
            throw error;
        }
    }

    async getSubCategoriaById(id: number): Promise<SubCategoriaInterface> {
        try {
            return await this.model.getSubCategoriaById(id);
        } catch (error) {
            throw error;
        }
    }

    async createSubCategoria(data: SubCategoriaInput): Promise<SubCategoriaInterface> {
        try {
            return await this.model.createSubCategoria(data);
        } catch (error) {
            throw error;
        }
    }

    async updateSubCategoria(id: number, data: SubCategoriaUpdateInput): Promise<SubCategoriaInterface> {
        try {
            return await this.model.updateSubCategoria(id, data);
        } catch (error) {
            throw error;
        }
    }

    async deleteSubCategoria(id: number): Promise<SubCategoriaInterface> {
        try {
            return await this.model.deleteSubCategoria(id);
        } catch (error) {
            throw error;
        }
    }
}