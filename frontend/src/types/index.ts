export interface AmbienteInterface {
  id: number;
  nome: string;
  descricao: string | null;
  createdAt: Date;
  updatedAt: Date;
  Categorias?: CategoriaInterface[];
}

export interface AmbienteInputInterface {
  nome: string;
  descricao?: string;
}

export interface AmbienteUpdateInterface {
  nome?: string;
  descricao?: string;
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

export interface UsuarioUpdateInput {
  nome?: string;
  email?: string;
  senha?: string;
}