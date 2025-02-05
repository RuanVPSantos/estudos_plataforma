import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

const ConteudoSchema = z.object({
    id: z.number(),
    nome: z.string(),
    tipo: z.string(),
    valor: z.string(),
    ordem: z.number(),
    subCategoriaId: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

const ConteudoInputSchema = z.object({
    nome: z.string(),
    tipo: z.string(),
    valor: z.string().optional(),
    ordem: z.number(),
    subCategoriaId: z.number(),
});

const ConteudoUpdateInputSchema = z.object({
    nome: z.string().optional(),
    tipo: z.string().optional(),
    valor: z.string().optional(),
    ordem: z.number().optional(),
    subCategoriaId: z.number().optional(),
});

const ConteudoInputSchemaJson = zodToJsonSchema(ConteudoInputSchema);
const ConteudoUpdateInputSchemaJson = zodToJsonSchema(ConteudoUpdateInputSchema);

export {
    ConteudoInputSchema,
    ConteudoUpdateInputSchema,
    ConteudoInputSchemaJson,
    ConteudoUpdateInputSchemaJson,
};