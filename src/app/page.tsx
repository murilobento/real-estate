import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const featuredProperties = [
    {
      imageUrl: '/property-1.jpg',
      title: 'Apartamento Moderno no Centro',
      price: 'R$ 750.000',
      bedrooms: 3,
      bathrooms: 2,
      parking: 2,
    },
    {
      imageUrl: '/property-2.jpg',
      title: 'Casa com Piscina e Jardim',
      price: 'R$ 1.200.000',
      bedrooms: 4,
      bathrooms: 3,
      parking: 4,
    },
    {
      imageUrl: '/property-3.jpg',
      title: 'Cobertura Duplex com Vista',
      price: 'R$ 2.500.000',
      bedrooms: 3,
      bathrooms: 4,
      parking: 3,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="relative bg-hero-pattern bg-cover bg-center h-[60vh] md:h-[70vh]">
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="container px-4 md:px-6 text-center text-white">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Encontre o Imóvel dos Seus Sonhos
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-200">
                A melhor seleção de imóveis para comprar ou alugar. Atendimento personalizado para te ajudar a encontrar o lugar perfeito.
              </p>
              <div className="mt-8 w-full max-w-2xl mx-auto">
                <form className="flex flex-col sm:flex-row gap-2">
                  <Input type="text" placeholder="Busque por cidade, bairro ou código" className="flex-1 bg-white/90 text-black placeholder:text-gray-500 border-transparent focus:ring-2 focus:ring-primary" />
                  <Button type="submit" size="lg">Buscar</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Sobre Nós</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Somos uma imobiliária com anos de experiência, dedicada a oferecer as melhores oportunidades e um serviço de excelência para nossos clientes. Nossa missão é conectar pessoas aos seus lares ideais com transparência, confiança e profissionalismo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Properties Section */}
        <section id="properties" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="space-y-2 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Imóveis em Destaque</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Confira algumas das nossas melhores ofertas.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProperties.map((property, index) => (
                <PropertyCard key={index} {...property} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-8 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Entre em Contato</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Tem alguma dúvida ou quer agendar uma visita? Preencha o formulário abaixo e nossa equipe retornará o mais breve possível.
              </p>
            </div>
            <div className="mx-auto w-full max-w-lg">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}