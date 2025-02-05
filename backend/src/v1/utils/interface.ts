export interface UsuarioInterface {
    id: number;
    nome: string;
    email: string;
    senha: string;
    createdAt: Date;
    updatedAt: Date;
    isAdmin: boolean;
}