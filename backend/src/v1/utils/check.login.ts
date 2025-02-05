import { Auth } from "./auth";
import { FastifyRequest, FastifyReply } from 'fastify';
import Model from "./user.model";
import { getPrismaPrincipal } from "../utils/prisma.clients";

const model = new Model(getPrismaPrincipal());

declare module 'fastify' {
    interface FastifyRequest {
        user?: { id: number };
    }
}

export const checkLogin = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return reply.status(401).send({ message: 'Authorization token is missing' });
        }

        const { id } = await Auth.verifyToken(token);

        req.user = { id };
    } catch (error) {
        return reply.status(401).send({ message: 'Invalid token' });
    }
};

export const checkAdmin = async (req: FastifyRequest, reply: FastifyReply) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return reply.status(401).send({ message: 'Authorization token is missing' });
    }

    const { id } = await Auth.verifyToken(token);

    const usuario = await model.getUsuarioById(id);

    if (!usuario.isAdmin) {
        return reply.status(401).send({ message: 'Unauthorized' });
    }
};
