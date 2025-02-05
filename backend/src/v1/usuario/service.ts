
import UsuarioModel from './model';
import { UsuarioInterface, UsuarioInput, UsuarioUpdateInput, UsuarioLogin, UsuarioLoginResponse } from './interface';
import { Auth } from '../utils/auth';
export default class UsuarioServices {
    private model: UsuarioModel;

    constructor(model: UsuarioModel) {
        this.model = model;
    }

    async getAllUsuarios(): Promise<UsuarioInterface[]> {
        try {
            return await this.model.getUsuarios();
        } catch (error) {
            throw error;
        }
    }

    async loginUsuario(data: UsuarioLogin): Promise<UsuarioLoginResponse> {
        try {
            const usuario = await this.model.getUsuarioByEmail(data.email);

            if (!usuario) {
                throw new Error('Usuário não encontrado');
            }

            if (!Auth.comparePassword(data.senha, usuario.senha)) {
                throw new Error('Senha inválida');
            }

            const token = Auth.generateToken(usuario.email, usuario.id);
            return { token };

        } catch (error) {
            throw error;
        }
    }

    async getUsuarioById(id: number): Promise<UsuarioInterface> {
        try {
            return await this.model.getUsuarioById(id);
        } catch (error) {
            throw error;
        }
    }

    async createUsuario(data: UsuarioInput): Promise<UsuarioInterface> {
        try {
            const usuario = await this.model.getUsuarioByEmail(data.email);
            if (usuario) {
                throw new Error('Usuário já existe');
            }
            const senhaCriptografada = await Auth.hashPassword(data.senha);
            data.senha = senhaCriptografada;
            return await this.model.createUsuario(data);
        } catch (error) {
            throw error;
        }
    }

    async updateUsuario(id: number, data: UsuarioUpdateInput): Promise<UsuarioInterface> {
        try {
            return await this.model.updateUsuario(id, data);
        } catch (error) {
            throw error;
        }
    }

    async deleteUsuario(id: number): Promise<UsuarioInterface> {
        try {
            return await this.model.deleteUsuario(id);
        } catch (error) {
            throw error;
        }
    }
}