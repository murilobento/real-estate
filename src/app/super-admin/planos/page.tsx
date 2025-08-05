import { createClient } from "@/integrations/supabase/server";
import { AddPlanoForm } from "./add-plano-form";
import { PlanoRowActions } from "./plano-row-actions";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";

function formatBRLFromCents(cents: number) {
  const value = (cents ?? 0) / 100;
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default async function PlanosPage() {
  const supabase = await createClient();
  const { data: planos, error } = await supabase
    .from("planos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching planos:", error);
  }

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
                <TableHead>Recursos</TableHead>
                <TableHead className="text-right w-[80px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {planos?.map((plano) => (
                <TableRow key={plano.id}>
                  <TableCell className="font-medium">{plano.name}</TableCell>
                  <TableCell>{formatBRLFromCents(plano.price_cents)}</TableCell>
                  <TableCell className="max-w-[360px]">
                    <span className="line-clamp-2">{plano.description}</span>
                  </TableCell>
                  <TableCell className="max-w-[360px]">
                    {Array.isArray(plano.features) && plano.features.length > 0 ? (
                      <ul className="list-disc list-inside space-y-0.5">
                        {plano.features.map((f: string, idx: number) => (
                          <li key={idx} className="text-sm text-muted-foreground">
                            {f}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <PlanoRowActions plano={plano as any} />
                  </TableCell>
                </TableRow>
              ))}
              {(!planos || planos.length === 0) && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
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