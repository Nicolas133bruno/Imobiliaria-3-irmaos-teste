import { type NextRequest, NextResponse } from "next/server"
import { corretores, usuarios } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const creci = searchParams.get("creci")

    let filteredCorretores = corretores.map((corretor) => ({
      ...corretor,
      usuario: usuarios.find((u) => u.id_usuario === corretor.fk_usuario_id),
    }))

    // Filtrar por CRECI se especificado
    if (creci) {
      filteredCorretores = filteredCorretores.filter((c) => c.creci.toLowerCase().includes(creci.toLowerCase()))
    }

    return NextResponse.json({
      success: true,
      data: filteredCorretores,
      total: filteredCorretores.length,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { creci, fk_usuario_id } = body

    // Validações básicas
    if (!creci || !fk_usuario_id) {
      return NextResponse.json({ success: false, error: "CRECI e ID do usuário são obrigatórios" }, { status: 400 })
    }

    // Verificar se CRECI já existe
    const creciExists = corretores.find((c) => c.creci === creci)
    if (creciExists) {
      return NextResponse.json({ success: false, error: "CRECI já cadastrado" }, { status: 400 })
    }

    // Verificar se usuário existe
    const usuario = usuarios.find((u) => u.id_usuario === Number.parseInt(fk_usuario_id))
    if (!usuario) {
      return NextResponse.json({ success: false, error: "Usuário não encontrado" }, { status: 400 })
    }

    // Criar novo corretor
    const novoCorretor = {
      id_corretor: Math.max(...corretores.map((c) => c.id_corretor)) + 1,
      creci,
      fk_usuario_id: Number.parseInt(fk_usuario_id),
    }

    corretores.push(novoCorretor)

    // Atualizar perfil do usuário para corretor
    const usuarioIndex = usuarios.findIndex((u) => u.id_usuario === Number.parseInt(fk_usuario_id))
    if (usuarioIndex !== -1) {
      usuarios[usuarioIndex].fk_Perfil_id = 2 // Perfil de corretor
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          ...novoCorretor,
          usuario: usuarios.find((u) => u.id_usuario === novoCorretor.fk_usuario_id),
        },
        message: "Corretor criado com sucesso",
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro interno do servidor" }, { status: 500 })
  }
}
