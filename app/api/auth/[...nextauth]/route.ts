export const runtime = "nodejs"

/* -------------------------------------------------------------------------- */
/*  Fallback para crypto.createHash em runtimes que não possuem a função      */
/* -------------------------------------------------------------------------- */
import * as _crypto from "crypto" // stub no edge-lite
import * as _nodeCrypto from "node:crypto"
import CryptoJS from "crypto-js"
import type { BufferEncoding } from "buffer"

// Referências aos dois possíveis stubs
const stubs = [_crypto as any, _nodeCrypto as any]

for (const stub of stubs) {
  if (typeof stub.createHash !== "function") {
    stub.createHash = (alg: string) => {
      if (!/^sha(256|512)$/i.test(alg)) throw new Error("Unsupported hash algo")
      let data = ""
      return {
        update(chunk: string | ArrayBuffer) {
          data += typeof chunk === "string" ? chunk : new TextDecoder().decode(new Uint8Array(chunk as ArrayBuffer))
          return this
        },
        digest(encoding: BufferEncoding | undefined = "hex") {
          const wa = alg === "sha512" ? CryptoJS.SHA512(data) : CryptoJS.SHA256(data)
          const hex = wa.toString(CryptoJS.enc.Hex)
          if (encoding === "hex") return hex
          if (encoding === "base64") return CryptoJS.enc.Base64.stringify(wa)
          return Uint8Array.from(hex.match(/.{2}/g)!.map((b) => Number.parseInt(b, 16)))
        },
      }
    }
  }
}

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { usuarios, perfis, corretores } from "@/lib/database"

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Buscar usuário no banco de dados simulado
        const usuario = usuarios.find((u) => u.email === credentials.email)

        if (!usuario) {
          return null
        }

        // Verificar senha (em produção, use hash)
        if (credentials.password !== "senha123") {
          return null
        }

        // Buscar perfil
        const perfil = perfis.find((p) => p.id_Perf === usuario.fk_Perfil_id)

        // Buscar CRECI se for corretor
        let creci = null
        if (perfil?.tipo_perf === "Corretor") {
          const corretor = corretores.find((c) => c.fk_usuario_id === usuario.id_usuario)
          creci = corretor?.creci || null
        }

        return {
          id: usuario.id_usuario.toString(),
          name: usuario.nome,
          email: usuario.email,
          perfil: perfil?.tipo_perf || "Cliente",
          creci: creci,
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.perfil = user.perfil
        token.creci = user.creci
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
        session.user.perfil = token.perfil as string
        session.user.creci = token.creci as string
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "imobiliaria-3-irmaos-secret-2025",
}

import { type NextRequest, NextResponse } from "next/server"

// --- keep existing imports & authOptions definition ---
const nextAuthHandler = NextAuth(authOptions)

/* Graceful JSON wrapper – prevents CLIENT_FETCH_ERROR */
async function handler(request: NextRequest, ctx: any) {
  try {
    return await nextAuthHandler(request, ctx)
  } catch (err) {
    console.error("[NEXTAUTH UNHANDLED ERROR]", err)
    return NextResponse.json({ success: false, error: "Internal server error – check server logs." }, { status: 500 })
  }
}

/* Re-export for both verbs */
export { handler as GET, handler as POST }
