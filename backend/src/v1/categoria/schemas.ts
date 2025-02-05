import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

const CategoriaSchema = z.object({
    id: z.number(),
    nome: z.string(),
    descricao: z.string().nullable(),
    ambienteId: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

const CategoriaInputSchema = z.object({
    nome: z.string(),
    descricao: z.string().optional(),
    ambienteId: z.number(),
});

const CategoriaUpdateInputSchema = z.object({
    nome: z.string().optional(),
    descricao: z.string().optional(),
    ambienteId: z.number().optional(),
});

const CategoriaInputSchemaJson = zodToJsonSchema(CategoriaInputSchema);
const CategoriaUpdateInputSchemaJson = zodToJsonSchema(CategoriaUpdateInputSchema);

export {
    CategoriaInputSchema,
    CategoriaUpdateInputSchema,
    CategoriaInputSchemaJson,
    CategoriaUpdateInputSchemaJson,
};