import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section id="home" className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Encontre o Imóvel dos Seus Sonhos
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    A melhor seleção de imóveis para comprar ou alugar. Atendimento personalizado para te ajudar a encontrar o lugar perfeito.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <form className="flex space-x-2">
                    <Input type="text" placeholder="Busque por cidade ou bairro" className="max-w-lg flex-1" />
                    <Button type="submit">Buscar</Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Sobre Nós</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-center">
              Somos uma imobiliária com anos de experiência, dedicada a oferecer as melhores oportunidades e um serviço de excelência para nossos clientes.
            </p>
          </div>
        </section>

        <section id="properties" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Imóveis em Destaque</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Placeholder for properties */}
              <Card><CardHeader><CardTitle>Casa Moderna</CardTitle></CardHeader><CardContent><p>3 Quartos, 2 Banheiros</p></CardContent></Card>
              <Card><CardHeader><CardTitle>Apartamento Centro</CardTitle></CardHeader><CardContent><p>2 Quartos, 1 Banheiro</p></CardContent></Card>
              <Card><CardHeader><CardTitle>Sítio Aconchegante</CardTitle></CardHeader><CardContent><p>4 Quartos, 3 Banheiros</p></CardContent></Card>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Entre em Contato</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Tem alguma dúvida ou quer agendar uma visita? Preencha o formulário abaixo.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="grid gap-4">
                <Input type="text" placeholder="Nome" />
                <Input type="email" placeholder="Email" />
                <Textarea placeholder="Sua mensagem" />
                <Button type="submit">Enviar Mensagem</Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MadeWithDyad />
    </div>
  );
}