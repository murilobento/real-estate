import { LandingHeader } from "@/components/landing/Header";
import { LandingFooter } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Globe, LayoutTemplate, Users, Zap } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/integrations/supabase/server";

function formatBRLFromCents(cents: number) {
  const value = (cents ?? 0) / 100;
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

async function getPlanos() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("planos")
    .select("*")
    .order("price_cents", { ascending: true });
  return data || [];
}

export default async function LandingPage() {
  const features = [
    {
      icon: <Globe className="h-8 w-8 text-teal-500" />,
      title: "Site Profissional e Personalizado",
      description: "Receba um site moderno e otimizado para apresentar seus imóveis e capturar leads, totalmente integrado ao sistema de gestão.",
    },
    {
      icon: <Users className="h-8 w-8 text-teal-500" />,
      title: "Gestão Completa de Clientes (CRM)",
      description: "Gerencie seus clientes, leads e negociações em um só lugar. Acompanhe o funil de vendas e não perca nenhuma oportunidade.",
    },
    {
      icon: <LayoutTemplate className="h-8 w-8 text-teal-500" />,
      title: "Controle Total de Imóveis",
      description: "Cadastre, edite e gerencie seu portfólio de imóveis com facilidade, incluindo fotos, vídeos, detalhes e status.",
    },
    {
      icon: <Zap className="h-8 w-8 text-teal-500" />,
      title: "Automação e Agilidade",
      description: "Automatize tarefas, gerencie agendamentos e otimize a rotina da sua equipe para focar no que realmente importa: vender e alugar.",
    },
  ];

  const planos = await getPlanos();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <LandingHeader />
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 bg-secondary">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Transforme sua Imobiliária com Tecnologia de Ponta
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
              A plataforma completa que oferece um site incrível para seus clientes e um sistema de gestão poderoso para sua equipe.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" className="bg-teal-500 hover:bg-teal-600">
                Comece Agora
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Ver Recursos</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Tudo que você precisa para decolar</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Nossa plataforma foi desenhada para atender todas as necessidades de uma imobiliária moderna.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Planos flexíveis para sua necessidade</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Escolha o plano que melhor se adapta ao tamanho e momento da sua imobiliária.
              </p>
            </div>

            {planos.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                {planos.map((plano, idx) => (
                  <Card key={plano.id} className={idx === 1 ? "border-teal-500 border-2 relative" : ""}>
                    {idx === 1 && (
                      <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
                        <div className="bg-teal-500 text-white px-4 py-1 rounded-full text-sm font-semibold">Mais Popular</div>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>{plano.name}</CardTitle>
                      <CardDescription>{plano.description || "—"}</CardDescription>
                      <p className="text-4xl font-bold pt-4">
                        {formatBRLFromCents(plano.price_cents)}
                        <span className="text-lg font-normal text-muted-foreground">/mês</span>
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {Array.isArray(plano.features) && plano.features.length > 0 ? (
                        plano.features.slice(0, 6).map((f: string, i: number) => (
                          <p key={i} className="flex items-center">
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                            {f}
                          </p>
                        ))
                      ) : (
                        <p className="text-muted-foreground">Sem recursos listados.</p>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button className={idx === 1 ? "w-full bg-teal-500 hover:bg-teal-600" : "w-full"}>
                        Assinar Plano
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground">Nenhum plano disponível no momento.</div>
            )}
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}