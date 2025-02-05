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

export interface ConteudoInput {
    nome: string;
    tipo: string;
    valor: string;
    ordem: number;
    subCategoriaId: number;
}

export interface ConteudoUpdateInput {
    nome?: string;
    tipo?: string;
    valor?: string;
    ordem?: number;
    subCategoriaId?: number;
}