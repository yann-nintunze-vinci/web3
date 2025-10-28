import { useState } from "react";
import { displayError } from "@/utils/errorUtils";

const useAsyncOperation = <T>() => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = async (operation: () => Promise<T>): Promise<T | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await operation();
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error);
      displayError(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { execute, isLoading, error };
};

export { useAsyncOperation };
