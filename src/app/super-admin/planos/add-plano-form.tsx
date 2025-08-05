"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";

import { planoSchema, createPlano } from "./actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type FormValues = z.infer<typeof planoSchema>;

export function AddPlanoForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormValues>({
    resolver: zodResolver(planoSchema),
    defaultValues: {
      name: "",
      price_cents: 0,
      description: "",
      features: [],
    },
  });

  // Para abrir via Trigger controlado pelo Radix, mantemos não-controlado (abrir/fechar por default behavior).
  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      try {
        // transforma features digitadas como texto em array (uma por linha ou separadas por vírgula)
        const parsedFeatures = Array.isArray(values.features)
          ? values.features
          : typeof values.features === "string"
          ? values.features
              .split(/\r?\n|,/)
              .map((s) => s.trim())
              .filter(Boolean)
          : [];

        await createPlano({
          ...values,
          features: parsedFeatures.length ? parsedFeatures : null,
          description: values.description?.trim() || null,
        });
        toast.success("Plano criado com sucesso!");
        form.reset({ name: "", price_cents: 0, description: "", features: [] });
        // Dialog fecha automaticamente ao perder foco; mantemos simples.
      } catch (e: any) {
        toast.error(e.message || "Falha ao criar plano.");
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Plano
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Novo Plano</DialogTitle>
          <DialogDescription>Defina os detalhes do plano de assinatura.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex.: Profissional, Essencial" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price_cents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço (centavos)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      step={100}
                      placeholder="Ex.: 39900 para R$ 399,00"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
                    <Textarea placeholder="Breve descrição do plano" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Campo de features como textarea, uma por linha */}
            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recursos (um por linha)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={"Ex.: \nAté 20 usuários\nRelatórios avançados\nSuporte prioritário"}
                      value={
                        Array.isArray(field.value)
                          ? field.value.join("\n")
                          : typeof field.value === "string"
                          ? field.value
                          : ""
                      }
                      onChange={(e) => field.onChange(e.target.value)}
                      className="min-h-28"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Salvando..." : "Salvar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}