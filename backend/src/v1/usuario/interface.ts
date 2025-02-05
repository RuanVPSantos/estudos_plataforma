export interface UsuarioInterface {
    id: number;
    nome: string;
    email: string;
    senha: string;
    createdAt: Date;
    updatedAt: Date;
    isAdmin: boolean;
}

export interface UsuarioLogin {
    email: string;
    senha: string;
}

export interface UsuarioLoginResponse {
    token: string;
}

export interface UsuarioInput {
    nome: string;
    email: string;
    senha: string;
}

export interface UsuarioUpdateInput {
    nome?: string;
    email?: string;
    senha?: string;
}