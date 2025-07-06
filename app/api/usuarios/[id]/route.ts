import { type NextRequest, NextResponse } from "next/server"
import { usuarios, perfis } from "@/lib/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const usuario = usuarios.find((u) => u.id_usuario === id)

    if (!usuario) {
      return NextResponse.json({ success: false, error: "Usuário não encontrado" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: {
        ...usuario,
        perfil: perfis.find((p) => p.id_Perf === usuario.fk_Perfil_id),
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

    const usuarioIndex = usuarios.findIndex((u) => u.id_usuario === id)
    if (usuarioIndex === -1) {
      return NextResponse.json({ success: false, error: "Usuário não encontrado" }, { status: 404 })
    }

    // Atualizar usuário
    usuarios[usuarioIndex] = { ...usuarios[usuarioIndex], ...body }

    return NextResponse.json({
      success: true,
      data: {
        ...usuarios[usuarioIndex],
        perfil: perfis.find((p) => p.id_Perf === usuarios[usuarioIndex].fk_Perfil_id),
      },
      message: "Usuário atualizado com sucesso",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const usuarioIndex = usuarios.findIndex((u) => u.id_usuario === id)

    if (usuarioIndex === -1) {
      return NextResponse.json({ success: false, error: "Usuário não encontrado" }, { status: 404 })
    }

    usuarios.splice(usuarioIndex, 1)

    return NextResponse.json({
      success: true,
      message: "Usuário removido com sucesso",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro interno do servidor" }, { status: 500 })
  }
}
