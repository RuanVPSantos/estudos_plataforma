
import AmbienteModel from './model';
import { AmbienteInterface, AmbienteInput, AmbienteUpdateInput } from './interface';

export default class AmbienteServices {
    private model: AmbienteModel;

    constructor(model: AmbienteModel) {
        this.model = model;
    }

    async getAllAmbientes(): Promise<AmbienteInterface[]> {
        try {
            return await this.model.getAmbientes();
        } catch (error) {
            throw error;
        }
    }

    async getAmbienteById(id: number): Promise<AmbienteInterface> {
        try {
            return await this.model.getAmbienteById(id);
        } catch (error) {
            throw error;
        }
    }

    async createAmbiente(data: AmbienteInput): Promise<AmbienteInterface> {
        try {
            return await this.model.createAmbiente(data);
        } catch (error) {
            throw error;
        }
    }

    async updateAmbiente(id: number, data: AmbienteUpdateInput): Promise<AmbienteInterface> {
        try {
            return await this.model.updateAmbiente(id, data);
        } catch (error) {
            throw error;
        }
    }

    async deleteAmbiente(id: number): Promise<AmbienteInterface> {
        try {
            return await this.model.deleteAmbiente(id);
        } catch (error) {
            throw error;
        }
    }
}