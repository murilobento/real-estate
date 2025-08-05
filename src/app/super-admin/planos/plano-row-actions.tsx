"use client";

import React from "react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { updatePlano, deletePlano } from "./actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormItem,
  FormControl,
  FormLabel,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Plano = {
  id: string;
  name: string;
  price_cents: number;
  description: string | null;
  features: string[] | null;
};

type FormValues = {
  name: string;
  // preço em reais (ex.: "399.90")
  price: string;
  description?: string | null;
  features?: string | null;
};

function centsToReaisString(cents: number): string {
  const v = (cents ?? 0) / 100;
  // preserva separador de ponto para edição
  return String(v.toFixed(2));
}

export function PlanoRowActions({ plano }: { plano: Plano }) {
  const [isPending, startTransition] = useTransition();
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      name: plano.name,
      price: centsToReaisString(plano.price_cents),
      description: plano.description ?? "",
      features: Array.isArray(plano.features) ? plano.features.join("\n") : "",
    },
  });

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      try {
        const normalized = (values.price ?? "").toString().trim().replace(",", ".");
        const priceNumber = Number(normalized);
        if (!Number.isFinite(priceNumber) || priceNumber < 0) {
          toast.error("Informe um preço válido em reais. Ex.: 399.90");
          return;
        }

        await updatePlano(plano.id, {
          name: values.name,
          price_cents: priceNumber, // servidor converte para centavos
          description: values.description?.trim() || "",
          features: values.features ?? "",
        } as any);

        toast.success("Plano atualizado com sucesso!");
        setIsEditOpen(false);
      } catch (e: any) {
        toast.error(e.message || "Falha ao atualizar plano.");
      }
    });
  };

  const onDelete = () => {
    startTransition(async () => {
      try {
        await deletePlano(plano.id);
        toast.success("Plano excluído com sucesso!");
        setIsDeleteOpen(false);
      } catch (e: any) {
        toast.error(e.message || "Falha ao excluir plano.");
      }
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem onSelect={() => setIsEditOpen(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setIsDeleteOpen(true)}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Editar Plano</DialogTitle>
            <DialogDescription>Atualize as informações do plano.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
              <FormField
                control={form.control}
                name="name"
                rules={{ required: "Informe o nome." }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do plano" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                rules={{ required: "Informe o preço em reais." }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço (R$)</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        inputMode="decimal"
                        placeholder="Ex.: 399.90"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Descrição do plano" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recursos (um por linha)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Cada recurso em uma linha"
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="min-h-28"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsEditOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Salvando..." : "Salvar"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Você tem certeza?</DialogTitle>
            <DialogDescription>
              Essa ação não pode ser desfeita. O plano será excluído permanentemente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-destructive hover:bg-destructive/90" onClick={onDelete} disabled={isPending}>
              {isPending ? "Excluindo..." : "Excluir"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}