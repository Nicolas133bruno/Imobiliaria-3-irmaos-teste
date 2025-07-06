"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Logo } from "@/components/logo"
import { useAuth } from "@/hooks/use-auth"
import { imoveis, type Imovel } from "@/lib/imoveis"
import {
  Building2,
  Search,
  MapPin,
  Bed,
  Bath,
  Car,
  Maximize,
  LogOut,
  ArrowLeft,
  Phone,
  Mail,
  Heart,
  Share2,
  Eye,
  Grid3X3,
  List,
} from "lucide-react"

export default function ImoveisPage() {
  const { user, isLoading, isAuthenticated } = useAuth()
  const [filteredImoveis, setFilteredImoveis] = useState<Imovel[]>(imoveis)
  const [searchTerm, setSearchTerm] = useState("")
  const [tipoFilter, setTipoFilter] = useState("todos")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const router = useRouter()

  useEffect(() => {
    let filtered = imoveis

    // Filtrar por corretor se for corretor
    if (user?.perfil === "Corretor") {
      filtered = filtered.filter((imovel) => imovel.corretor.nome === user.name)
    }

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(
        (imovel) =>
          imovel.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
          imovel.endereco.bairro.toLowerCase().includes(searchTerm.toLowerCase()) ||
          imovel.endereco.cidade.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtrar por tipo
    if (tipoFilter !== "todos") {
      filtered = filtered.filter((imovel) => imovel.tipo === tipoFilter)
    }

    // Filtrar por status
    if (statusFilter !== "todos") {
      filtered = filtered.filter((imovel) => imovel.status === statusFilter)
    }

    setFilteredImoveis(filtered)
  }, [searchTerm, tipoFilter, statusFilter, user])

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" })
  }

  const formatPrice = (price: number, status: string) => {
    if (status.includes("aluguel")) {
      return `R$ ${price.toLocaleString("pt-BR")}/mês`
    }
    return `R$ ${price.toLocaleString("pt-BR")}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disponível para venda":
        return "bg-green-100 text-green-800 border-green-200"
      case "Disponível para aluguel":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Vendido":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "Alugado":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
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
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/dashboard")}
                className="text-blue-600 hover:bg-blue-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Logo />
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold text-gray-900">{user.name}</p>
                <Badge
                  className={
                    user.perfil === "Administrador"
                      ? "bg-red-100 text-red-800"
                      : user.perfil === "Corretor"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                  }
                >
                  {user.perfil}
                </Badge>
              </div>
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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {user.perfil === "Cliente" ? "Encontre seu Imóvel" : "Gerenciar Imóveis"}
          </h1>
          <p className="text-gray-600">
            {user.perfil === "Cliente"
              ? "Explore nossa seleção de imóveis disponíveis"
              : `${filteredImoveis.length} imóveis encontrados`}
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar por localização, tipo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                <Select value={tipoFilter} onValueChange={setTipoFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os tipos</SelectItem>
                    <SelectItem value="Apartamento">Apartamento</SelectItem>
                    <SelectItem value="Casa">Casa</SelectItem>
                    <SelectItem value="Comercial">Comercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="Disponível para venda">Para Venda</SelectItem>
                    <SelectItem value="Disponível para aluguel">Para Aluguel</SelectItem>
                    <SelectItem value="Vendido">Vendido</SelectItem>
                    <SelectItem value="Alugado">Alugado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="flex-1"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="flex-1"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Properties Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImoveis.map((imovel) => (
              <Card key={imovel.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <Building2 className="w-16 h-16 text-blue-400" />
                  </div>
                  <Badge className={`absolute top-4 left-4 ${getStatusColor(imovel.status)}`}>
                    {imovel.status.replace("Disponível para ", "")}
                  </Badge>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button size="sm" variant="secondary" className="w-8 h-8 p-0 bg-white/90 hover:bg-white">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="w-8 h-8 p-0 bg-white/90 hover:bg-white">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Eye className="w-4 h-4 mr-2" />
                      Ver
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{imovel.descricao}</h3>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>
                        {imovel.endereco.bairro}, {imovel.endereco.cidade}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600 mb-4">
                      {formatPrice(imovel.valor, imovel.status)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4 p-3 bg-gray-50 rounded-lg">
                    {imovel.quartos > 0 && (
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        <span>{imovel.quartos}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      <span>{imovel.banheiros}</span>
                    </div>
                    <div className="flex items-center">
                      <Car className="w-4 h-4 mr-1" />
                      <span>{imovel.vagas_garagem}</span>
                    </div>
                    <div className="flex items-center">
                      <Maximize className="w-4 h-4 mr-1" />
                      <span>{imovel.area_total}m²</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{imovel.corretor.nome}</p>
                        <p className="text-xs text-gray-500">CRECI: {imovel.corretor.creci}</p>
                      </div>
                    </div>

                    {user.perfil === "Cliente" && (
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                          <Phone className="w-4 h-4 mr-2" />
                          Ligar
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Mail className="w-4 h-4 mr-2" />
                          E-mail
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredImoveis.map((imovel) => (
              <Card key={imovel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-32 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-8 h-8 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{imovel.descricao}</h3>
                        <Badge className={getStatusColor(imovel.status)}>
                          {imovel.status.replace("Disponível para ", "")}
                        </Badge>
                      </div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>
                          {imovel.endereco.bairro}, {imovel.endereco.cidade}
                        </span>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                        {imovel.quartos > 0 && (
                          <div className="flex items-center">
                            <Bed className="w-4 h-4 mr-1" />
                            <span>{imovel.quartos} quartos</span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <Bath className="w-4 h-4 mr-1" />
                          <span>{imovel.banheiros} banheiros</span>
                        </div>
                        <div className="flex items-center">
                          <Car className="w-4 h-4 mr-1" />
                          <span>{imovel.vagas_garagem} vagas</span>
                        </div>
                        <div className="flex items-center">
                          <Maximize className="w-4 h-4 mr-1" />
                          <span>{imovel.area_total}m²</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatPrice(imovel.valor, imovel.status)}
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share2 className="w-4 h-4" />
                          </Button>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredImoveis.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum imóvel encontrado</h3>
            <p className="text-gray-600">Tente ajustar os filtros para encontrar mais opções.</p>
          </div>
        )}
      </div>
    </div>
  )
}
