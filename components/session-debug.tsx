"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SessionDebug() {
  const { data: session, status } = useSession()

  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <Card className="mt-4 border-yellow-200 bg-yellow-50">
      <CardHeader>
        <CardTitle className="text-sm text-yellow-800">Debug - Sessão</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-yellow-700">
          <p>
            <strong>Status:</strong> {status}
          </p>
          {session && (
            <div className="mt-2">
              <p>
                <strong>Usuário:</strong> {session.user?.name}
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
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
