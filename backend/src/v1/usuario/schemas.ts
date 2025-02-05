import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

const UsuarioSchema = z.object({
    id: z.number(),
    nome: z.string(),
    email: z.string(),
    senha: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    isAdmin: z.boolean().optional(),
});

const UsuarioLoginSchema = z.object({
    email: z.string(),
    senha: z.string(),
});

const UsuarioInputSchema = z.object({
    nome: z.string(),
    email: z.string(),
    senha: z.string(),
});

const UsuarioUpdateInputSchema = z.object({
    nome: z.string().optional(),
    email: z.string().optional(),
    senha: z.string().optional(),
});

const UsuarioInputSchemaJson = zodToJsonSchema(UsuarioInputSchema);
const UsuarioUpdateInputSchemaJson = zodToJsonSchema(UsuarioUpdateInputSchema);
const UsuarioLoginSchemaJson = zodToJsonSchema(UsuarioLoginSchema);

export {
    UsuarioInputSchema,
    UsuarioUpdateInputSchema,
    UsuarioInputSchemaJson,
    UsuarioUpdateInputSchemaJson,
    UsuarioLoginSchema,
    UsuarioLoginSchemaJson,
};