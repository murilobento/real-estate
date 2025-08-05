"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const PropertySearchForm = () => {
  return (
    <Card className="p-4 sm:p-6 shadow-lg">
      <CardContent className="p-0">
        <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="operation" className="block text-sm font-medium text-gray-700 mb-1">Operação</label>
            <Select defaultValue="comprar">
              <SelectTrigger id="operation">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="comprar">Comprar</SelectItem>
                <SelectItem value="alugar">Alugar</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Imóvel</label>
            <Select defaultValue="todos">
              <SelectTrigger id="type">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="apartamento">Apartamento</SelectItem>
                <SelectItem value="casa">Casa</SelectItem>
                <SelectItem value="terreno">Terreno</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
            <Select>
              <SelectTrigger id="city">
                <SelectValue placeholder="Selecione a Cidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cidade1">Regente Feijó</SelectItem>
                <SelectItem value="cidade2">Presidente Prudente</SelectItem>
                <SelectItem value="cidade3">Álvares Machado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 h-10">Buscar</Button>
        </form>
      </CardContent>
    </Card>
  );
};