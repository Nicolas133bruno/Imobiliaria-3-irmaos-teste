import { type NextRequest, NextResponse } from "next/server"
import { contratosAluguel, usuarios, imoveis } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const usuario_id = searchParams.get("usuario_id")
    const imovel_id = searchParams.get("imovel_id")

    let filteredContratos = contratosAluguel.map((contrato) => ({
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
    const { tipo, data_inicio, data_fim, valor_mensalidade, fk_id_usuario, fk_id_imovel } = body

    // Validações básicas
    if (!data_inicio || !valor_mensalidade || !fk_id_usuario || !fk_id_imovel) {
      return NextResponse.json(
        { success: false, error: "Campos obrigatórios: data_inicio, valor_mensalidade, fk_id_usuario, fk_id_imovel" },
        { status: 400 },
      )
    }

    // Criar novo contrato
    const novoContrato = {
      id_contrato_alug: Math.max(...contratosAluguel.map((c) => c.id_contrato_alug)) + 1,
      tipo: tipo || "Residencial",
      data_inicio,
      data_fim: data_fim || "",
      valor_mensalidade: Number.parseFloat(valor_mensalidade),
      fk_id_usuario: Number.parseInt(fk_id_usuario),
      fk_id_imovel: Number.parseInt(fk_id_imovel),
    }

    contratosAluguel.push(novoContrato)

    return NextResponse.json(
      {
        success: true,
        data: {
          ...novoContrato,
          usuario: usuarios.find((u) => u.id_usuario === novoContrato.fk_id_usuario),
          imovel: imoveis.find((i) => i.id_imovel === novoContrato.fk_id_imovel),
        },
        message: "Contrato de aluguel criado com sucesso",
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro interno do servidor" }, { status: 500 })
  }
}
