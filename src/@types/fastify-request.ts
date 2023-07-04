// import FastifyRequest from 'fastify/types/request';
import { User } from '../domains/users/entities';

declare module 'fastify' {
  interface FastifyRequest  {
    user?: User
  }
}