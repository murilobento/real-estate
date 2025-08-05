"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/integrations/supabase/server";

export const planoSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  price_cents: z.coerce.number().int().nonnegative("Preço deve ser positivo."),
  description: z.string().optional().nullable(),
  // Importante: no client enviamos SEMPRE string (textarea); normalizamos aqui
  features: z.string().optional().nullable(),
});

export type PlanoInput = z.infer<typeof planoSchema>;

function normalizeFeatures(input: string | null | undefined): string[] | null {
  if (!input) return null;
  const parts = input
    .split(/\r?\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.length ? parts : null;
}

export async function createPlano(values: PlanoInput) {
  const supabase = await createClient();
  const parsed = planoSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error("Dados inválidos.");
  }

  const features = normalizeFeatures(parsed.data.features);
  const description = parsed.data.description?.trim() || null;

  const { error } = await supabase.from("planos").insert({
    name: parsed.data.name,
    price_cents: parsed.data.price_cents,
    description,
    features,
  });

  if (error) {
    console.error("Error creating plano:", error);
    throw new Error("Falha ao criar plano.");
  }

  revalidatePath("/super-admin/planos");
}

export async function updatePlano(id: string, values: PlanoInput) {
  const supabase = await createClient();
  const parsed = planoSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error("Dados inválidos.");
  }

  const features = normalizeFeatures(parsed.data.features);
  const description = parsed.data.description?.trim() || null;

  const { error } = await supabase
    .from("planos")
    .update({
      name: parsed.data.name,
      price_cents: parsed.data.price_cents,
      description,
      features,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating plano:", error);
    throw new Error("Falha ao atualizar plano.");
  }

  revalidatePath("/super-admin/planos");
}

export async function deletePlano(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("planos").delete().eq("id", id);

  if (error) {
    console.error("Error deleting plano:", error);
    throw new Error("Falha ao excluir plano.");
  }

  revalidatePath("/super-admin/planos");
}