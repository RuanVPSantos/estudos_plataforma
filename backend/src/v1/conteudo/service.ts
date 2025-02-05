import ConteudoModel from './model';
import { ConteudoInterface, ConteudoInput, ConteudoUpdateInput } from './interface';

export default class ConteudoServices {
    private model: ConteudoModel;

    constructor(model: ConteudoModel) {
        this.model = model;
    }

    async getAllConteudos(): Promise<ConteudoInterface[]> {
        try {
            return await this.model.getConteudos();
        } catch (error) {
            throw error;
        }
    }

    async getConteudoById(id: number): Promise<ConteudoInterface> {
        try {
            return await this.model.getConteudoById(id);
        } catch (error) {
            throw error;
        }
    }

    async createConteudo(data: ConteudoInput): Promise<ConteudoInterface> {
        try {
            const OldConteudos = await this.model.getConteudoBySubCategoriaId(data.subCategoriaId);
            const ordem = OldConteudos.length + 1;
            data.ordem = ordem;
            return await this.model.createConteudo(data);
        } catch (error) {
            throw error;
        }
    }

    async subirOrdemConteudo(id: number): Promise<ConteudoInterface> {
        try {
            const OldConteudo = await this.model.getConteudoById(id);
            const OldConteudos = await this.model.getConteudoBySubCategoriaId(OldConteudo.subCategoriaId);
            const ordem = OldConteudos.findIndex(conteudo => conteudo.id === id);
            if (ordem === 0) {
                return OldConteudo;
            }
            const ordemAfetada = ordem - 1;
            const conteudoAfetado = OldConteudos[ordemAfetada];

            // Atualiza a ordem do conteúdo atual e do conteúdo afetado
            await Promise.all([
                this.model.updateConteudo(id, { ordem: ordemAfetada }),
                this.model.updateConteudo(conteudoAfetado.id, { ordem: ordemAfetada - 1 })
            ]);
            return await this.model.getConteudoById(id);
        } catch (error) {
            throw error;
        }
    }

    async descerOrdemConteudo(id: number): Promise<ConteudoInterface> {
        try {
            const OldConteudo = await this.model.getConteudoById(id);
            const OldConteudos = await this.model.getConteudoBySubCategoriaId(OldConteudo.subCategoriaId);
            const ordem = OldConteudos.findIndex(conteudo => conteudo.id === id);
            if (ordem === OldConteudos.length - 1) {
                return OldConteudo;
            }
            const ordemAfetada = ordem + 1;
            const conteudoAfetado = OldConteudos[ordemAfetada];

            // Atualiza a ordem do conteúdo atual e do conteúdo afetado
            await Promise.all([
                this.model.updateConteudo(id, { ordem: ordemAfetada }),
                this.model.updateConteudo(conteudoAfetado.id, { ordem: ordemAfetada + 1 })
            ]);
            return await this.model.getConteudoById(id);
        } catch (error) {
            throw error;
        }
    }

    async updateConteudo(id: number, data: ConteudoUpdateInput): Promise<ConteudoInterface> {
        try {
            return await this.model.updateConteudo(id, data);
        } catch (error) {
            throw error;
        }
    }

    async deleteConteudo(id: number): Promise<ConteudoInterface> {
        try {
            return await this.model.deleteConteudo(id);
        } catch (error) {
            throw error;
        }
    }
}