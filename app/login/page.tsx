"use client"

import type React from "react"

import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Logo } from "@/components/logo"
import { ArrowLeft, AlertCircle, Loader2, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Email ou senha incorretos")
      } else if (result?.ok) {
        // Aguardar a sessão ser criada
        const session = await getSession()
        if (session) {
          router.push("/dashboard")
        }
      }
    } catch (err) {
      setError("Erro de conexão. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const usuariosExemplo = [
    { email: "carlos@imobiliaria.com", perfil: "Administrador" },
    { email: "ana@imobiliaria.com", perfil: "Administrador" },
    { email: "marcos@imobiliaria.com", perfil: "Corretor", creci: "MG-12345" },
    { email: "juliana@imobiliaria.com", perfil: "Corretor", creci: "MG-54321" },
    { email: "roberto@imobiliaria.com", perfil: "Corretor", creci: "MG-98765" },
    { email: "fernando@gmail.com", perfil: "Cliente" },
    { email: "patricia@gmail.com", perfil: "Cliente" },
    { email: "ricardo@gmail.com", perfil: "Cliente" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao site
          </Link>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-6">
              <Logo size="lg" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">Área do Cliente</CardTitle>
            <CardDescription className="text-lg">Faça login com seu email e senha</CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            {error && (
              <Alert variant="destructive" className="mb-6 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                    required
                    className="h-12 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-lg font-medium bg-blue-600 hover:bg-blue-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>

            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-sm mb-4 text-center text-gray-700">
                👤 Usuários de Teste (senha: senha123)
              </h4>
              <div className="space-y-3 text-xs">
                {usuariosExemplo.map((usuario, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-white rounded border cursor-pointer hover:bg-blue-50"
                    onClick={() => {
                      setEmail(usuario.email)
                      setPassword("senha123")
                    }}
                  >
                    <div>
                      <p className="font-medium text-gray-900">{usuario.email}</p>
                      <p className="text-gray-600">
                        {usuario.perfil}
                        {usuario.creci && ` - ${usuario.creci}`}
                      </p>
                    </div>
                    <Button size="sm" variant="outline" className="h-6 px-2 text-xs bg-transparent">
                      Usar
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>Sistema desenvolvido por:</p>
              <p className="font-medium text-blue-600">Felipe Marques, Nicolas Bruno, Heitor Moreira</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
