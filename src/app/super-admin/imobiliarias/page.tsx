import { createClient } from "@/integrations/supabase/server";
import { AddImobiliariaForm } from "./add-imobiliaria-form";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ImobiliariaRowActions } from "./imobiliaria-row-actions";

export default async function ImobiliariasPage() {
  const supabase = await createClient();
  const { data: imobiliarias } = await supabase
    .from("imobiliarias")
    .select("*, planos(name)")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Imobiliárias</h1>
          <p className="text-muted-foreground">
            Gerencie as imobiliárias (tenants) cadastradas no sistema.
          </p>
        </div>
        <AddImobiliariaForm />
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email de Contato</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead>Data de Criação</TableHead>
                  <TableHead className="text-right w-[80px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {imobiliarias?.map((imobiliaria: any) => (
                  <TableRow key={imobiliaria.id}>
                    <TableCell className="font-medium">{imobiliaria.name}</TableCell>
                    <TableCell>{imobiliaria.email_contato}</TableCell>
                    <TableCell className="capitalize">{imobiliaria.status}</TableCell>
                    <TableCell>{imobiliaria.planos?.name ?? "—"}</TableCell>
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
                    <TableCell className="text-right">
                      <ImobiliariaRowActions imobiliaria={imobiliaria} />
                    </TableCell>
                  </TableRow>
                ))}
                {imobiliarias?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Nenhuma imobiliária encontrada.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}