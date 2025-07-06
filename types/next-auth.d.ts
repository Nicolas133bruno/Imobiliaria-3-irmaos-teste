import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      perfil: string
      creci?: string | null
    }
  }

  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    perfil: string
    creci?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    perfil?: string
    creci?: string | null
  }
}
