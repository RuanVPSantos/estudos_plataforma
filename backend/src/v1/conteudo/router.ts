
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { checkLogin } from '../utils/check.login';
import { ConteudoInputSchemaJson, ConteudoUpdateInputSchemaJson } from './schemas';
import { ConteudoInput, ConteudoUpdateInput } from './interface';
import ConteudoController from './controller';

const modelController = new ConteudoController();

async function ConteudoRouter(fastify: FastifyInstance) {
    fastify.get('/all',
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const models = await modelController.getAllConteudos();
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
                const model = await modelController.getConteudoById(parseInt(id, 10));
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
                body: ConteudoInputSchemaJson,
            },
        },
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const data = request.body as ConteudoInput;
                const model = await modelController.createConteudo(data);
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
                body: ConteudoUpdateInputSchemaJson,
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
                const data = request.body as ConteudoUpdateInput;
                const model = await modelController.updateConteudo(parseInt(id, 10), data);
                return reply.status(200).send(model);
            } catch (error) {
                console.error('Error updating model:', error);
                return reply.status(500).send({ message: 'Internal server error' });
            }
        }
    );

    fastify.put('/subir/:id',
        {
            preHandler: [checkLogin],
        },
        async (request, reply) => {
            try {
                const { id } = request.params as { id: string };
                const model = await modelController.subirOrdemConteudo(parseInt(id, 10));
                return reply.status(200).send(model);
            } catch (error) {
                console.error('Error subirOrdemConteudo:', error);
                return reply.status(500).send({ message: 'Internal server error' });
            }
        }
    );

    fastify.put('/descer/:id',
        {
            preHandler: [checkLogin],
        },
        async (request, reply) => {
            try {
                const { id } = request.params as { id: string };
                const model = await modelController.descerOrdemConteudo(parseInt(id, 10));
                return reply.status(200).send(model);
            } catch (error) {
                console.error('Error descerOrdemConteudo:', error);
                return reply.status(500).send({ message: 'Internal server error' });
            }
        }
    );

    fastify.delete('/:id',
        {
            preHandler: [checkLogin],
        },
        async (request, reply) => {
            try {
                const { id } = request.params as { id: string };
                const model = await modelController.deleteConteudo(parseInt(id, 10));
                return reply.status(200).send(model);
            } catch (error) {
                console.error('Error deleting model:', error);
                return reply.status(500).send({ message: 'Internal server error' });
            }
        }
    );
}

export default ConteudoRouter;