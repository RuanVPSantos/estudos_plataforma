import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

const SubCategoriaSchema = z.object({
    id: z.number(),
    nome: z.string(),
    descricao: z.string().nullable(),
    categoriaId: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

const SubCategoriaInputSchema = z.object({
    nome: z.string(),
    descricao: z.string().optional(),
    categoriaId: z.number(),
});

const SubCategoriaUpdateInputSchema = z.object({
    nome: z.string().optional(),
    descricao: z.string().optional(),
    categoriaId: z.number().optional(),
});

const SubCategoriaInputSchemaJson = zodToJsonSchema(SubCategoriaInputSchema);
const SubCategoriaUpdateInputSchemaJson = zodToJsonSchema(SubCategoriaUpdateInputSchema);

export {
    SubCategoriaInputSchema,
    SubCategoriaUpdateInputSchema,
    SubCategoriaInputSchemaJson,
    SubCategoriaUpdateInputSchemaJson,
};