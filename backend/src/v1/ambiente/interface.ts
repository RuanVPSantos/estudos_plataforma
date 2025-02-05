export interface AmbienteInterface {
    id: number;
    nome: string;
    descricao: string | null;
    createdAt: Date;
    updatedAt: Date;
    Categorias?: CategoriaInterface[];
}

export interface CategoriaInterface {
    id: number;
    nome: string;
    descricao: string | null;
    ambienteId: number;
    SubCategorias?: SubCategoriaInterface[];
    createdAt: Date;
    updatedAt: Date;
}
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

export interface AmbienteInput {
    nome: string;
    descricao?: string;
}

export interface AmbienteUpdateInput {
    nome?: string;
    descricao?: string;
}