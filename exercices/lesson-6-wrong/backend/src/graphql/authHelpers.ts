import { GraphQLError } from "graphql";
import type { GraphQLContext } from "@/types/GraphQLContext";

const requireAuth = (
  context: GraphQLContext
): {
  userId: number;
  email: string;
} => {
  if (!context.user) {
    throw new GraphQLError("You must be logged in to perform this action", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }
  return context.user;
};

const requireOwnership = (
  userId: number,
  resourceOwnerId: number,
  resourceName: string = "resource"
): void => {
  if (userId !== resourceOwnerId) {
    throw new GraphQLError(
      `You don't have permission to access this ${resourceName}`,
      {
        extensions: { code: "FORBIDDEN" },
      }
    );
  }
};

export { requireAuth, requireOwnership };
