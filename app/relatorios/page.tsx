"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/logo"
import { ArrowLeft, LogOut, FileText, Users, Building2, DollarSign, Calendar, TrendingUp, Download } from "lucide-react"
import {
  usuarios,
  corretores,
  imoveis,
  statusImovel,
  enderecos,
  contratosAluguel,
  contratosVenda,
  visitas,
  perfis,
} from "@/lib/database"

export default function RelatoriosPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [relatorios, setRelatorios] = useState<any>({})

  useEffect(() => {
    if (status === "loading") return
    if (!session) {
      router.push("/login")
      return
    }

    // Gerar relatórios baseados nas consultas SQL do documento
    generateReports()
  }, [session, status, router])

  const generateReports = () => {
    // 1. Consulta: Usuários que são corretores
    const usuariosCorretores = usuarios.filter((usuario) =>
      corretores.some((corretor) => corretor.fk_usuario_id === usuario.id_usuario),
    )

    // 2. Consulta: Imóveis disponíveis para venda
    const imoveisVenda = imoveis
      .filter((imovel) => {
        const status = statusImovel.find((s) => s.id_status === imovel.fk_id_status)
        return status?.descricao_status === "Disponível para venda"
      })
      .map((imovel) => ({
        ...imovel,
        status: statusImovel.find((s) => s.id_status === imovel.fk_id_status),
        endereco: enderecos.find((e) => e.id_endereco === imovel.fk_id_endereco),
        corretor: corretores.find((c) => c.id_corretor === imovel.fk_id_corretor),
      }))

    // 3. Consulta: Contratos de aluguel com valor > 1500
    const contratosAluguelAltos = contratosAluguel.filter((contrato) => contrato.valor_mensalidade > 1500)

    // Estatísticas gerais
    const estatisticas = {
      totalUsuarios: usuarios.length,
      totalCorretores: corretores.length,
      totalImoveis: imoveis.length,
      totalVisitas: visitas.length,
      totalContratosAluguel: contratosAluguel.length,
      totalContratosVenda: contratosVenda.length,
      imoveisDisponiveis: imoveis.filter((i) => i.fk_id_status === 1 || i.fk_id_status === 2).length,
      imoveisVendidos: imoveis.filter((i) => i.fk_id_status === 3).length,
      imoveisAlugados: imoveis.filter((i) => i.fk_id_status === 4).length,
    }

    // Relatórios por perfil
    const usuariosPorPerfil = perfis.map((perfil) => ({
      ...perfil,
      quantidade: usuarios.filter((u) => u.fk_Perfil_id === perfil.id_Perf).length,
    }))

    // Imóveis por tipo
    const imoveisPorTipo = imoveis.reduce(
      (acc, imovel) => {
        acc[imovel.tipo] = (acc[imovel.tipo] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    setRelatorios({
      usuariosCorretores,
      imoveisVenda,
      contratosAluguelAltos,
      estatisticas,
      usuariosPorPerfil,
      imoveisPorTipo,
    })
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" })
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Logo size="lg" />
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!session?.user) {
    return null
  }

  const user = session.user

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Relatórios do Sistema</h1>
          <p className="text-gray-600">Consultas e análises baseadas no banco de dados do projeto</p>
        </div>

        {/* Estatísticas Gerais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{relatorios.estatisticas?.totalUsuarios || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Corretores</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{relatorios.estatisticas?.totalCorretores || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Imóveis</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{relatorios.estatisticas?.totalImoveis || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visitas Realizadas</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{relatorios.estatisticas?.totalVisitas || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Consultas SQL do Documento */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Consulta 1: Usuários que são Corretores */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Usuários Corretores
              </CardTitle>
              <p className="text-sm text-gray-600">
                SELECT * FROM Usuario WHERE id_usuario IN (SELECT fk_usuario_id FROM Corretor)
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {relatorios.usuariosCorretores?.map((usuario: any) => (
                  <div key={usuario.id_usuario} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{usuario.nome}</p>
                      <p className="text-sm text-gray-600">{usuario.email}</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Corretor</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Consulta 2: Imóveis Disponíveis para Venda */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="w-5 h-5 mr-2" />
                Imóveis para Venda
              </CardTitle>
              <p className="text-sm text-gray-600">
                SELECT i.id_imovel, i.tipo, i.valor, s.descricao_status FROM Imovel i JOIN Status_Imovel s WHERE
                s.descricao_status = 'Disponível para venda'
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {relatorios.imoveisVenda?.slice(0, 5).map((imovel: any) => (
                  <div key={imovel.id_imovel} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{imovel.desc_tipo_imovel}</p>
                      <p className="text-sm text-gray-600">{imovel.endereco?.bairro}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">R$ {imovel.valor.toLocaleString("pt-BR")}</p>
                      <Badge className="bg-green-100 text-green-800">Venda</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Consulta 3: Contratos de Aluguel > R$ 1500 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Contratos de Aluguel Acima de R$ 1.500
            </CardTitle>
            <p className="text-sm text-gray-600">
              SELECT id_contrato_alug, valor_mensalidade FROM Contrato_Aluguel WHERE valor_mensalidade {">"} 1500
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatorios.contratosAluguelAltos?.map((contrato: any) => (
                <div key={contrato.id_contrato_alug} className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Contrato #{contrato.id_contrato_alug}</span>
                    <Badge className="bg-blue-100 text-blue-800">{contrato.tipo}</Badge>
                  </div>
                  <div className="mt-2">
                    <p className="text-lg font-bold text-blue-600">
                      R$ {contrato.valor_mensalidade.toLocaleString("pt-BR")}/mês
                    </p>
                    <p className="text-xs text-gray-500">
                      {contrato.data_inicio} - {contrato.data_fim}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Análises Adicionais */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Usuários por Perfil */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Usuários por Perfil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {relatorios.usuariosPorPerfil?.map((perfil: any) => (
                  <div key={perfil.id_Perf} className="flex items-center justify-between">
                    <span className="text-gray-700">{perfil.tipo_perf}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${(perfil.quantidade / (relatorios.estatisticas?.totalUsuarios || 1)) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="font-bold text-blue-600">{perfil.quantidade}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Imóveis por Tipo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="w-5 h-5 mr-2" />
                Imóveis por Tipo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(relatorios.imoveisPorTipo || {}).map(([tipo, quantidade]) => (
                  <div key={tipo} className="flex items-center justify-between">
                    <span className="text-gray-700">{tipo}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{
                            width: `${((quantidade as number) / (relatorios.estatisticas?.totalImoveis || 1)) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="font-bold text-green-600">{quantidade as number}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Export Button */}
        <div className="mt-8 text-center">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Exportar Relatórios
          </Button>
        </div>
      </div>
    </div>
  )
}
