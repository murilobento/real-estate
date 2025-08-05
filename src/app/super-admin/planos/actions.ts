"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/integrations/supabase/server";
import { planoSchema, type PlanoInput } from "./schema";

function normalizeFeatures(input: string | null | undefined): string[] | null {
  if (!input) return null;
  const parts = input
    .split(/\r?\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.length ? parts : null;
}

// Converte valor unitário (reais) para centavos com segurança
function reaisToCents(value: number | string): number {
  if (typeof value === "string") {
    const normalized = value.trim().replace(",", ".");
    const num = Number(normalized);
    if (!Number.isFinite(num)) throw new Error("Preço inválido.");
    return Math.round(num * 100);
  }
  if (!Number.isFinite(value)) throw new Error("Preço inválido.");
  return Math.round(value * 100);
}

export async function createPlano(values: PlanoInput) {
  const supabase = await createClient();

  // values.price_cents agora chega como número em reais (ex.: 399.9)
  // Validamos e depois convertimos para centavos
  const parsed = planoSchema.safeParse({
    ...values,
    // Passamos um inteiro provisório para validar shape; depois sobrescrevemos
    price_cents: 0,
  });
  if (!parsed.success) {
    throw new Error("Dados inválidos.");
  }

  const features = normalizeFeatures(values.features);
  const description = values.description?.trim() || null;
  const price_cents = reaisToCents(values.price_cents as unknown as number);

  const { error } = await supabase.from("planos").insert({
    name: values.name,
    price_cents,
    description,
    features,
  });

  if (error) {
    console.error("Error creating plano:", error);
    throw new Error("Falha ao criar plano.");
  }

  revalidatePath("/super-admin/planos");
  revalidatePath("/"); // atualiza landing
}

export async function updatePlano(id: string, values: PlanoInput) {
  const supabase = await createClient();

  const parsed = planoSchema.safeParse({
    ...values,
    price_cents: 0,
  });
  if (!parsed.success) {
    throw new Error("Dados inválidos.");
  }

  const features = normalizeFeatures(values.features);
  const description = values.description?.trim() || null;
  const price_cents = reaisToCents(values.price_cents as unknown as number);

  const { error } = await supabase
    .from("planos")
    .update({
      name: values.name,
      price_cents,
      description,
      features,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating plano:", error);
    throw new Error("Falha ao atualizar plano.");
  }

  revalidatePath("/super-admin/planos");
  revalidatePath("/");
}

export async function deletePlano(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("planos").delete().eq("id", id);

  if (error) {
    console.error("Error deleting plano:", error);
    throw new Error("Falha ao excluir plano.");
  }

  revalidatePath("/super-admin/planos");
  revalidatePath("/");
}