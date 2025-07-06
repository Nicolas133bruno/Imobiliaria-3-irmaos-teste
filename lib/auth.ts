"use client"

export interface User {
  id: number
  nome: string
  email: string
  perfil: "Administrador" | "Corretor" | "Cliente"
  creci?: string
}

// Simulação de dados de usuários baseados no banco
const users: User[] = [
  {
    id: 1,
    nome: "Carlos Silva",
    email: "carlos@imobiliaria.com",
    perfil: "Administrador",
  },
  {
    id: 2,
    nome: "Ana Paula Oliveira",
    email: "ana@imobiliaria.com",
    perfil: "Administrador",
  },
  {
    id: 3,
    nome: "Marcos Antônio",
    email: "marcos@imobiliaria.com",
    perfil: "Corretor",
    creci: "MG-12345",
  },
  {
    id: 4,
    nome: "Juliana Costa",
    email: "juliana@imobiliaria.com",
    perfil: "Corretor",
    creci: "MG-54321",
  },
  {
    id: 6,
    nome: "Fernando Gomes",
    email: "fernando@gmail.com",
    perfil: "Cliente",
  },
]

export function authenticate(email: string, password: string): User | null {
  // Simulação simples de autenticação
  const user = users.find((u) => u.email === email)
  if (user && password === "senha123") {
    return user
  }
  return null
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const userData = localStorage.getItem("currentUser")
  return userData ? JSON.parse(userData) : null
}

export function setCurrentUser(user: User | null) {
  if (typeof window === "undefined") return
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user))
  } else {
    localStorage.removeItem("currentUser")
  }
}
