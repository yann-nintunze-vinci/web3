import type { GraphQLContext } from "@/types/GraphQLContext";
import { AuthenticationError, AuthorizationError } from "@/errors/AppErrors";

const requireAuth = (
  context: GraphQLContext
): {
  userId: number;
  email: string;
} => {
  if (!context.user) {
    throw new AuthenticationError(
      "You must be logged in to perform this action"
    );
  }
  return context.user;
};

const requireAccess = (condition: boolean, message: string): void => {
  if (!condition) {
    throw new AuthorizationError(message);
  }
};

export { requireAuth, requireAccess };
