import { LandingHeader } from "@/components/landing/Header";
import { LandingFooter } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Globe, LayoutTemplate, Users, Zap } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
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

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <LandingHeader />
      <main className="flex-1">
        {/* Hero Section */}
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

        {/* Features Section */}
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

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Planos flexíveis para sua necessidade</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Escolha o plano que melhor se adapta ao tamanho e momento da sua imobiliária.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Essencial</CardTitle>
                  <CardDescription>Para quem está começando</CardDescription>
                  <p className="text-4xl font-bold pt-4">R$199<span className="text-lg font-normal text-muted-foreground">/mês</span></p>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500" />Site Institucional</p>
                  <p className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500" />Até 5 Usuários</p>
                  <p className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500" />Gestão de Imóveis</p>
                  <p className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500" />CRM de Clientes</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Assinar Plano</Button>
                </CardFooter>
              </Card>
              <Card className="border-teal-500 border-2 relative">
                <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
                  <div className="bg-teal-500 text-white px-4 py-1 rounded-full text-sm font-semibold">Mais Popular</div>
                </div>
                <CardHeader>
                  <CardTitle>Profissional</CardTitle>
                  <CardDescription>Para imobiliárias em crescimento</CardDescription>
                  <p className="text-4xl font-bold pt-4">R$399<span className="text-lg font-normal text-muted-foreground">/mês</span></p>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500" />Tudo do plano Essencial</p>
                  <p className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500" />Até 20 Usuários</p>
                  <p className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500" />Agenda Integrada</p>
                  <p className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500" />Relatórios Avançados</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-teal-500 hover:bg-teal-600">Assinar Plano</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>Para grandes operações</CardDescription>
                  <p className="text-4xl font-bold pt-4">Contato</p>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500" />Tudo do plano Profissional</p>
                  <p className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500" />Usuários Ilimitados</p>
                  <p className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500" />Integrações Customizadas</p>
                  <p className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500" />Suporte Premium</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Fale Conosco</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}