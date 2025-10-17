import { commonValidations } from "@/common/utils/commonValidation";
import { z } from "zod";

type Transfer = z.infer<typeof TransferSchema>;

const TransferSchema = z.object({
  id: z.number().optional(),
  sourceId: z.number(),
  targetId: z.number(),
  amount: z.number(),
  date: z.date().optional(),
});

const GetTransferSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

export { Transfer, GetTransferSchema };
