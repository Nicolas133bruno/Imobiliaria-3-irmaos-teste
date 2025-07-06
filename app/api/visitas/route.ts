import { type NextRequest, NextResponse } from "next/server"
import { visitas, usuarios, corretores, imoveis } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const usuario_id = searchParams.get("usuario_id")
    const corretor_id = searchParams.get("corretor_id")
    const imovel_id = searchParams.get("imovel_id")
    const status = searchParams.get("status")

    let filteredVisitas = visitas.map((visita) => ({
      ...visita,
      usuario: usuarios.find((u) => u.id_usuario === visita.fk_id_usuario),
      corretor: corretores.find((c) => c.id_corretor === visita.fk_id_corretor),
      imovel: imoveis.find((i) => i.id_imovel === visita.fk_id_imovel),
    }))

    // Aplicar filtros
    if (usuario_id) {
      filteredVisitas = filteredVisitas.filter((v) => v.fk_id_usuario === Number.parseInt(usuario_id))
    }

    if (corretor_id) {
      filteredVisitas = filteredVisitas.filter((v) => v.fk_id_corretor === Number.parseInt(corretor_id))
    }

    if (imovel_id) {
      filteredVisitas = filteredVisitas.filter((v) => v.fk_id_imovel === Number.parseInt(imovel_id))
    }

    if (status) {
      filteredVisitas = filteredVisitas.filter((v) => v.status_visita.toLowerCase() === status.toLowerCase())
    }

    return NextResponse.json({
      success: true,
      data: filteredVisitas,
      total: filteredVisitas.length,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data_visita, hora_visita, status_visita, fk_id_usuario, fk_id_corretor, fk_id_imovel } = body

    // Validações básicas
    if (!data_visita || !hora_visita || !fk_id_usuario || !fk_id_corretor || !fk_id_imovel) {
      return NextResponse.json({ success: false, error: "Todos os campos são obrigatórios" }, { status: 400 })
    }

    // Criar nova visita
    const novaVisita = {
      id_visita: Math.max(...visitas.map((v) => v.id_visita)) + 1,
      data_visita,
      hora_visita,
      status_visita: status_visita || "Agendada",
      fk_id_usuario: Number.parseInt(fk_id_usuario),
      fk_id_corretor: Number.parseInt(fk_id_corretor),
      fk_id_imovel: Number.parseInt(fk_id_imovel),
    }

    visitas.push(novaVisita)

    return NextResponse.json(
      {
        success: true,
        data: {
          ...novaVisita,
          usuario: usuarios.find((u) => u.id_usuario === novaVisita.fk_id_usuario),
          corretor: corretores.find((c) => c.id_corretor === novaVisita.fk_id_corretor),
          imovel: imoveis.find((i) => i.id_imovel === novaVisita.fk_id_imovel),
        },
        message: "Visita agendada com sucesso",
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro interno do servidor" }, { status: 500 })
  }
}
