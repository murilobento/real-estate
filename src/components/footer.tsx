import { Building2 } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <a href="/" className="flex items-center space-x-2 mb-4">
              <Building2 className="h-8 w-8" />
              <span className="font-bold text-xl">Imobiliária</span>
            </a>
            <p className="text-muted-foreground">
              Seu imóvel dos sonhos está aqui.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-muted-foreground hover:text-foreground">Início</a></li>
              <li><a href="#about" className="text-muted-foreground hover:text-foreground">Sobre</a></li>
              <li><a href="#properties" className="text-muted-foreground hover:text-foreground">Imóveis</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-foreground">Contato</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <p className="text-muted-foreground">Rua Fictícia, 123, Cidade, Estado</p>
            <p className="text-muted-foreground">contato@imobiliaria.com</p>
            <p className="text-muted-foreground">(11) 99999-9999</p>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Imobiliária. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};