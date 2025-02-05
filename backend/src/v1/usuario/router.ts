import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { checkAdmin, checkLogin } from '../utils/check.login';
import { UsuarioInputSchemaJson, UsuarioUpdateInputSchemaJson, UsuarioLoginSchemaJson } from './schemas';
import { UsuarioInput, UsuarioUpdateInput, UsuarioLogin } from './interface';
import UsuarioController from './controller';

const modelController = new UsuarioController();

async function UsuarioRouter(fastify: FastifyInstance) {
    fastify.get('/all', {
        preHandler: [checkAdmin],
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


    fastify.get('/',
        {
            preHandler: [checkLogin],
        },
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const id = (request.user as { id: number }).id;
                const models = await modelController.getUsuarioById(id);
                return reply.status(200).send(models);
            } catch (error) {
                console.error('Error fetching models:', error);
                return reply.status(500).send({ message: 'Internal server error' });
            }
        }
    );

    fastify.get('/:id',
        {
            preHandler: [checkAdmin],
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

    fastify.put('/',
        {
            preHandler: [checkLogin],
            schema: {
                body: UsuarioUpdateInputSchemaJson,
            },
        },
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const id = (request.user as { id: number }).id;
                const data = request.body as UsuarioUpdateInput;
                const model = await modelController.updateUsuario(id, data);
                return reply.status(200).send(model);
            } catch (error) {
                console.error('Error updating model:', error);
                return reply.status(500).send({ message: 'Internal server error' });
            }
        }
    );

    fastify.put('/:id',
        {
            preHandler: [checkAdmin],
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

    fastify.delete("/",
        {
            preHandler: [checkLogin],
        },
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const userId = (request.user as { id: number }).id;
                const model = await modelController.deleteUsuario(userId);
                return reply.status(200).send(model);
            } catch (error) {
                console.error('Error deleting model:', error);
                return reply.status(500).send({ message: 'Erro interno do servidor' });
            }
        }
    );

    fastify.delete('/:id',
        {
            preHandler: [checkAdmin],
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