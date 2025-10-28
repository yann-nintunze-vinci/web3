import { GraphQLError, GraphQLFormattedError } from "graphql";
import { AppError } from "../errors/AppErrors";
import { env } from "@/common/utils/envConfig";

const formatError = (
  formattedError: GraphQLFormattedError,
  error: unknown
): GraphQLFormattedError => {
  // Log error for debugging (in production, use proper logging service)
  console.error("GraphQL Error:", error);

  // Extract fields in GraphQLError
  const originalError =
    error instanceof GraphQLError ? error.originalError : undefined;
  const errorStack = error instanceof GraphQLError ? error.stack : undefined;
  const { locations, path, message, extensions } = formattedError;

  // Handle our custom AppErrors
  if (originalError instanceof AppError) {
    return {
      message: originalError.message,
      extensions: {
        code: originalError.code,
        statusCode: originalError.statusCode,
      },
      locations,
      path,
    };
  }

  // Handle Prisma errors
  if (originalError?.name === "PrismaClientKnownRequestError") {
    const prismaError = originalError as any;

    if (prismaError.code === "P2002") {
      return {
        message: "A record with this unique field already exists",
        extensions: { code: "CONFLICT", statusCode: 409 },
      };
    }

    if (prismaError.code === "P2025") {
      return {
        message: "Record not found",
        extensions: { code: "NOT_FOUND", statusCode: 404 },
      };
    }
  }

  // Don't expose internal errors in production
  if (env.isProduction) {
    return {
      message: "An unexpected error occurred",
      extensions: { code: "INTERNAL_SERVER_ERROR" },
    };
  }

  // In development, return full error details
  return {
    message: message || "An unexpected error occurred",
    extensions: {
      code: extensions?.code || "INTERNAL_SERVER_ERROR",
      ...(env.isDevelopment && { stack: errorStack }),
    },
    locations,
    path,
  };
};

export { formatError };
