import { z } from "zod";

export const planoSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  price_cents: z.coerce.number().int().nonnegative("Preço deve ser positivo."),
  description: z.string().optional().nullable(),
  // No client enviamos string (textarea); normalizamos no servidor
  features: z.string().optional().nullable(),
});

export type PlanoInput = z.infer<typeof planoSchema>;