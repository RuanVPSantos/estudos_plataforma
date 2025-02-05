import axios, { AxiosInstance } from 'axios';
import { AmbienteInputInterface, AmbienteInterface, CategoriaInterface, CategoriaInput, SubCategoriaInterface, SubCategoriaInput, ConteudoInterface, ConteudoInput, ConteudoUpdateInput, AmbienteUpdateInterface, SubCategoriaUpdateInput, CategoriaUpdateInput } from '../types';
const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

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
        try {
            const response = await this.httpClient.post('/ambiente', ambiente);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateAmbiente(ambiente: AmbienteUpdateInterface, id: number): Promise<AmbienteInterface> {
        try {
            const response = await this.httpClient.put(`/ambiente/${id}`, ambiente);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async deleteAmbiente(id: number): Promise<void> {
        try {
            await this.httpClient.delete(`/ambiente/${id}`);
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
        try {
            const response = await this.httpClient.post('/categoria', categoria);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateCategoria(categoria: CategoriaUpdateInput, id: number): Promise<CategoriaInterface> {
        try {
            const response = await this.httpClient.put(`/categoria/${id}`, categoria);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async deleteCategoria(id: number): Promise<void> {
        try {
            await this.httpClient.delete(`/categoria/${id}`);
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
        try {
            const response = await this.httpClient.post('/subcategoria', subCategoria);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateSubCategoria(subCategoria: SubCategoriaUpdateInput, id: number): Promise<SubCategoriaInterface> {
        try {
            const response = await this.httpClient.put(`/subcategoria/${id}`, subCategoria);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async deleteSubCategoria(id: number): Promise<void> {
        try {
            await this.httpClient.delete(`/subcategoria/${id}`);
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
        try {
            const response = await this.httpClient.post('/conteudo', conteudo);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateConteudo(conteudo: ConteudoUpdateInput, id: number): Promise<ConteudoInterface> {
        try {
            const response = await this.httpClient.put(`/conteudo/${id}`, conteudo);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async upConteudo(id: number): Promise<ConteudoInterface> {
        try {
            const response = await this.httpClient.put(`/conteudo/subir/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async deleteConteudo(id: number): Promise<void> {
        try {
            await this.httpClient.delete(`/conteudo/${id}`);
        } catch (error) {
            throw error;
        }
    }
}

export default Api;