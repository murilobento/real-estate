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
  const supabase = createClient();
  const { data: imobiliarias } = await supabase
    .from("imobiliarias")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email de Contato</TableHead>
                <TableHead>Data de Criação</TableHead>
                <TableHead className="text-right w-[80px]">Ações</TableHead>
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
                  <TableCell className="text-right">
                    <ImobiliariaRowActions imobiliaria={imobiliaria} />
                  </TableCell>
                </TableRow>
              ))}
              {imobiliarias?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
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