"use client";

import { useAuth } from "@/components/auth-provider";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LogOut, User } from "lucide-react";

export default function SettingsPage() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Configurações</h1>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <User className="w-4 h-4" />
          Perfil
        </h2>

        <div className="flex items-center gap-4 mb-6">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={64}
              height={64}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-medium text-xl">
              {user?.name?.charAt(0)}
            </div>
          )}
          <div>
            <p className="font-medium text-gray-900">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Nome
            </label>
            <Input defaultValue={user?.name} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Email
            </label>
            <Input defaultValue={user?.email} disabled />
          </div>
          <Button className="bg-violet-600 hover:bg-violet-700 text-white">
            Salvar alterações
          </Button>
        </div>

        <Separator className="my-6" />

        <div>
          <h2 className="font-semibold text-gray-900 mb-4">Conta</h2>
          <Button
            variant="outline"
            onClick={logout}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair da conta
          </Button>
        </div>
      </div>
    </div>
  );
}
