export interface SubCategoriaInterface {
    id: number;
    nome: string;
    descricao: string | null;
    categoriaId: number;
    createdAt: Date;
    updatedAt: Date;
    Conteudos?: ConteudoInterface[];
}

export interface ConteudoInterface {
    id: number;
    nome: string;
    tipo: string;
    valor: string;
    ordem: number;
    subCategoriaId: number;
    createdAt: Date;
    updatedAt: Date;
}


export interface SubCategoriaInput {
    nome: string;
    descricao?: string;
    categoriaId: number;
}

export interface SubCategoriaUpdateInput {
    nome?: string;
    descricao?: string;
    categoriaId?: number;
}