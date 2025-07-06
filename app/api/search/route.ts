import { type NextRequest, NextResponse } from "next/server"
import { imoveis, usuarios, enderecos, statusImovel, corretores } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")
    const tipo = searchParams.get("tipo") // 'imoveis', 'usuarios', 'all'

    if (!query) {
      return NextResponse.json({ success: false, error: "Parâmetro de busca é obrigatório" }, { status: 400 })
    }

    const results: any = {}

    // Buscar imóveis
    if (!tipo || tipo === "imoveis" || tipo === "all") {
      const imoveisEncontrados = imoveis
        .map((imovel) => ({
          ...imovel,
          status: statusImovel.find((s) => s.id_status === imovel.fk_id_status),
          endereco: enderecos.find((e) => e.id_endereco === imovel.fk_id_endereco),
          corretor: corretores.find((c) => c.id_corretor === imovel.fk_id_corretor),
        }))
        .filter(
          (imovel) =>
            imovel.tipo.toLowerCase().includes(query.toLowerCase()) ||
            imovel.desc_tipo_imovel.toLowerCase().includes(query.toLowerCase()) ||
            imovel.endereco?.bairro.toLowerCase().includes(query.toLowerCase()) ||
            imovel.endereco?.cidade.toLowerCase().includes(query.toLowerCase()) ||
            imovel.endereco?.logradouro.toLowerCase().includes(query.toLowerCase()),
        )

      results.imoveis = imoveisEncontrados
    }

    // Buscar usuários
    if (!tipo || tipo === "usuarios" || tipo === "all") {
      const usuariosEncontrados = usuarios.filter(
        (usuario) =>
          usuario.nome.toLowerCase().includes(query.toLowerCase()) ||
          usuario.email.toLowerCase().includes(query.toLowerCase()) ||
          usuario.cpf.includes(query),
      )

      results.usuarios = usuariosEncontrados
    }

    return NextResponse.json({
      success: true,
      data: results,
      query,
      total: Object.values(results).reduce((acc: number, arr: any) => acc + (arr?.length || 0), 0),
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro interno do servidor" }, { status: 500 })
  }
}
