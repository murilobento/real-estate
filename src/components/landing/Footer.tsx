import Link from "next/link";
import { Building2 } from "lucide-react";

export const LandingFooter = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-lg text-white mb-4 md:mb-0">
            <Building2 className="h-6 w-6 text-teal-500" />
            <span>Imob-System</span>
          </div>
          <div className="flex space-x-6 text-sm">
            <Link href="#features" className="hover:text-white">Recursos</Link>
            <Link href="#pricing" className="hover:text-white">Preços</Link>
            <Link href="#contact" className="hover:text-white">Contato</Link>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-6 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Imob-System. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};