import { type NextRequest, NextResponse } from "next/server"
import { contratosVenda, usuarios, imoveis } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const usuario_id = searchParams.get("usuario_id")
    const imovel_id = searchParams.get("imovel_id")

    let filteredContratos = contratosVenda.map((contrato) => ({
      ...contrato,
      usuario: usuarios.find((u) => u.id_usuario === contrato.fk_id_usuario),
      imovel: imoveis.find((i) => i.id_imovel === contrato.fk_id_imovel),
    }))

    // Aplicar filtros
    if (usuario_id) {
      filteredContratos = filteredContratos.filter((c) => c.fk_id_usuario === Number.parseInt(usuario_id))
    }

    if (imovel_id) {
      filteredContratos = filteredContratos.filter((c) => c.fk_id_imovel === Number.parseInt(imovel_id))
    }

    return NextResponse.json({
      success: true,
      data: filteredContratos,
      total: filteredContratos.length,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tipo_venda, data_inicio, data_fim, valor_negociado, fk_id_usuario, fk_id_imovel } = body

    // Validações básicas
    if (!data_inicio || !valor_negociado || !fk_id_usuario || !fk_id_imovel) {
      return NextResponse.json(
        { success: false, error: "Campos obrigatórios: data_inicio, valor_negociado, fk_id_usuario, fk_id_imovel" },
        { status: 400 },
      )
    }

    // Criar novo contrato
    const novoContrato = {
      id_contrato_venda: Math.max(...contratosVenda.map((c) => c.id_contrato_venda)) + 1,
      tipo_venda: tipo_venda || "À vista",
      data_inicio,
      data_fim: data_fim || data_inicio,
      valor_negociado: Number.parseFloat(valor_negociado),
      fk_id_usuario: Number.parseInt(fk_id_usuario),
      fk_id_imovel: Number.parseInt(fk_id_imovel),
    }

    contratosVenda.push(novoContrato)

    return NextResponse.json(
      {
        success: true,
        data: {
          ...novoContrato,
          usuario: usuarios.find((u) => u.id_usuario === novoContrato.fk_id_usuario),
          imovel: imoveis.find((i) => i.id_imovel === novoContrato.fk_id_imovel),
        },
        message: "Contrato de venda criado com sucesso",
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro interno do servidor" }, { status: 500 })
  }
}
