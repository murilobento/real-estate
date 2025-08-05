"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Ruler, MapPin, MessageCircle, X } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Property {
  imageUrls: string[];
  location: string;
  title: string;
  type: "sale" | "rent";
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  characteristics: string[];
  amenities: string[];
  address: string;
}

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
}

export const PropertyDetailModal = ({
  property,
  onClose,
}: PropertyDetailModalProps) => {
  if (!property) return null;

  const formattedPrice =
    property.type === "sale"
      ? new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(property.price)
      : `${new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(property.price)}/mês`;

  return (
    <Dialog open={!!property} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold">{property.title}</DialogTitle>
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            {property.location}
          </div>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh]">
          <div className="p-6">
            <Carousel className="w-full mb-4">
              <CarouselContent>
                {property.imageUrls.map((url, index) => (
                  <CarouselItem key={index}>
                    <div className="relative h-64 w-full overflow-hidden rounded-lg">
                      <Image
                        src={url}
                        alt={`${property.title} - Imagem ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>

            <div className="mb-4">
              {property.type === "sale" ? (
                <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm">
                  Venda
                </Badge>
              ) : (
                <Badge className="bg-blue-500 hover:bg-blue-600 text-white text-sm">
                  Aluguel
                </Badge>
              )}
            </div>

            <p className="text-3xl font-bold text-teal-600 mb-4">{formattedPrice}</p>

            <div className="flex items-center gap-8 text-muted-foreground border-b pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Bed className="h-5 w-5 text-slate-500" />
                <span className="text-base">{property.bedrooms} Quartos</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-slate-500" />
                <span className="text-base">{property.bathrooms} Banheiros</span>
              </div>
              <div className="flex items-center gap-2">
                <Ruler className="h-5 w-5 text-slate-500" />
                <span className="text-base">{property.area}m²</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-lg mb-2">Descrição</h4>
                <p className="text-muted-foreground">{property.description}</p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Características</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 list-disc list-inside text-muted-foreground">
                  {property.characteristics.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Comodidades</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 list-disc list-inside text-muted-foreground">
                  {property.amenities.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Endereço</h4>
                <p className="text-muted-foreground">{property.address}</p>
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="bg-secondary p-4 flex justify-end items-center gap-4 border-t">
          <DialogClose asChild>
            <Button variant="outline">Fechar</Button>
          </DialogClose>
          <Button className="bg-teal-500 hover:bg-teal-600">
            <MessageCircle className="mr-2 h-5 w-5" />
            Tenho interesse
          </Button>
        </div>
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-6 w-6" />
          <span className="sr-only">Fechar</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};