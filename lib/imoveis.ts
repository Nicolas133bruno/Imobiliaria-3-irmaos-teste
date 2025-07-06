export interface Imovel {
  id: number
  tipo: string
  descricao: string
  area_total: number
  quartos: number
  banheiros: number
  vagas_garagem: number
  valor: number
  status: string
  endereco: {
    logradouro: string
    numero: string
    bairro: string
    cidade: string
    estado: string
    cep: string
  }
  corretor: {
    nome: string
    creci: string
  }
}

// Dados simulados baseados no banco
export const imoveis: Imovel[] = [
  {
    id: 1,
    tipo: "Apartamento",
    descricao: "Apartamento padrão, 2 quartos",
    area_total: 85.5,
    quartos: 2,
    banheiros: 1,
    vagas_garagem: 1,
    valor: 250000.0,
    status: "Disponível para venda",
    endereco: {
      logradouro: "Rua Professor José Ignácio de Souza",
      numero: "1450",
      bairro: "Martins",
      cidade: "Uberlândia",
      estado: "MG",
      cep: "38400-128",
    },
    corretor: {
      nome: "Marcos Antônio",
      creci: "MG-12345",
    },
  },
  {
    id: 2,
    tipo: "Apartamento",
    descricao: "Apartamento luxo, 3 quartos",
    area_total: 120.0,
    quartos: 3,
    banheiros: 2,
    vagas_garagem: 2,
    valor: 450000.0,
    status: "Disponível para venda",
    endereco: {
      logradouro: "Avenida Antônio Thomaz Ferreira de Rezende",
      numero: "2001",
      bairro: "Laranjeiras",
      cidade: "Uberlândia",
      estado: "MG",
      cep: "38411-006",
    },
    corretor: {
      nome: "Juliana Costa",
      creci: "MG-54321",
    },
  },
  {
    id: 3,
    tipo: "Casa",
    descricao: "Casa padrão, 4 quartos",
    area_total: 180.0,
    quartos: 4,
    banheiros: 3,
    vagas_garagem: 2,
    valor: 650000.0,
    status: "Disponível para venda",
    endereco: {
      logradouro: "Avenida João Naves de Ávila",
      numero: "2500",
      bairro: "Santa Mônica",
      cidade: "Uberlândia",
      estado: "MG",
      cep: "38408-100",
    },
    corretor: {
      nome: "Roberto Almeida",
      creci: "MG-98765",
    },
  },
  {
    id: 4,
    tipo: "Casa",
    descricao: "Casa luxo, 5 quartos",
    area_total: 220.0,
    quartos: 5,
    banheiros: 4,
    vagas_garagem: 3,
    valor: 850000.0,
    status: "Disponível para venda",
    endereco: {
      logradouro: "Rua das Acácias",
      numero: "45",
      bairro: "Jardim Patrícia",
      cidade: "Uberlândia",
      estado: "MG",
      cep: "38411-108",
    },
    corretor: {
      nome: "Marcos Antônio",
      creci: "MG-12345",
    },
  },
  {
    id: 5,
    tipo: "Apartamento",
    descricao: "Kitnet para aluguel",
    area_total: 65.0,
    quartos: 1,
    banheiros: 1,
    vagas_garagem: 1,
    valor: 1200.0,
    status: "Disponível para aluguel",
    endereco: {
      logradouro: "Rua Tiradentes",
      numero: "789",
      bairro: "Centro",
      cidade: "Uberlândia",
      estado: "MG",
      cep: "38400-186",
    },
    corretor: {
      nome: "Juliana Costa",
      creci: "MG-54321",
    },
  },
  {
    id: 10,
    tipo: "Comercial",
    descricao: "Sala comercial",
    area_total: 300.0,
    quartos: 0,
    banheiros: 2,
    vagas_garagem: 5,
    valor: 1200000.0,
    status: "Disponível para venda",
    endereco: {
      logradouro: "Rua das Rosas",
      numero: "33",
      bairro: "Jardim Karaíba",
      cidade: "Uberlândia",
      estado: "MG",
      cep: "38412-345",
    },
    corretor: {
      nome: "Marcos Antônio",
      creci: "MG-12345",
    },
  },
]
