import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bed, Bath, CarFront } from 'lucide-react';

interface PropertyCardProps {
  imageUrl: string;
  title: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  parking: number;
}

export const PropertyCard = ({ imageUrl, title, price, bedrooms, bathrooms, parking }: PropertyCardProps) => {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-56 w-full">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold mb-2 truncate">{title}</CardTitle>
        <p className="text-2xl font-bold text-primary mb-4">{price}</p>
        <div className="flex justify-around text-muted-foreground border-t pt-4">
          <div className="flex items-center gap-2">
            <Bed className="h-5 w-5 text-primary" />
            <span>{bedrooms}</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="h-5 w-5 text-primary" />
            <span>{bathrooms}</span>
          </div>
          <div className="flex items-center gap-2">
            <CarFront className="h-5 w-5 text-primary" />
            <span>{parking}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-secondary/50">
        <Button className="w-full">Ver Detalhes</Button>
      </CardFooter>
    </Card>
  );
};