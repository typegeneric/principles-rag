import { z } from "zod";

export const AutoragApiResponseSchema = z.object({
  success: z.boolean(),
  result: z.object({
    object: z.string(),
    search_query: z.string(),
    response: z.string(),
  }),
});
export type AutoragApiResponse = z.infer<typeof AutoragApiResponseSchema>;
