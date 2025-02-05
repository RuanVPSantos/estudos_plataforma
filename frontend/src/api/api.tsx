import axios, { AxiosInstance } from 'axios';
import { AmbienteInputInterface, AmbienteInterface, CategoriaInterface, CategoriaInput, SubCategoriaInterface, SubCategoriaInput, ConteudoInterface, ConteudoInput, ConteudoUpdateInput, AmbienteUpdateInterface, SubCategoriaUpdateInput, CategoriaUpdateInput, UsuarioInterface, UsuarioUpdateInput, UsuarioInput } from '../types';
const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});
import Auth from './auth';

class Api {
    private httpClient: AxiosInstance;

    constructor() {
        this.httpClient = httpClient;
    }

    async fetchAmbientes(): Promise<AmbienteInterface[]> {
        try {
            const response = await this.httpClient.get('/ambiente/all');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async createAmbiente(ambiente: AmbienteInputInterface): Promise<AmbienteInterface> {
        const token = Auth.getAuthCookie();
        try {
            const response = await this.httpClient.post('/ambiente', ambiente, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateAmbiente(ambiente: AmbienteUpdateInterface, id: number): Promise<AmbienteInterface> {
        const token = Auth.getAuthCookie();
        try {
            const response = await this.httpClient.put(`/ambiente/${id}`, ambiente,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async deleteAmbiente(id: number): Promise<void> {
        const token = Auth.getAuthCookie();
        try {
            await this.httpClient.delete(`/ambiente/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async fetchCategorias(): Promise<CategoriaInterface[]> {
        try {
            const response = await this.httpClient.get('/categoria/all');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async createCategoria(categoria: CategoriaInput): Promise<CategoriaInterface> {
        const token = Auth.getAuthCookie();
        try {
            const response = await this.httpClient.post('/categoria', categoria, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateCategoria(categoria: CategoriaUpdateInput, id: number): Promise<CategoriaInterface> {
        const token = Auth.getAuthCookie();
        try {
            const response = await this.httpClient.put(`/categoria/${id}`, categoria, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async deleteCategoria(id: number): Promise<void> {
        const token = Auth.getAuthCookie();
        try {
            await this.httpClient.delete(`/categoria/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async fetchSubCategorias(): Promise<SubCategoriaInterface[]> {
        try {
            const response = await this.httpClient.get('/subcategoria/all');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async createSubCategoria(subCategoria: SubCategoriaInput): Promise<SubCategoriaInterface> {
        const token = Auth.getAuthCookie();
        try {
            const response = await this.httpClient.post('/subcategoria', subCategoria, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateSubCategoria(subCategoria: SubCategoriaUpdateInput, id: number): Promise<SubCategoriaInterface> {
        const token = Auth.getAuthCookie();
        try {
            const response = await this.httpClient.put(`/subcategoria/${id}`, subCategoria, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async deleteSubCategoria(id: number): Promise<void> {
        const token = Auth.getAuthCookie();
        try {
            await this.httpClient.delete(`/subcategoria/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async fetchConteudo(): Promise<ConteudoInterface[]> {
        try {
            const response = await this.httpClient.get('/conteudo/all');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async createConteudo(conteudo: ConteudoInput): Promise<ConteudoInterface> {
        const token = Auth.getAuthCookie();
        try {
            const response = await this.httpClient.post('/conteudo', conteudo, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateConteudo(conteudo: ConteudoUpdateInput, id: number): Promise<ConteudoInterface> {
        const token = Auth.getAuthCookie();
        try {
            const response = await this.httpClient.put(`/conteudo/${id}`, conteudo, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async upConteudo(id: number): Promise<ConteudoInterface> {
        const token = Auth.getAuthCookie();
        try {
            const response = await this.httpClient.put(`/conteudo/subir/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async downConteudo(id: number): Promise<ConteudoInterface> {
        const token = Auth.getAuthCookie();
        try {
            const response = await this.httpClient.put(`/conteudo/descer/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async deleteConteudo(id: number): Promise<void> {
        const token = Auth.getAuthCookie();
        try {
            await this.httpClient.delete(`/conteudo/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async login(email: string, password: string): Promise<void> {
        try {
            const response = await this.httpClient.post('/usuario/login', { email, password });
            Auth.setAuthCookie(response.data.token);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async register(data: UsuarioInput): Promise<void> {
        try {
            await this.httpClient.post('/usuario/', data);
        } catch (error) {
            throw error;
        }
    }

    async logout(): Promise<void> {
        Auth.removeAuthCookie();
    }

    async getUser(): Promise<{ user: UsuarioInterface, token: string }> {
        const token = Auth.getAuthCookie();
        if (!token) {
            throw new Error('Token not found');
        }
        try {
            const response = await this.httpClient.get('/usuario/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return { user: response.data, token };
        } catch (error) {
            throw error;
        }
    }

    async updateUser(user: UsuarioUpdateInput): Promise<UsuarioInterface> {
        const token = Auth.getAuthCookie();
        try {
            const response = await this.httpClient.put('/usuario/', user, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default Api;