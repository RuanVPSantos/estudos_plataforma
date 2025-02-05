
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { checkLogin } from '../utils/check.login';
import { UsuarioInputSchemaJson, UsuarioUpdateInputSchemaJson, UsuarioLoginSchemaJson } from './schemas';
import { UsuarioInput, UsuarioUpdateInput, UsuarioLogin } from './interface';
import UsuarioController from './controller';

const modelController = new UsuarioController();

async function UsuarioRouter(fastify: FastifyInstance) {
    fastify.get('/all', {
        preHandler: [checkLogin],
    },
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const models = await modelController.getAllUsuarios();
                return reply.status(200).send(models);
            } catch (error) {
                console.error('Error fetching models:', error);
                return reply.status(500).send({ message: 'Internal server error' });
            }
        }
    );

    fastify.get('/:id',
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
                const model = await modelController.getUsuarioById(parseInt(id, 10));
                return reply.status(200).send(model);
            } catch (error) {
                console.error('Error fetching model:', error);
                return reply.status(500).send({ message: 'Internal server error' });
            }
        }
    );

    fastify.post('/login',
        {
            schema: {
                body: UsuarioLoginSchemaJson,
            },
        },
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const data = request.body as UsuarioLogin;
                const model = await modelController.loginUsuario(data);
                return reply.status(200).send(model);
            } catch (error) {
                console.error('Error login:', error);
                return reply.status(500).send({ message: 'Internal server error' });
            }
        }
    );

    fastify.post('/',
        {
            preHandler: [checkLogin],
            schema: {
                body: UsuarioInputSchemaJson,
            },
        },
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const data = request.body as UsuarioInput;
                const model = await modelController.createUsuario(data);
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
                body: UsuarioUpdateInputSchemaJson,
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
                const data = request.body as UsuarioUpdateInput;
                const model = await modelController.updateUsuario(parseInt(id, 10), data);
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
                const model = await modelController.deleteUsuario(parseInt(id, 10));
                return reply.status(200).send(model);
            } catch (error) {
                console.error('Error deleting model:', error);
                return reply.status(500).send({ message: 'Internal server error' });
            }
        }
    );
}

export default UsuarioRouter;