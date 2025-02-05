export interface CategoriaInterface {
    id: number;
    nome: string;
    descricao: string | null;
    ambienteId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface CategoriaInput {
    nome: string;
    descricao?: string;
    ambienteId: number;
}

export interface CategoriaUpdateInput {
    nome?: string;
    descricao?: string;
    ambienteId?: number;
}