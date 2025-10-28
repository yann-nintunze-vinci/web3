import { CombinedGraphQLErrors } from "@apollo/client";
import { toast } from "sonner";

const getErrorMessage = (error: unknown): string => {
  if (CombinedGraphQLErrors.is(error)) {
    // Handle GraphQL errors
    if (error.errors.length > 0) {
      const firstError = error.errors[0];
      return firstError.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
};

const getErrorCode = (error: unknown): string | undefined => {
  if (CombinedGraphQLErrors.is(error) && error.errors.length > 0) {
    return error.errors[0].extensions?.code as string;
  }
  return undefined;
};

const displayError = (error: unknown): void => {
  const message = getErrorMessage(error);
  const code = getErrorCode(error);

  // Customize toast based on error code
  if (code === "UNAUTHENTICATED") {
    toast.error("Please log in to continue", { duration: 3000 });
  } else if (code === "FORBIDDEN") {
    toast.error("You don't have permission to perform this action", {
      duration: 3000,
    });
  } else if (code === "NOT_FOUND") {
    toast.error("The requested resource was not found", { duration: 3000 });
  } else {
    toast.error(message, { duration: 5000 });
  }
};

export { getErrorMessage, getErrorCode, displayError };
