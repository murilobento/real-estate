import { createClient } from "@/integrations/supabase/server";
import { revalidatePath } from "next/cache";
import { UserList } from "./user-list";

export default async function SuperAdminUsersPage() {
  const supabase = createClient();

  // Fetch all users (profiles) that are not super-admins
  const { data: users, error: usersError } = await supabase
    .from("profiles")
    .select("*, imobiliarias(name)")
    .neq("role", "super-admin");

  // Fetch all imobiliarias to populate the assignment dropdown
  const { data: imobiliarias, error: imobiliariasError } = await supabase
    .from("imobiliarias")
    .select("*");

  if (usersError || imobiliariasError) {
    console.error("Error fetching data:", usersError || imobiliariasError);
    // Handle error appropriately
    return <div>Erro ao carregar os dados.</div>;
  }

  async function assignImobiliaria(userId: string, imobiliariaId: string | null) {
    "use server";
    const supabase = createClient();
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

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Usuários</h1>
        <p className="text-muted-foreground">
          Gerencie os usuários e atribua-os a uma imobiliária.
        </p>
      </div>
      <UserList
        users={users || []}
        imobiliarias={imobiliarias || []}
        assignImobiliaria={assignImobiliaria}
      />
    </div>
  );
}