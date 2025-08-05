import { Building2 } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-secondary border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <Building2 className="h-6 w-6" />
            <span className="font-bold text-lg">Imobiliária</span>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground">Sobre</a>
            <a href="#properties" className="text-sm text-muted-foreground hover:text-foreground">Imóveis</a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground">Contato</a>
          </nav>
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Imobiliária. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};