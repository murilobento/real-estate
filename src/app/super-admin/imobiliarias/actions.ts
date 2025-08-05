"use server";

import { createClient } from "@/integrations/supabase/server";
import { createAdminClient } from "@/integrations/supabase/admin";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  email_contato: z.string().email({ message: "E-mail de contato inválido." }),
  status: z.enum(["ativo", "inativo"]).default("ativo"),
  plano_id: z.string().uuid({ message: "Selecione um plano." }),
});

export async function createImobiliaria(values: z.infer<typeof formSchema>) {
  const supabase = await createClient();
  const supabaseAdmin = createAdminClient();
  const validatedFields = formSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Dados inválidos.");
  }

  const { name, email_contato, status, plano_id } = validatedFields.data;

  const { data: newImobiliaria, error: insertError } = await supabase
    .from("imobiliarias")
    .insert({ name, email_contato, status, plano_id })
    .select("id")
    .single();

  if (insertError) {
    console.error("Error creating imobiliaria:", insertError);
    throw new Error("Falha ao criar imobiliária.");
  }

  const { error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(
    email_contato,
    {
      data: {
        first_name: name,
        last_name: "Admin",
        role: "admin",
        imobiliaria_id: newImobiliaria.id,
      },
    }
  );

  if (inviteError) {
    console.error("Imobiliaria created, but failed to invite admin user:", inviteError);
    await supabase.from("imobiliarias").delete().eq("id", newImobiliaria.id);
    throw new Error(`Falha ao convidar o usuário administrador: ${inviteError.message}. A criação da imobiliária foi revertida.`);
  }

  revalidatePath("/super-admin/imobiliarias");
  revalidatePath("/super-admin/users");
}

export async function updateImobiliaria(id: string, values: z.infer<typeof formSchema>) {
  const supabase = await createClient();
  const validatedFields = formSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Dados inválidos.");
  }

  const { name, email_contato, status, plano_id } = validatedFields.data;

  const { error } = await supabase
    .from("imobiliarias")
    .update({ name, email_contato, status, plano_id })
    .eq("id", id);

  if (error) {
    console.error("Error updating imobiliaria:", error);
    throw new Error("Falha ao atualizar imobiliária.");
  }

  revalidatePath("/super-admin/imobiliarias");
}