import { createClient } from "@/integrations/supabase/server";
import { createAdminClient } from "@/integrations/supabase/admin";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { UserList } from "./user-list";
import { AddUserForm } from "./add-user-form";

const userFormSchema = z.object({
  firstName: z.string().min(2, "O nome é obrigatório."),
  lastName: z.string().min(2, "O sobrenome é obrigatório."),
  email: z.string().email("E-mail inválido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export default async function SuperAdminUsersPage() {
  const supabase = await createClient();

  const { data: users, error: usersError } = await supabase
    .from("profiles")
    .select("*, imobiliarias(name)")
    .neq("role", "super-admin")
    .order("email");

  const { data: imobiliarias, error: imobiliariasError } = await supabase
    .from("imobiliarias")
    .select("*")
    .order("name");

  if (usersError || imobiliariasError) {
    console.error("Error fetching data:", usersError || imobiliariasError);
    return <div>Erro ao carregar os dados.</div>;
  }

  async function assignImobiliaria(userId: string, imobiliariaId: string | null) {
    "use server";
    const supabase = await createClient();
    const { error } = await supabase
      .from("profiles")
      .update({ imobiliaria_id: imobiliariaId })
      .eq("id", userId);

    if (error) {
      console.error("Error assigning imobiliaria:", error);
      throw new Error("Falha ao atribuir imobiliária.");
    }
    revalidatePath("/super-admin/users");
  }

  async function createUser(values: z.infer<typeof userFormSchema>) {
    "use server";
    const supabaseAdmin = createAdminClient();
    const validatedFields = userFormSchema.safeParse(values);

    if (!validatedFields.success) {
      throw new Error("Dados inválidos.");
    }
    
    const { email, password, firstName, lastName } = validatedFields.data;

    const { error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        first_name: firstName,
        last_name: lastName,
      },
    });

    if (error) {
      console.error("Error creating user:", error);
      throw new Error(error.message);
    }

    revalidatePath("/super-admin/users");
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Usuários</h1>
          <p className="text-muted-foreground">
            Gerencie os usuários e atribua-os a uma imobiliária.
          </p>
        </div>
        <AddUserForm createUser={createUser} />
      </div>
      <UserList
        users={users || []}
        imobiliarias={imobiliarias || []}
        assignImobiliaria={assignImobiliaria}
      />
    </div>
  );
}