// Simulação de banco de dados baseada no documento do projeto
// Sistema de Gerenciamento Imobiliário - Imobiliária 3 Irmãos

export interface Perfil {
  id_Perf: number
  tipo_perf: string
}

export interface Usuario {
  id_usuario: number
  nome: string
  cpf: string
  telefone: string
  email: string
  data_nascimento: string
  sexo: "M" | "F"
  login_usu: string
  senha_usu: string
  fk_Perfil_id: number
  perfil?: Perfil
}

export interface Corretor {
  id_corretor: number
  creci: string
  fk_usuario_id: number
  usuario?: Usuario
}

export interface StatusImovel {
  id_status: number
  descricao_status: string
}

export interface Endereco {
  id_endereco: number
  logradouro: string
  numero: string
  bairro: string
  complemento?: string
  cidade: string
  estado: string
  cep: string
}

export interface Imovel {
  id_imovel: number
  area_total: number
  quarto: number
  banheiro: number
  vaga_garagem: number
  valor: number
  tipo: string
  desc_tipo_imovel: string
  fk_id_status: number
  fk_id_endereco: number
  fk_id_corretor: number
  status?: StatusImovel
  endereco?: Endereco
  corretor?: Corretor
}

export interface Visita {
  id_visita: number
  data_visita: string
  hora_visita: string
  status_visita: string
  fk_id_usuario: number
  fk_id_corretor: number
  fk_id_imovel: number
  usuario?: Usuario
  corretor?: Corretor
  imovel?: Imovel
}

export interface ContratoAluguel {
  id_contrato_alug: number
  tipo: string
  data_inicio: string
  data_fim: string
  valor_mensalidade: number
  fk_id_usuario: number
  fk_id_imovel: number
  usuario?: Usuario
  imovel?: Imovel
}

export interface ContratoVenda {
  id_contrato_venda: number
  tipo_venda: string
  data_inicio: string
  data_fim: string
  valor_negociado: number
  fk_id_usuario: number
  fk_id_imovel: number
  usuario?: Usuario
  imovel?: Imovel
}

// Dados exatos do documento do projeto
export const perfis: Perfil[] = [
  { id_Perf: 1, tipo_perf: "Administrador" },
  { id_Perf: 2, tipo_perf: "Corretor" },
  { id_Perf: 3, tipo_perf: "Cliente" },
]

export const usuarios: Usuario[] = [
  {
    id_usuario: 1,
    nome: "Carlos Silva",
    cpf: "123.456.789-01",
    telefone: "(34) 9999-8888",
    email: "carlos@imobiliaria.com",
    data_nascimento: "1980-05-15",
    sexo: "M",
    login_usu: "carlos.silva",
    senha_usu: "senha123",
    fk_Perfil_id: 1,
  },
  {
    id_usuario: 2,
    nome: "Ana Paula Oliveira",
    cpf: "987.654.321-09",
    telefone: "(34) 9888-7777",
    email: "ana@imobiliaria.com",
    data_nascimento: "1985-08-20",
    sexo: "F",
    login_usu: "ana.oliveira",
    senha_usu: "senha456",
    fk_Perfil_id: 1,
  },
  {
    id_usuario: 3,
    nome: "Marcos Antônio",
    cpf: "111.222.333-44",
    telefone: "(34) 9777-6666",
    email: "marcos@imobiliaria.com",
    data_nascimento: "1990-03-10",
    sexo: "M",
    login_usu: "marcos.antonio",
    senha_usu: "senha789",
    fk_Perfil_id: 2,
  },
  {
    id_usuario: 4,
    nome: "Juliana Costa",
    cpf: "555.666.777-88",
    telefone: "(34) 9666-5555",
    email: "juliana@imobiliaria.com",
    data_nascimento: "1988-11-25",
    sexo: "F",
    login_usu: "juliana.costa",
    senha_usu: "senha101",
    fk_Perfil_id: 2,
  },
  {
    id_usuario: 5,
    nome: "Roberto Almeida",
    cpf: "999.888.777-66",
    telefone: "(34) 9555-4444",
    email: "roberto@imobiliaria.com",
    data_nascimento: "1982-07-30",
    sexo: "M",
    login_usu: "roberto.almeida",
    senha_usu: "senha202",
    fk_Perfil_id: 2,
  },
  {
    id_usuario: 6,
    nome: "Fernando Gomes",
    cpf: "222.333.444-55",
    telefone: "(34) 9444-3333",
    email: "fernando@gmail.com",
    data_nascimento: "1995-02-18",
    sexo: "M",
    login_usu: "fernando.gomes",
    senha_usu: "senha303",
    fk_Perfil_id: 3,
  },
  {
    id_usuario: 7,
    nome: "Patrícia Souza",
    cpf: "333.444.555-66",
    telefone: "(34) 9333-2222",
    email: "patricia@gmail.com",
    data_nascimento: "1992-09-12",
    sexo: "F",
    login_usu: "patricia.souza",
    senha_usu: "senha404",
    fk_Perfil_id: 3,
  },
  {
    id_usuario: 8,
    nome: "Ricardo Pereira",
    cpf: "444.555.666-77",
    telefone: "(34) 9222-1111",
    email: "ricardo@gmail.com",
    data_nascimento: "1987-04-05",
    sexo: "M",
    login_usu: "ricardo.pereira",
    senha_usu: "senha505",
    fk_Perfil_id: 3,
  },
  {
    id_usuario: 9,
    nome: "Amanda Nunes",
    cpf: "555.666.777-88",
    telefone: "(34) 9111-0000",
    email: "amanda@gmail.com",
    data_nascimento: "1993-12-22",
    sexo: "F",
    login_usu: "amanda.nunes",
    senha_usu: "senha606",
    fk_Perfil_id: 3,
  },
  {
    id_usuario: 10,
    nome: "Lucas Martins",
    cpf: "666.777.888-99",
    telefone: "(34) 9000-9999",
    email: "lucas@gmail.com",
    data_nascimento: "1991-06-15",
    sexo: "M",
    login_usu: "lucas.martins",
    senha_usu: "senha707",
    fk_Perfil_id: 3,
  },
]

export const corretores: Corretor[] = [
  { id_corretor: 1, creci: "MG-12345", fk_usuario_id: 3 },
  { id_corretor: 2, creci: "MG-54321", fk_usuario_id: 4 },
  { id_corretor: 3, creci: "MG-98765", fk_usuario_id: 5 },
]

export const statusImovel: StatusImovel[] = [
  { id_status: 1, descricao_status: "Disponível para venda" },
  { id_status: 2, descricao_status: "Disponível para aluguel" },
  { id_status: 3, descricao_status: "Vendido" },
  { id_status: 4, descricao_status: "Alugado" },
  { id_status: 5, descricao_status: "Indisponível" },
]

export const enderecos: Endereco[] = [
  {
    id_endereco: 1,
    logradouro: "Rua Professor José Ignácio de Souza",
    numero: "1450",
    bairro: "Martins",
    complemento: "Apto 302",
    cidade: "Uberlândia",
    estado: "MG",
    cep: "38400-128",
  },
  {
    id_endereco: 2,
    logradouro: "Avenida João Naves de Ávila",
    numero: "2500",
    bairro: "Santa Mônica",
    complemento: "Casa 2",
    cidade: "Uberlândia",
    estado: "MG",
    cep: "38408-100",
  },
  {
    id_endereco: 3,
    logradouro: "Rua Tiradentes",
    numero: "789",
    bairro: "Centro",
    complemento: "Sala 501",
    cidade: "Uberlândia",
    estado: "MG",
    cep: "38400-186",
  },
  {
    id_endereco: 4,
    logradouro: "Rua das Acácias",
    numero: "45",
    bairro: "Jardim Patrícia",
    complemento: "",
    cidade: "Uberlândia",
    estado: "MG",
    cep: "38411-108",
  },
  {
    id_endereco: 5,
    logradouro: "Avenida Rondon Pacheco",
    numero: "3700",
    bairro: "Tibery",
    complemento: "Bloco B",
    cidade: "Uberlândia",
    estado: "MG",
    cep: "38405-000",
  },
  {
    id_endereco: 6,
    logradouro: "Rua dos Ipês",
    numero: "120",
    bairro: "Planalto",
    complemento: "",
    cidade: "Uberlândia",
    estado: "MG",
    cep: "38410-558",
  },
  {
    id_endereco: 7,
    logradouro: "Rua das Hortênsias",
    numero: "85",
    bairro: "Mansour",
    complemento: "Fundos",
    cidade: "Uberlândia",
    estado: "MG",
    cep: "38400-456",
  },
  {
    id_endereco: 8,
    logradouro: "Avenida Antônio Thomaz Ferreira de Rezende",
    numero: "2001",
    bairro: "Laranjeiras",
    complemento: "Apto 1204",
    cidade: "Uberlândia",
    estado: "MG",
    cep: "38411-006",
  },
  {
    id_endereco: 9,
    logradouro: "Rua Goiás",
    numero: "500",
    bairro: "Fundinho",
    complemento: "Sobrado",
    cidade: "Uberlândia",
    estado: "MG",
    cep: "38400-012",
  },
  {
    id_endereco: 10,
    logradouro: "Rua das Rosas",
    numero: "33",
    bairro: "Jardim Karaíba",
    complemento: "",
    cidade: "Uberlândia",
    estado: "MG",
    cep: "38412-345",
  },
]

export const imoveis: Imovel[] = [
  {
    id_imovel: 1,
    area_total: 85.5,
    quarto: 2,
    banheiro: 1,
    vaga_garagem: 1,
    valor: 250000.0,
    tipo: "Apartamento",
    desc_tipo_imovel: "Apartamento padrão, 2 quartos",
    fk_id_status: 1,
    fk_id_endereco: 1,
    fk_id_corretor: 1,
  },
  {
    id_imovel: 2,
    area_total: 120.0,
    quarto: 3,
    banheiro: 2,
    vaga_garagem: 2,
    valor: 450000.0,
    tipo: "Apartamento",
    desc_tipo_imovel: "Apartamento luxo, 3 quartos",
    fk_id_status: 1,
    fk_id_endereco: 8,
    fk_id_corretor: 2,
  },
  {
    id_imovel: 3,
    area_total: 180.0,
    quarto: 4,
    banheiro: 3,
    vaga_garagem: 2,
    valor: 650000.0,
    tipo: "Casa",
    desc_tipo_imovel: "Casa padrão, 4 quartos",
    fk_id_status: 1,
    fk_id_endereco: 2,
    fk_id_corretor: 3,
  },
  {
    id_imovel: 4,
    area_total: 220.0,
    quarto: 5,
    banheiro: 4,
    vaga_garagem: 3,
    valor: 850000.0,
    tipo: "Casa",
    desc_tipo_imovel: "Casa luxo, 5 quartos",
    fk_id_status: 1,
    fk_id_endereco: 4,
    fk_id_corretor: 1,
  },
  {
    id_imovel: 5,
    area_total: 65.0,
    quarto: 1,
    banheiro: 1,
    vaga_garagem: 1,
    valor: 1200.0,
    tipo: "Apartamento",
    desc_tipo_imovel: "Kitnet para aluguel",
    fk_id_status: 2,
    fk_id_endereco: 3,
    fk_id_corretor: 2,
  },
  {
    id_imovel: 6,
    area_total: 90.0,
    quarto: 2,
    banheiro: 1,
    vaga_garagem: 1,
    valor: 1800.0,
    tipo: "Apartamento",
    desc_tipo_imovel: "Apartamento para aluguel",
    fk_id_status: 2,
    fk_id_endereco: 5,
    fk_id_corretor: 3,
  },
  {
    id_imovel: 7,
    area_total: 150.0,
    quarto: 3,
    banheiro: 2,
    vaga_garagem: 2,
    valor: 2500.0,
    tipo: "Casa",
    desc_tipo_imovel: "Casa para aluguel",
    fk_id_status: 2,
    fk_id_endereco: 6,
    fk_id_corretor: 1,
  },
  {
    id_imovel: 8,
    area_total: 200.0,
    quarto: 4,
    banheiro: 3,
    vaga_garagem: 2,
    valor: 750000.0,
    tipo: "Casa",
    desc_tipo_imovel: "Casa vendida",
    fk_id_status: 3,
    fk_id_endereco: 7,
    fk_id_corretor: 2,
  },
  {
    id_imovel: 9,
    area_total: 75.0,
    quarto: 2,
    banheiro: 1,
    vaga_garagem: 1,
    valor: 1500.0,
    tipo: "Apartamento",
    desc_tipo_imovel: "Apartamento alugado",
    fk_id_status: 4,
    fk_id_endereco: 9,
    fk_id_corretor: 3,
  },
  {
    id_imovel: 10,
    area_total: 300.0,
    quarto: 0,
    banheiro: 2,
    vaga_garagem: 5,
    valor: 1200000.0,
    tipo: "Comercial",
    desc_tipo_imovel: "Sala comercial",
    fk_id_status: 1,
    fk_id_endereco: 10,
    fk_id_corretor: 1,
  },
]

export const visitas: Visita[] = [
  {
    id_visita: 1,
    data_visita: "2023-05-10",
    hora_visita: "14:00:00",
    status_visita: "Realizada",
    fk_id_usuario: 6,
    fk_id_corretor: 1,
    fk_id_imovel: 1,
  },
  {
    id_visita: 2,
    data_visita: "2023-05-12",
    hora_visita: "10:30:00",
    status_visita: "Realizada",
    fk_id_usuario: 7,
    fk_id_corretor: 2,
    fk_id_imovel: 3,
  },
  {
    id_visita: 3,
    data_visita: "2023-05-15",
    hora_visita: "16:00:00",
    status_visita: "Realizada",
    fk_id_usuario: 8,
    fk_id_corretor: 3,
    fk_id_imovel: 5,
  },
  {
    id_visita: 4,
    data_visita: "2023-05-18",
    hora_visita: "09:00:00",
    status_visita: "Cancelada",
    fk_id_usuario: 9,
    fk_id_corretor: 1,
    fk_id_imovel: 2,
  },
  {
    id_visita: 5,
    data_visita: "2023-05-20",
    hora_visita: "15:30:00",
    status_visita: "Realizada",
    fk_id_usuario: 10,
    fk_id_corretor: 2,
    fk_id_imovel: 4,
  },
  {
    id_visita: 6,
    data_visita: "2023-05-22",
    hora_visita: "11:00:00",
    status_visita: "Agendada",
    fk_id_usuario: 6,
    fk_id_corretor: 3,
    fk_id_imovel: 6,
  },
  {
    id_visita: 7,
    data_visita: "2023-05-25",
    hora_visita: "17:00:00",
    status_visita: "Agendada",
    fk_id_usuario: 7,
    fk_id_corretor: 1,
    fk_id_imovel: 7,
  },
  {
    id_visita: 8,
    data_visita: "2023-05-28",
    hora_visita: "14:30:00",
    status_visita: "Realizada",
    fk_id_usuario: 8,
    fk_id_corretor: 2,
    fk_id_imovel: 8,
  },
  {
    id_visita: 9,
    data_visita: "2023-06-01",
    hora_visita: "10:00:00",
    status_visita: "Realizada",
    fk_id_usuario: 9,
    fk_id_corretor: 3,
    fk_id_imovel: 9,
  },
  {
    id_visita: 10,
    data_visita: "2023-06-05",
    hora_visita: "16:30:00",
    status_visita: "Realizada",
    fk_id_usuario: 10,
    fk_id_corretor: 1,
    fk_id_imovel: 10,
  },
]

export const contratosAluguel: ContratoAluguel[] = [
  {
    id_contrato_alug: 1,
    tipo: "Residencial",
    data_inicio: "2023-01-15",
    data_fim: "2024-01-14",
    valor_mensalidade: 1500.0,
    fk_id_usuario: 6,
    fk_id_imovel: 9,
  },
  {
    id_contrato_alug: 2,
    tipo: "Residencial",
    data_inicio: "2023-03-01",
    data_fim: "2024-02-28",
    valor_mensalidade: 1800.0,
    fk_id_usuario: 7,
    fk_id_imovel: 6,
  },
  {
    id_contrato_alug: 3,
    tipo: "Residencial",
    data_inicio: "2023-04-10",
    data_fim: "2024-04-09",
    valor_mensalidade: 1200.0,
    fk_id_usuario: 8,
    fk_id_imovel: 5,
  },
]

export const contratosVenda: ContratoVenda[] = [
  {
    id_contrato_venda: 1,
    tipo_venda: "À vista",
    data_inicio: "2023-02-20",
    data_fim: "2023-02-20",
    valor_negociado: 730000.0,
    fk_id_usuario: 9,
    fk_id_imovel: 8,
  },
  {
    id_contrato_venda: 2,
    tipo_venda: "Financiado",
    data_inicio: "2023-04-05",
    data_fim: "2023-06-05",
    valor_negociado: 240000.0,
    fk_id_usuario: 10,
    fk_id_imovel: 1,
  },
  {
    id_contrato_venda: 3,
    tipo_venda: "À vista",
    data_inicio: "2023-05-15",
    data_fim: "2023-05-15",
    valor_negociado: 820000.0,
    fk_id_usuario: 6,
    fk_id_imovel: 3,
  },
]

// Funções auxiliares para relacionamentos
export function getUsuarioWithPerfil(id: number): Usuario | undefined {
  const usuario = usuarios.find((u) => u.id_usuario === id)
  if (usuario) {
    return {
      ...usuario,
      perfil: perfis.find((p) => p.id_Perf === usuario.fk_Perfil_id),
    }
  }
  return undefined
}

export function getImovelWithRelations(id: number): Imovel | undefined {
  const imovel = imoveis.find((i) => i.id_imovel === id)
  if (imovel) {
    const corretor = corretores.find((c) => c.id_corretor === imovel.fk_id_corretor)
    return {
      ...imovel,
      status: statusImovel.find((s) => s.id_status === imovel.fk_id_status),
      endereco: enderecos.find((e) => e.id_endereco === imovel.fk_id_endereco),
      corretor: corretor
        ? {
            ...corretor,
            usuario: usuarios.find((u) => u.id_usuario === corretor.fk_usuario_id),
          }
        : undefined,
    }
  }
  return undefined
}

export function getAllImoveisWithRelations(): Imovel[] {
  return imoveis.map((imovel) => {
    const corretor = corretores.find((c) => c.id_corretor === imovel.fk_id_corretor)
    return {
      ...imovel,
      status: statusImovel.find((s) => s.id_status === imovel.fk_id_status),
      endereco: enderecos.find((e) => e.id_endereco === imovel.fk_id_endereco),
      corretor: corretor
        ? {
            ...corretor,
            usuario: usuarios.find((u) => u.id_usuario === corretor.fk_usuario_id),
          }
        : undefined,
    }
  })
}
