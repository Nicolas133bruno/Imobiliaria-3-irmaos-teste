"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { useState } from "react"

export function AuthDebug() {
  const { data: session, status, update } = useSession()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await update()
    } catch (error) {
      console.error("Erro ao atualizar sessão:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case "authenticated":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "unauthenticated":
        return <XCircle className="w-5 h-5 text-red-500" />
      case "loading":
        return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
      default:
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "authenticated":
        return "border-green-200 bg-green-50"
      case "unauthenticated":
        return "border-red-200 bg-red-50"
      case "loading":
        return "border-blue-200 bg-blue-50"
      default:
        return "border-yellow-200 bg-yellow-50"
    }
  }

  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <Card className={`mt-4 ${getStatusColor()}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <span>Debug - NextAuth Status</span>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="h-6 px-2 text-xs bg-transparent"
          >
            {isRefreshing ? <RefreshCw className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Status:</span>
            <Badge
              className={
                status === "authenticated"
                  ? "bg-green-100 text-green-800"
                  : status === "unauthenticated"
                    ? "bg-red-100 text-red-800"
                    : "bg-blue-100 text-blue-800"
              }
            >
              {status}
            </Badge>
          </div>

          {session?.user && (
            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="font-medium">Nome:</span>
                  <div className="text-gray-600">{session.user.name || "N/A"}</div>
                </div>
                <div>
                  <span className="font-medium">Email:</span>
                  <div className="text-gray-600">{session.user.email || "N/A"}</div>
                </div>
                <div>
                  <span className="font-medium">Perfil:</span>
                  <div className="text-gray-600">{session.user.perfil || "N/A"}</div>
                </div>
                <div>
                  <span className="font-medium">CRECI:</span>
                  <div className="text-gray-600">{session.user.creci || "N/A"}</div>
                </div>
              </div>
            </div>
          )}

          {status === "unauthenticated" && (
            <Alert className="border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-orange-800 text-xs">
                Usuário não autenticado. Faça login para acessar o sistema.
              </AlertDescription>
            </Alert>
          )}

          {status === "loading" && (
            <Alert className="border-blue-200 bg-blue-50">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <AlertDescription className="text-blue-800 text-xs">
                Carregando informações de autenticação...
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
