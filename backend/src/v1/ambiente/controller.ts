
import AmbienteServices from "./service";
import AmbienteModel from "./model";
import { AmbienteInterface, AmbienteInput, AmbienteUpdateInput } from "./interface";
import { getPrismaPrincipal } from "../utils/prisma.clients";

const modelService = new AmbienteServices(new AmbienteModel(getPrismaPrincipal()));

export default class AmbienteController {
    async getAllAmbientes(): Promise<AmbienteInterface[]> {
        return await modelService.getAllAmbientes();
    }
    async getAmbienteById(id: number): Promise<AmbienteInterface> {
        return await modelService.getAmbienteById(id);
    }

    async createAmbiente(data: AmbienteInput): Promise<AmbienteInterface> {
        return await modelService.createAmbiente(data);
    }

    async updateAmbiente(id: number, data: AmbienteUpdateInput): Promise<AmbienteInterface> {
        return await modelService.updateAmbiente(id, data);
    }

    async deleteAmbiente(id: number): Promise<AmbienteInterface> {
        return await modelService.deleteAmbiente(id);
    }
}