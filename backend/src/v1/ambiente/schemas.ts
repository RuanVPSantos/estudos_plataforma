import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

const AmbienteSchema = z.object({
    id: z.number(),
    nome: z.string(),
    descricao: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

const AmbienteInputSchema = z.object({
    nome: z.string(),
    descricao: z.string().optional(),
});

const AmbienteUpdateInputSchema = z.object({
    nome: z.string().optional(),
    descricao: z.string().optional(),
});

const AmbienteInputSchemaJson = zodToJsonSchema(AmbienteInputSchema);
const AmbienteUpdateInputSchemaJson = zodToJsonSchema(AmbienteUpdateInputSchema);

export {
    AmbienteInputSchema,
    AmbienteUpdateInputSchema,
    AmbienteInputSchemaJson,
    AmbienteUpdateInputSchemaJson,
};