import { type NextRequest, NextResponse } from "next/server"
import { imoveis, statusImovel, enderecos, corretores } from "@/lib/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const imovel = imoveis.find((i) => i.id_imovel === id)

    if (!imovel) {
      return NextResponse.json({ success: false, error: "Imóvel não encontrado" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: {
        ...imovel,
        status: statusImovel.find((s) => s.id_status === imovel.fk_id_status),
        endereco: enderecos.find((e) => e.id_endereco === imovel.fk_id_endereco),
        corretor: corretores.find((c) => c.id_corretor === imovel.fk_id_corretor),
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()

    const imovelIndex = imoveis.findIndex((i) => i.id_imovel === id)
    if (imovelIndex === -1) {
      return NextResponse.json({ success: false, error: "Imóvel não encontrado" }, { status: 404 })
    }

    // Atualizar imóvel
    imoveis[imovelIndex] = { ...imoveis[imovelIndex], ...body }

    return NextResponse.json({
      success: true,
      data: {
        ...imoveis[imovelIndex],
        status: statusImovel.find((s) => s.id_status === imoveis[imovelIndex].fk_id_status),
        endereco: enderecos.find((e) => e.id_endereco === imoveis[imovelIndex].fk_id_endereco),
        corretor: corretores.find((c) => c.id_corretor === imoveis[imovelIndex].fk_id_corretor),
      },
      message: "Imóvel atualizado com sucesso",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const imovelIndex = imoveis.findIndex((i) => i.id_imovel === id)

    if (imovelIndex === -1) {
      return NextResponse.json({ success: false, error: "Imóvel não encontrado" }, { status: 404 })
    }

    imoveis.splice(imovelIndex, 1)

    return NextResponse.json({
      success: true,
      message: "Imóvel removido com sucesso",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro interno do servidor" }, { status: 500 })
  }
}
