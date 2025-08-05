import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bed, Bath, Ruler } from 'lucide-react';

interface PropertyCardProps {
  imageUrl: string;
  isFeatured?: boolean;
  location: string;
  title: string;
  type: 'sale' | 'rent';
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
}

export const PropertyCard = ({ 
  imageUrl, 
  isFeatured,
  location,
  title, 
  type,
  price, 
  bedrooms, 
  bathrooms, 
  area 
}: PropertyCardProps) => {
  const formattedPrice = type === 'sale'
    ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
    : `${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}/mês`;

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
      <CardHeader className="p-0 relative">
        <div className="relative h-56 w-full">
          <Image src={imageUrl} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        {isFeatured && (
          <Badge variant="destructive" className="absolute top-3 right-3">DESTAQUE</Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <p className="text-sm text-muted-foreground">{location}</p>
        <h3 className="text-lg font-semibold truncate">{title}</h3>
        
        <div>
          {type === 'sale' ? (
            <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">Venda</Badge>
          ) : (
            <Badge className="bg-blue-500 hover:bg-blue-600 text-white">Aluguel</Badge>
          )}
        </div>

        <p className="text-2xl font-bold text-slate-800">{formattedPrice}</p>
        
        <div className="flex justify-between items-center text-muted-foreground border-t pt-3">
          <div className="flex items-center gap-2">
            <Bed className="h-4 w-4 text-slate-500" />
            <span className="text-sm">{bedrooms}</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="h-4 w-4 text-slate-500" />
            <span className="text-sm">{bathrooms}</span>
          </div>
          <div className="flex items-center gap-2">
            <Ruler className="h-4 w-4 text-slate-500" />
            <span className="text-sm">{area}m²</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};