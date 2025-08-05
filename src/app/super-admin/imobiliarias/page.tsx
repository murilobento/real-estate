import { createClient } from "@/integrations/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { AddImobiliariaForm } from "./add-imobiliaria-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  email_contato: z.string().email({ message: "E-mail de contato inválido." }),
});

export default async function ImobiliariasPage() {
  const supabase = createClient();
  const { data: imobiliarias } = await supabase
    .from("imobiliarias")
    .select("*")
    .order("created_at", { ascending: false });

  async function createImobiliaria(values: z.infer<typeof formSchema>) {
    "use server";
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
      throw new Error(error.message);
    }

    revalidatePath("/super-admin/imobiliarias");
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Imobiliárias</h1>
          <p className="text-muted-foreground">
            Gerencie as imobiliárias (tenants) cadastradas no sistema.
          </p>
        </div>
        <AddImobiliariaForm createImobiliaria={createImobiliaria} />
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email de Contato</TableHead>
                <TableHead>Data de Criação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {imobiliarias?.map((imobiliaria) => (
                <TableRow key={imobiliaria.id}>
                  <TableCell className="font-medium">{imobiliaria.name}</TableCell>
                  <TableCell>{imobiliaria.email_contato}</TableCell>
                  <TableCell>
                    {new Date(imobiliaria.created_at).toLocaleDateString(
                      "pt-BR",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {imobiliarias?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    Nenhuma imobiliária encontrada.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}