"use server";

import { createClient } from "@/integrations/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  email_contato: z.string().email({ message: "E-mail de contato inválido." }),
});

export async function createImobiliaria(values: z.infer<typeof formSchema>) {
  const supabase = createClient();
  const validatedFields = formSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Dados inválidos.");
  }

  const { name, email_contato } = validatedFields.data;

  const { error } = await supabase
    .from("imobiliarias")
    .insert({ name, email_contato });

  if (error) {
    console.error("Error creating imobiliaria:", error);
    throw new Error("Falha ao criar imobiliária.");
  }

  revalidatePath("/super-admin/imobiliarias");
}

export async function updateImobiliaria(id: string, values: z.infer<typeof formSchema>) {
  const supabase = createClient();
  const validatedFields = formSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Dados inválidos.");
  }

  const { name, email_contato } = validatedFields.data;

  const { error } = await supabase
    .from("imobiliarias")
    .update({ name, email_contato })
    .eq("id", id);

  if (error) {
    console.error("Error updating imobiliaria:", error);
    throw new Error("Falha ao atualizar imobiliária.");
  }

  revalidatePath("/super-admin/imobiliarias");
}

export async function deleteImobiliaria(id: string) {
  const supabase = createClient();

  // Desassocia usuários da imobiliária antes de excluí-la
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ imobiliaria_id: null })
    .eq('imobiliaria_id', id);

  if (updateError) {
    console.error('Error un-assigning users:', updateError);
    throw new Error('Falha ao desassociar usuários antes de excluir a imobiliária.');
  }

  // Exclui a imobiliária
  const { error: deleteError } = await supabase
    .from("imobiliarias")
    .delete()
    .eq("id", id);

  if (deleteError) {
    console.error("Error deleting imobiliaria:", deleteError);
    throw new Error("Falha ao excluir imobiliária.");
  }

  revalidatePath("/super-admin/imobiliarias");
}