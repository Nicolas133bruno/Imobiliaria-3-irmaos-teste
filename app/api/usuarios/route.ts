import { type NextRequest, NextResponse } from "next/server"
import { usuarios, perfis } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const perfil = searchParams.get("perfil")
    const email = searchParams.get("email")

    let filteredUsuarios = usuarios.map((usuario) => ({
      ...usuario,
      perfil: perfis.find((p) => p.id_Perf === usuario.fk_Perfil_id),
    }))

    // Filtrar por perfil se especificado
    if (perfil) {
      filteredUsuarios = filteredUsuarios.filter((u) => u.perfil?.tipo_perf.toLowerCase() === perfil.toLowerCase())
    }

    // Filtrar por email se especificado
    if (email) {
      filteredUsuarios = filteredUsuarios.filter((u) => u.email.toLowerCase().includes(email.toLowerCase()))
    }

    return NextResponse.json({
      success: true,
      data: filteredUsuarios,
      total: filteredUsuarios.length,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nome, cpf, telefone, email, data_nascimento, sexo, login_usu, senha_usu, fk_Perfil_id } = body

    // Validações básicas
    if (!nome || !email || !cpf) {
      return NextResponse.json({ success: false, error: "Nome, email e CPF são obrigatórios" }, { status: 400 })
    }

    // Verificar se email já existe
    const emailExists = usuarios.find((u) => u.email === email)
    if (emailExists) {
      return NextResponse.json({ success: false, error: "Email já cadastrado" }, { status: 400 })
    }

    // Criar novo usuário
    const novoUsuario = {
      id_usuario: Math.max(...usuarios.map((u) => u.id_usuario)) + 1,
      nome,
      cpf,
      telefone: telefone || "",
      email,
      data_nascimento: data_nascimento || "",
      sexo: sexo || "M",
      login_usu: login_usu || email,
      senha_usu: senha_usu || "senha123",
      fk_Perfil_id: fk_Perfil_id || 3, // Cliente por padrão
    }

    usuarios.push(novoUsuario)

    return NextResponse.json(
      {
        success: true,
        data: {
          ...novoUsuario,
          perfil: perfis.find((p) => p.id_Perf === novoUsuario.fk_Perfil_id),
        },
        message: "Usuário criado com sucesso",
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro interno do servidor" }, { status: 500 })
  }
}
