import { createClient } from "@/integrations/supabase/server";
import { AddPlanoForm } from "./add-plano-form";
import { PlanoRowActions } from "./plano-row-actions";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import React from "react";

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
              {planos?.map((plano) => (
                <TableRow key={plano.id}>
                  <TableCell className="font-medium">{plano.name}</TableCell>
                  <TableCell>{formatBRLFromCents(plano.price_cents)}</TableCell>
                  <TableCell className="max-w-[360px]">
                    <span className="line-clamp-2">{plano.description}</span>
                  </TableCell>
                  <TableCell className="text-right flex gap-2 justify-end">
                    <ShowPlanoButton plano={plano as any} />
                    <PlanoRowActions plano={plano as any} />
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

function ShowPlanoButton({ plano }: { plano: any }) {
  "use client";
  const [open, setOpen] = React.useState(false);
  const price = formatBRLFromCents(plano.price_cents);

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Ver
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[560px]">
          <DialogHeader>
            <DialogTitle>{plano.name}</DialogTitle>
            <DialogDescription>Detalhes completos do plano</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 pt-2">
            <div>
              <p className="text-sm text-muted-foreground">Preço</p>
              <p className="text-lg font-semibold">{price}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Descrição</p>
              <p className="whitespace-pre-wrap">{plano.description || "—"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Recursos</p>
              {Array.isArray(plano.features) && plano.features.length > 0 ? (
                <ul className="list-disc list-inside space-y-1">
                  {plano.features.map((f: string, idx: number) => (
                    <li key={idx} className="text-sm">{f}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm">—</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <span className="block">Criado em</span>
                <span className="font-medium text-foreground">
                  {plano.created_at ? new Date(plano.created_at).toLocaleString("pt-BR") : "—"}
                </span>
              </div>
              <div>
                <span className="block">ID</span>
                <span className="font-mono text-foreground">{plano.id}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}