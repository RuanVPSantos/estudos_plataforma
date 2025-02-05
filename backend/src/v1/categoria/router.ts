
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { checkLogin } from '../utils/check.login';
import { CategoriaInputSchemaJson, CategoriaUpdateInputSchemaJson } from './schemas';
import { CategoriaInput, CategoriaUpdateInput } from './interface';
import CategoriaController from './controller';

const modelController = new CategoriaController();

async function CategoriaRouter(fastify: FastifyInstance) {
    fastify.get('/all',
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const models = await modelController.getAllCategorias();
                return reply.status(200).send(models);
            } catch (error) {
                console.error('Error fetching models:', error);
                return reply.status(500).send({ message: 'Internal server error' });
            }
        }
    );

    fastify.get('/:id',
        {
            schema: {
                params: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                    },
                    required: ['id'],
                },
            },
        },
        async (request, reply) => {
            try {
                const { id } = request.params as { id: string };
                const model = await modelController.getCategoriaById(parseInt(id, 10));
                return reply.status(200).send(model);
            } catch (error) {
                console.error('Error fetching model:', error);
                return reply.status(500).send({ message: 'Internal server error' });
            }
        }
    );

    fastify.post('/',
        {
            preHandler: [checkLogin],
            schema: {
                body: CategoriaInputSchemaJson,
            },
        },
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const data = request.body as CategoriaInput;
                const model = await modelController.createCategoria(data);
                return reply.status(200).send(model);
            } catch (error) {
                console.error('Error creating model:', error);
                return reply.status(500).send({ message: 'Internal server error' });
            }
        }
    );

    fastify.put('/:id',
        {
            preHandler: [checkLogin],
            schema: {
                body: CategoriaUpdateInputSchemaJson,
                params: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                    },
                    required: ['id'],
                },
            },
        },
        async (request, reply) => {
            try {
                const { id } = request.params as { id: string };
                const data = request.body as CategoriaUpdateInput;
                const model = await modelController.updateCategoria(parseInt(id, 10), data);
                return reply.status(200).send(model);
            } catch (error) {
                console.error('Error updating model:', error);
                return reply.status(500).send({ message: 'Internal server error' });
            }
        }
    );

    fastify.delete('/:id',
        {
            preHandler: [checkLogin],
            schema: {
                params: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                    },
                    required: ['id'],
                },
            },
        },
        async (request, reply) => {
            try {
                const { id } = request.params as { id: string };
                const model = await modelController.deleteCategoria(parseInt(id, 10));
                return reply.status(200).send(model);
            } catch (error) {
                console.error('Error deleting model:', error);
                return reply.status(500).send({ message: 'Internal server error' });
            }
        }
    );
}

export default CategoriaRouter;