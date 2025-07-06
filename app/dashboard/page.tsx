"use client"

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Logo } from "@/components/logo"
import { useAuth } from "@/hooks/use-auth"
import {
  Building2,
  Users,
  Calendar,
  FileText,
  LogOut,
  Home,
  DollarSign,
  TrendingUp,
  Settings,
  Bell,
  Search,
  Plus,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Logo size="lg" />
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Logo size="lg" />
          <p className="mt-4 text-gray-600">Redirecionando para login...</p>
        </div>
      </div>
    )
  }

  const getPerfilColor = (perfil: string) => {
    switch (perfil) {
      case "Administrador":
        return "bg-red-100 text-red-800"
      case "Corretor":
        return "bg-blue-100 text-blue-800"
      case "Cliente":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-600">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600">
                <Bell className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {user.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <div className="flex items-center space-x-2">
                    <Badge className={getPerfilColor(user.perfil)}>{user.perfil}</Badge>
                    {user.creci && <span className="text-xs text-gray-500">CRECI: {user.creci}</span>}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-gray-600">
                <Settings className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo de volta, {user.name?.split(" ")[0]}! 👋</h1>
          <p className="text-gray-600">
            {user.perfil === "Administrador" && "Gerencie todo o sistema da imobiliária"}
            {user.perfil === "Corretor" && `CRECI: ${user.creci} - Gerencie seus imóveis e clientes`}
            {user.perfil === "Cliente" && "Encontre o imóvel dos seus sonhos"}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Button className="h-16 bg-blue-600 hover:bg-blue-700 flex-col space-y-1" asChild>
            <Link href="/imoveis">
              <Plus className="w-5 h-5" />
              <span>Ver Imóveis</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-16 flex-col space-y-1 bg-transparent">
            <Users className="w-5 h-5" />
            <span>Clientes</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col space-y-1 bg-transparent">
            <Calendar className="w-5 h-5" />
            <span>Visitas</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col space-y-1 bg-transparent" asChild>
            <Link href="/relatorios">
              <FileText className="w-5 h-5" />
              <span>Relatórios</span>
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total de Imóveis</CardTitle>
              <Home className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10</div>
              <p className="text-xs opacity-90">Cadastrados no sistema</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Vendas do Mês</CardTitle>
              <DollarSign className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 2.4M</div>
              <p className="text-xs opacity-90">Baseado nos contratos</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Visitas Realizadas</CardTitle>
              <Calendar className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10</div>
              <p className="text-xs opacity-90">Total no sistema</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Usuários</CardTitle>
              <Users className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10</div>
              <p className="text-xs opacity-90">Cadastrados</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Properties */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Imóveis Recentes</span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/imoveis">Ver todos</Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: 1, desc: "Apartamento 2 Quartos", local: "Martins, Uberlândia", valor: "R$ 250.000" },
                    { id: 2, desc: "Apartamento 3 Quartos", local: "Laranjeiras, Uberlândia", valor: "R$ 450.000" },
                    { id: 3, desc: "Casa 4 Quartos", local: "Santa Mônica, Uberlândia", valor: "R$ 650.000" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                      <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.desc}</h4>
                        <p className="text-sm text-gray-600">{item.local}</p>
                        <p className="text-sm font-medium text-blue-600">{item.valor}</p>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        Disponível
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Atividades Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "Nova visita agendada", time: "2 horas atrás", type: "visit" },
                    { action: "Imóvel adicionado", time: "4 horas atrás", type: "property" },
                    { action: "Cliente cadastrado", time: "1 dia atrás", type: "client" },
                    { action: "Contrato assinado", time: "2 dias atrás", type: "contract" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        {activity.type === "visit" && <Calendar className="w-4 h-4 text-blue-600" />}
                        {activity.type === "property" && <Home className="w-4 h-4 text-blue-600" />}
                        {activity.type === "client" && <Users className="w-4 h-4 text-blue-600" />}
                        {activity.type === "contract" && <FileText className="w-4 h-4 text-blue-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo Rápido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Imóveis Ativos</span>
                  <span className="font-semibold">6</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Em Negociação</span>
                  <span className="font-semibold">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Vendidos</span>
                  <span className="font-semibold">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Alugados</span>
                  <span className="font-semibold">1</span>
                </div>
              </CardContent>
            </Card>

            {/* Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Sistema Funcionando</span>
                    <span className="font-semibold text-green-600">✅ 100%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Dados Carregados</span>
                    <span className="font-semibold text-blue-600">✅ OK</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Autenticação</span>
                    <span className="font-semibold text-purple-600">✅ Ativa</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
