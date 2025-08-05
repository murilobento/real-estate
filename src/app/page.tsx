import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertySearchForm } from "@/components/PropertySearchForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Diamond, Eye, HeartHandshake, Home as HomeIcon, KeyRound, Phone, Mail, MapPin, Clock, Handshake, Lightbulb } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const properties = [
    {
      imageUrl: '/property-1.jpg',
      isFeatured: true,
      location: 'Casa • Jardim Europa',
      title: 'Casa Moderna com Piscina',
      type: 'sale' as const,
      price: 850000,
      bedrooms: 4,
      bathrooms: 3,
      area: 280,
    },
    {
      imageUrl: '/property-2.jpg',
      isFeatured: true,
      location: 'Apartamento • Centro',
      title: 'Apartamento Luxuoso no Centro',
      type: 'rent' as const,
      price: 3500,
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
    },
    {
      imageUrl: '/property-3.jpg',
      isFeatured: true,
      location: 'Terreno • Centro Comercial',
      title: 'Terreno Comercial Premium',
      type: 'sale' as const,
      price: 450000,
      bedrooms: 0,
      bathrooms: 0,
      area: 800,
    },
    {
      imageUrl: '/property-4.jpg',
      isFeatured: false,
      location: 'Apartamento • Jardim América',
      title: 'Apartamento Duplex',
      type: 'sale' as const,
      price: 680000,
      bedrooms: 4,
      bathrooms: 3,
      area: 180,
    },
  ];

  const services = [
    { icon: HomeIcon, title: "Compra de Imóveis", description: "Encontre o imóvel ideal para você e sua família com a nossa consultoria especializada." },
    { icon: Handshake, title: "Venda de Imóveis", description: "Anuncie seu imóvel conosco e alcance uma vasta rede de potenciais compradores." },
    { icon: KeyRound, title: "Aluguel de Imóveis", description: "Oferecemos opções de aluguel para residências e comércios, com segurança e agilidade." },
    { icon: Lightbulb, title: "Consultoria Imobiliária", description: "Conte com nossos especialistas para tomar as melhores decisões no mercado imobiliário." },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section id="home" className="relative bg-hero-pattern bg-cover bg-center h-[70vh] md:h-[80vh]">
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="container px-4 md:px-6 text-center text-white">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Encontre o Imóvel dos Seus Sonhos
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-200">
                O caminho para o seu novo lar.
              </p>
              <div className="mt-8 w-full max-w-4xl mx-auto">
                <PropertySearchForm />
              </div>
            </div>
          </div>
        </section>
        
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative w-full h-80 rounded-lg overflow-hidden">
                 <Image src="/about-image.jpg" alt="Chaves de uma casa" fill className="object-cover" />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Bem-vindo à JR Imóveis</h2>
                <div className="w-24 h-1 bg-teal-500 my-4"></div>
                <p className="text-muted-foreground mb-4">
                  Há mais de uma década no mercado imobiliário, a JR Imóveis se destaca pela excelência, transparência e compromisso com nossos clientes. Especializada em imóveis de alto padrão, oferecemos uma experiência única e personalizada, guiando você em cada etapa da jornada de encontrar o imóvel perfeito ou realizar o melhor negócio da sua vida.
                </p>
                <p className="text-muted-foreground">
                  Nossa equipe de profissionais experientes e certificados está sempre pronta para atender suas necessidades com dedicação e conhecimento técnico, garantindo que cada transação seja realizada com segurança, agilidade e total satisfação.
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-500 text-white mb-4">
                  <Diamond size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Missão</h3>
                <p className="text-muted-foreground text-sm">Proporcionar soluções imobiliárias completas e personalizadas, oferecendo consultoria especializada, transparência total e atendimento de excelência.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-500 text-white mb-4">
                  <Eye size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Visão</h3>
                <p className="text-muted-foreground text-sm">Ser reconhecida como a imobiliária de referência na região, líder em inovação, e expandindo nossa posição como parceira estratégica no mercado.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-500 text-white mb-4">
                  <HeartHandshake size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Valores</h3>
                <p className="text-muted-foreground text-sm">Ética, Transparência, Comprometimento, Inovação, Atendimento Personalizado, Responsabilidade Social e Paixão pelo que fazemos.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="properties" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="space-y-2 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Todos os Imóveis</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                {properties.length} imóveis encontrados
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {properties.map((property, index) => (
                <PropertyCard key={index} {...property} />
              ))}
            </div>
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </section>

        <section id="services" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="space-y-2 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Nossos Serviços</h2>
              <div className="w-24 h-1 bg-teal-500 mx-auto my-4"></div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service, index) => (
                <Card key={index} className="text-center p-6 flex flex-col items-center shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-100 text-teal-500 mb-4">
                    <service.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="space-y-3 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Entre em Contato</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Estamos prontos para atendê-lo. Envie sua mensagem ou venha nos visitar.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-left">Envie uma Mensagem</h3>
                <ContactForm />
              </div>
              <div className="space-y-6 text-left">
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-teal-500 mt-1" />
                  <div>
                    <h4 className="font-semibold">Telefone & WhatsApp</h4>
                    <p className="text-muted-foreground">(18) 99739-8482</p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline">Ligar</Button>
                      <Button size="sm" className="bg-green-500 hover:bg-green-600">WhatsApp</Button>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-teal-500 mt-1" />
                  <div>
                    <h4 className="font-semibold">E-mail</h4>
                    <p className="text-muted-foreground">j.r.imoveis@hotmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-teal-500 mt-1" />
                  <div>
                    <h4 className="font-semibold">Endereço</h4>
                    <p className="text-muted-foreground">Regente Feijó - SP</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-teal-500 mt-1" />
                  <div>
                    <h4 className="font-semibold">Horário de Funcionamento</h4>
                    <p className="text-muted-foreground">Segunda a Sexta: 9h às 18h</p>
                    <p className="text-muted-foreground">Sábado: 9h às 13h</p>
                  </div>
                </div>
                <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Carregando mapa...</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}