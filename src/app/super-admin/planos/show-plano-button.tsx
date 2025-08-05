"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Plano = {
  id: string;
  name: string;
  price_cents: number;
  description: string | null;
  features: string[] | null;
  created_at?: string | null;
};

function formatBRLFromCents(cents: number) {
  const value = (cents ?? 0) / 100;
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function ShowPlanoButton({ plano }: { plano: Plano }) {
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
                  {plano.features.map((f, idx) => (
                    <li key={idx} className="text-sm">{f}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm">—</p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}