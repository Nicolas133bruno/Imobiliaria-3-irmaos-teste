"use client"

import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SessionDebug } from "@/components/session-debug"
import Link from "next/link"

export default function TestAuthPage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div className="p-8">Carregando...</div>
  }

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Teste de Autenticação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {session ? (
            <div>
              <p className="text-green-600 font-semibold">✅ Autenticado com sucesso!</p>
              <p>
                <strong>Nome:</strong> {session.user?.name}
              </p>
              <p>
                <strong>Email:</strong> {session.user?.email}
              </p>
              <p>
                <strong>Perfil:</strong> {session.user?.perfil}
              </p>
              {session.user?.creci && (
                <p>
                  <strong>CRECI:</strong> {session.user.creci}
                </p>
              )}

              <div className="flex gap-4 mt-4">
                <Button asChild>
                  <Link href="/dashboard">Ir para Dashboard</Link>
                </Button>
                <Button variant="outline" onClick={() => signOut()}>
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-red-600 font-semibold">❌ Não autenticado</p>
              <Button asChild>
                <Link href="/login">Fazer Login</Link>
              </Button>
            </div>
          )}

          <SessionDebug />
        </CardContent>
      </Card>
    </div>
  )
}
