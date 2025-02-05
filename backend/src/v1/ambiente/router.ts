
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { checkLogin } from '../utils/check.login';
import { AmbienteInputSchemaJson, AmbienteUpdateInputSchemaJson } from './schemas';
import { AmbienteInput, AmbienteUpdateInput } from './interface';
import AmbienteController from './controller';

const modelController = new AmbienteController();

async function AmbienteRouter(fastify: FastifyInstance) {
    fastify.get('/all',
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const models = await modelController.getAllAmbientes();
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
                const model = await modelController.getAmbienteById(parseInt(id, 10));
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
                body: AmbienteInputSchemaJson,
            },
        },
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const data = request.body as AmbienteInput;
                const model = await modelController.createAmbiente(data);
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
                const data = request.body as AmbienteUpdateInput;
                const model = await modelController.updateAmbiente(parseInt(id, 10), data);
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
                body: AmbienteUpdateInputSchemaJson,
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
                const model = await modelController.deleteAmbiente(parseInt(id, 10));
                return reply.status(200).send(model);
            } catch (error) {
                console.error('Error deleting model:', error);
                return reply.status(500).send({ message: 'Internal server error' });
            }
        }
    );
}

export default AmbienteRouter;