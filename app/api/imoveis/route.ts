import { type NextRequest, NextResponse } from "next/server"
import { imoveis, statusImovel, enderecos, corretores } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tipo = searchParams.get("tipo")
    const status = searchParams.get("status")
    const corretor_id = searchParams.get("corretor_id")
    const cidade = searchParams.get("cidade")
    const valor_min = searchParams.get("valor_min")
    const valor_max = searchParams.get("valor_max")

    let filteredImoveis = imoveis.map((imovel) => ({
      ...imovel,
      status: statusImovel.find((s) => s.id_status === imovel.fk_id_status),
      endereco: enderecos.find((e) => e.id_endereco === imovel.fk_id_endereco),
      corretor: corretores.find((c) => c.id_corretor === imovel.fk_id_corretor),
    }))

    // Aplicar filtros
    if (tipo) {
      filteredImoveis = filteredImoveis.filter((i) => i.tipo.toLowerCase() === tipo.toLowerCase())
    }

    if (status) {
      filteredImoveis = filteredImoveis.filter((i) =>
        i.status?.descricao_status.toLowerCase().includes(status.toLowerCase()),
      )
    }

    if (corretor_id) {
      filteredImoveis = filteredImoveis.filter((i) => i.fk_id_corretor === Number.parseInt(corretor_id))
    }

    if (cidade) {
      filteredImoveis = filteredImoveis.filter((i) => i.endereco?.cidade.toLowerCase().includes(cidade.toLowerCase()))
    }

    if (valor_min) {
      filteredImoveis = filteredImoveis.filter((i) => i.valor >= Number.parseFloat(valor_min))
    }

    if (valor_max) {
      filteredImoveis = filteredImoveis.filter((i) => i.valor <= Number.parseFloat(valor_max))
    }

    return NextResponse.json({
      success: true,
      data: filteredImoveis,
      total: filteredImoveis.length,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      area_total,
      quarto,
      banheiro,
      vaga_garagem,
      valor,
      tipo,
      desc_tipo_imovel,
      fk_id_status,
      fk_id_endereco,
      fk_id_corretor,
    } = body

    // Validações básicas
    if (!area_total || !valor || !tipo) {
      return NextResponse.json({ success: false, error: "Área total, valor e tipo são obrigatórios" }, { status: 400 })
    }

    // Criar novo imóvel
    const novoImovel = {
      id_imovel: Math.max(...imoveis.map((i) => i.id_imovel)) + 1,
      area_total: Number.parseFloat(area_total),
      quarto: Number.parseInt(quarto) || 0,
      banheiro: Number.parseInt(banheiro) || 1,
      vaga_garagem: Number.parseInt(vaga_garagem) || 0,
      valor: Number.parseFloat(valor),
      tipo,
      desc_tipo_imovel: desc_tipo_imovel || "",
      fk_id_status: fk_id_status || 1,
      fk_id_endereco: fk_id_endereco || 1,
      fk_id_corretor: fk_id_corretor || 1,
    }

    imoveis.push(novoImovel)

    return NextResponse.json(
      {
        success: true,
        data: {
          ...novoImovel,
          status: statusImovel.find((s) => s.id_status === novoImovel.fk_id_status),
          endereco: enderecos.find((e) => e.id_endereco === novoImovel.fk_id_endereco),
          corretor: corretores.find((c) => c.id_corretor === novoImovel.fk_id_corretor),
        },
        message: "Imóvel criado com sucesso",
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro interno do servidor" }, { status: 500 })
  }
}
