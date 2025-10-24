interface GraphQLContext {
  user?: {
    userId: number;
    email: string;
  };
}

export type { GraphQLContext };
