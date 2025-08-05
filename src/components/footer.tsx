import Link from "next/link";
import { Instagram, Facebook, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <h3 className="font-bold text-xl text-white mb-4">JR Imóveis</h3>
            <p className="text-sm mb-4 max-w-md">
              Sua parceira de confiança no mercado imobiliário. Oferecemos soluções completas para compra, venda e aluguel de imóveis.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Instagram" className="hover:text-white"><Instagram size={20} /></a>
              <a href="#" aria-label="Facebook" className="hover:text-white"><Facebook size={20} /></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-white"><Linkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg text-white mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="hover:text-white">Início</a></li>
              <li><a href="#about" className="hover:text-white">Sobre</a></li>
              <li><a href="#services" className="hover:text-white">Serviços</a></li>
              <li><a href="#properties" className="hover:text-white">Imóveis</a></li>
              <li><a href="#contact" className="hover:text-white">Contato</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg text-white mb-4">Serviços</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Compra de Imóveis</a></li>
              <li><a href="#" className="hover:text-white">Venda de Imóveis</a></li>
              <li><a href="#" className="hover:text-white">Aluguel de Imóveis</a></li>
              <li><a href="#" className="hover:text-white">Consultoria Imobiliária</a></li>
              <li><a href="#" className="hover:text-white">Avaliação de Imóveis</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} JR Imóveis. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};