"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";

import { createPlano } from "./actions";
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

type FormValues = {
  name: string;
  price_cents: number;
  description?: string | null;
  features?: string | null;
};

export function AddPlanoForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormValues>({
    // Sem zodResolver no client
    defaultValues: {
      name: "",
      price_cents: 0,
      description: "",
      features: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      try {
        // Coerção simples no client
        const payload = {
          ...values,
          price_cents: Number.isFinite(values.price_cents) ? values.price_cents : 0,
          description: values.description?.trim() || "",
          features: values.features ?? "",
        };
        await createPlano(payload as any);
        toast.success("Plano criado com sucesso!");
        form.reset({ name: "", price_cents: 0, description: "", features: "" });
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
          <DialogDescription>Defina as informações do plano.</DialogDescription>
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
                    <Input placeholder="Ex.: Profissional, Essencial" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price_cents"
              rules={{ min: { value: 0, message: "Preço deve ser >= 0" } }}
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
            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recursos (um por linha)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={"Ex.: \nAté 20 usuários\nRelatórios avançados\nSuporte prioritário"}
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