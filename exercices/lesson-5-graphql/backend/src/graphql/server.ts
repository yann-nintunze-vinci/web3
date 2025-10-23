import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { RequestHandler } from "express";
import schema from "./schema";

const server = new ApolloServer({ schema: schema });
await server.start();

const middleware: RequestHandler = expressMiddleware(server);
export default middleware;
