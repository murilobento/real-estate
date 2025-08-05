"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type User = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  imobiliaria_id: string | null;
  imobiliarias: { name: string } | null;
};

type Imobiliaria = {
  id: string;
  name: string;
};

interface UserListProps {
  users: User[];
  imobiliarias: Imobiliaria[];
  assignImobiliaria: (
    userId: string,
    imobiliariaId: string | null
  ) => Promise<void>;
}

export function UserList({
  users,
  imobiliarias,
  assignImobiliaria,
}: UserListProps) {
  const [isPending, startTransition] = useTransition();

  const handleAssign = (userId: string, imobiliariaId: string) => {
    startTransition(async () => {
      try {
        const idToAssign = imobiliariaId === "none" ? null : imobiliariaId;
        await assignImobiliaria(userId, idToAssign);
        toast.success("Usuário atribuído com sucesso!");
      } catch (error) {
        toast.error("Falha ao atribuir imobiliária.");
        console.error(error);
      }
    });
  };

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Imobiliária Atual</TableHead>
              <TableHead className="w-[250px]">Atribuir Imobiliária</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.first_name || ""} {user.last_name || ""}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.imobiliarias?.name || (
                      <span className="text-muted-foreground">Nenhuma</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Select
                      defaultValue={user.imobiliaria_id || "none"}
                      onValueChange={(value) => handleAssign(user.id, value)}
                      disabled={isPending}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma imobiliária" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Nenhuma</SelectItem>
                        {imobiliarias.map((imobiliaria) => (
                          <SelectItem key={imobiliaria.id} value={imobiliaria.id}>
                            {imobiliaria.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  Nenhum usuário encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}