import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import * as expenseRepository from "@/api/expense/expenseRepository";

const typeDefs = `#graphql
type User {
  id: ID!
  name: String!
  email: String
  bankAccount: String
}

type Expense {
  id: ID!
  description: String!
  amount: Float!
  date: String!
  payer: User!
  participants: [User!]!
}

type Query {
  expense(id: ID!): Expense
}
   `;

const resolvers = {
  Query: {
    expense: async (_parent: any, args: any, _context: any) =>
      expenseRepository.getExpenseById(Number(args.id)),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();

export default expressMiddleware(server);
