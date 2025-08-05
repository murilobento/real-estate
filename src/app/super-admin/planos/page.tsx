import { createClient } from "@/integrations/supabase/server";
import { AddPlanoForm } from "./add-plano-form";
import { PlanoRowActions } from "./plano-row-actions";
import { ShowPlanoButton } from "./show-plano-button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";

function formatBRLFromCents(cents: number) {
  const value = (cents ?? 0) / 100;
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

async function getPlanos() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("planos")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching planos:", error);
  }
  return data || [];
}

export default async function PlanosPage() {
  const planos = await getPlanos();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Planos</h1>
          <p className="text-muted-foreground">Gerencie os planos de assinatura disponíveis.</p>
        </div>
        <AddPlanoForm />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="text-right w-[140px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {planos?.map((plano: any) => (
                <TableRow key={plano.id}>
                  <TableCell className="font-medium">{plano.name}</TableCell>
                  <TableCell>{formatBRLFromCents(plano.price_cents)}</TableCell>
                  <TableCell className="max-w-[360px]">
                    <span className="line-clamp-2">{plano.description}</span>
                  </TableCell>
                  <TableCell className="text-right flex gap-2 justify-end">
                    <ShowPlanoButton plano={plano} />
                    <PlanoRowActions plano={plano} />
                  </TableCell>
                </TableRow>
              ))}
              {(!planos || planos.length === 0) && (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    Nenhum plano encontrado.
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