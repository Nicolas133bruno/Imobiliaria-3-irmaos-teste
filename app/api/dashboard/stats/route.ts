import { type NextRequest, NextResponse } from "next/server"
import { imoveis, usuarios, visitas, contratosAluguel, contratosVenda } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const corretor_id = searchParams.get("corretor_id")

    // Estatísticas gerais
    let imoveisParaAnalise = imoveis
    let visitasParaAnalise = visitas

    // Filtrar por corretor se especificado
    if (corretor_id) {
      imoveisParaAnalise = imoveis.filter((i) => i.fk_id_corretor === Number.parseInt(corretor_id))
      visitasParaAnalise = visitas.filter((v) => v.fk_id_corretor === Number.parseInt(corretor_id))
    }

    const stats = {
      totalImoveis: imoveisParaAnalise.length,
      imoveisVenda: imoveisParaAnalise.filter((i) => i.fk_id_status === 1).length,
      imoveisAluguel: imoveisParaAnalise.filter((i) => i.fk_id_status === 2).length,
      imoveisVendidos: imoveisParaAnalise.filter((i) => i.fk_id_status === 3).length,
      imoveisAlugados: imoveisParaAnalise.filter((i) => i.fk_id_status === 4).length,
      totalUsuarios: usuarios.length,
      totalClientes: usuarios.filter((u) => u.fk_Perfil_id === 3).length,
      totalCorretores: usuarios.filter((u) => u.fk_Perfil_id === 2).length,
      totalVisitas: visitasParaAnalise.length,
      visitasRealizadas: visitasParaAnalise.filter((v) => v.status_visita === "Realizada").length,
      visitasAgendadas: visitasParaAnalise.filter((v) => v.status_visita === "Agendada").length,
      totalContratosAluguel: contratosAluguel.length,
      totalContratosVenda: contratosVenda.length,
      valorMedioVenda:
        imoveisParaAnalise.filter((i) => i.fk_id_status === 1).reduce((acc, i) => acc + i.valor, 0) /
        Math.max(imoveisParaAnalise.filter((i) => i.fk_id_status === 1).length, 1),
      valorMedioAluguel:
        imoveisParaAnalise.filter((i) => i.fk_id_status === 2).reduce((acc, i) => acc + i.valor, 0) /
        Math.max(imoveisParaAnalise.filter((i) => i.fk_id_status === 2).length, 1),
    }

    // Estatísticas por tipo de imóvel
    const estatisticasPorTipo = imoveisParaAnalise.reduce(
      (acc, imovel) => {
        if (!acc[imovel.tipo]) {
          acc[imovel.tipo] = {
            total: 0,
            disponivel: 0,
            vendido: 0,
            alugado: 0,
            valorMedio: 0,
          }
        }
        acc[imovel.tipo].total++
        if (imovel.fk_id_status === 1 || imovel.fk_id_status === 2) acc[imovel.tipo].disponivel++
        if (imovel.fk_id_status === 3) acc[imovel.tipo].vendido++
        if (imovel.fk_id_status === 4) acc[imovel.tipo].alugado++
        return acc
      },
      {} as Record<string, any>,
    )

    // Calcular valor médio por tipo
    Object.keys(estatisticasPorTipo).forEach((tipo) => {
      const imoveisTipo = imoveisParaAnalise.filter((i) => i.tipo === tipo)
      estatisticasPorTipo[tipo].valorMedio = imoveisTipo.reduce((acc, i) => acc + i.valor, 0) / imoveisTipo.length
    })

    return NextResponse.json({
      success: true,
      data: {
        estatisticasGerais: stats,
        estatisticasPorTipo,
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro interno do servidor" }, { status: 500 })
  }
}
