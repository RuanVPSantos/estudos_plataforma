
import CategoriaModel from './model';
import { CategoriaInterface, CategoriaInput, CategoriaUpdateInput } from './interface';

export default class CategoriaServices {
    private model: CategoriaModel;

    constructor(model: CategoriaModel) {
        this.model = model;
    }

    async getAllCategorias(): Promise<CategoriaInterface[]> {
        try {
            return await this.model.getCategorias();
        } catch (error) {
            throw error;
        }
    }

    async getCategoriaById(id: number): Promise<CategoriaInterface> {
        try {
            return await this.model.getCategoriaById(id);
        } catch (error) {
            throw error;
        }
    }

    async createCategoria(data: CategoriaInput): Promise<CategoriaInterface> {
        try {
            return await this.model.createCategoria(data);
        } catch (error) {
            throw error;
        }
    }

    async updateCategoria(id: number, data: CategoriaUpdateInput): Promise<CategoriaInterface> {
        try {
            return await this.model.updateCategoria(id, data);
        } catch (error) {
            throw error;
        }
    }

    async deleteCategoria(id: number): Promise<CategoriaInterface> {
        try {
            return await this.model.deleteCategoria(id);
        } catch (error) {
            throw error;
        }
    }
}