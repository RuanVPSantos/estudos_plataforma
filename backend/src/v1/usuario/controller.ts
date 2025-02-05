
import UsuarioServices from "./service";
import UsuarioModel from "./model";
import { UsuarioInterface, UsuarioInput, UsuarioUpdateInput, UsuarioLogin, UsuarioLoginResponse } from "./interface";
import { getPrismaPrincipal } from "../utils/prisma.clients";

const modelService = new UsuarioServices(new UsuarioModel(getPrismaPrincipal()));

export default class UsuarioController {
    async getAllUsuarios(): Promise<UsuarioInterface[]> {
        return await modelService.getAllUsuarios();
    }
    async getUsuarioById(id: number): Promise<UsuarioInterface> {
        return await modelService.getUsuarioById(id);
    }

    async loginUsuario(data: UsuarioLogin): Promise<UsuarioLoginResponse> {
        return await modelService.loginUsuario(data);
    }

    async createUsuario(data: UsuarioInput): Promise<UsuarioInterface> {
        return await modelService.createUsuario(data);
    }

    async updateUsuario(id: number, data: UsuarioUpdateInput): Promise<UsuarioInterface> {
        return await modelService.updateUsuario(id, data);
    }

    async deleteUsuario(id: number): Promise<UsuarioInterface> {
        return await modelService.deleteUsuario(id);
    }
}