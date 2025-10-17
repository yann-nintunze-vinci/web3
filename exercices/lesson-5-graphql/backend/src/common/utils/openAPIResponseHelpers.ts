import { z } from "zod";

const successResponse = (schema: z.ZodTypeAny) => ({
  200: {
    description: "Success",
    content: {
      "application/json": {
        schema,
      },
    },
  },
});

export { successResponse };
