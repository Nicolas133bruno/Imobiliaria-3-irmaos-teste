"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/logo"
import {
  Building2,
  Search,
  MapPin,
  Phone,
  Mail,
  Users,
  Key,
  Shield,
  Award,
  CheckCircle,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Database,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function HomePage() {
  const [searchType, setSearchType] = useState("comprar")
  const [propertyType, setPropertyType] = useState("")
  const [location, setLocation] = useState("")

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-2 text-sm border-b">
            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>(34) 9999-8888</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>contato@3irmaos.com.br</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                Área do Cliente
              </Link>
              <div className="flex space-x-2">
                <Facebook className="w-4 h-4 text-gray-400 hover:text-blue-600 cursor-pointer" />
                <Instagram className="w-4 h-4 text-gray-400 hover:text-pink-600 cursor-pointer" />
                <Linkedin className="w-4 h-4 text-gray-400 hover:text-blue-700 cursor-pointer" />
                <Youtube className="w-4 h-4 text-gray-400 hover:text-red-600 cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex items-center justify-between py-4">
            <Logo />
            <nav className="hidden md:flex space-x-8">
              <a href="#inicio" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Início
              </a>
              <a href="#imoveis" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Imóveis
              </a>
              <a href="#sobre" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Sobre Nós
              </a>
              <a href="#sistema" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Sistema
              </a>
              <a href="#contato" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Contato
              </a>
            </nav>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
              <Phone className="w-4 h-4 mr-2" />
              Fale Conosco
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-yellow-500 text-yellow-900 hover:bg-yellow-600">
              Sistema de Gerenciamento Imobiliário 2025
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Imobiliária
              <span className="block text-yellow-400">3 Irmãos</span>
            </h1>
            <p className="text-xl mb-4 text-blue-100">
              <strong>Autores:</strong> Felipe Marques, Nicolas Bruno, Heitor Moreira
            </p>
            <p className="text-lg mb-8 text-blue-100">
              <strong>Uberlândia, Minas Gerais</strong> - Uma empresa inovadora no setor de intermediação imobiliária,
              criada com o propósito de oferecer um serviço moderno, eficiente e confiável.
            </p>

            {/* Search Form */}
            <div className="bg-white rounded-lg p-6 shadow-2xl max-w-4xl mx-auto">
              <div className="flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quero</label>
                  <Select value={searchType} onValueChange={setSearchType}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comprar">Comprar</SelectItem>
                      <SelectItem value="alugar">Alugar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Imóvel</label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartamento">Apartamento</SelectItem>
                      <SelectItem value="casa">Casa</SelectItem>
                      <SelectItem value="comercial">Comercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Localização</label>
                  <Input
                    placeholder="Bairro em Uberlândia"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="h-12"
                  />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 h-12 px-8" asChild>
                  <Link href="/imoveis">
                    <Search className="w-5 h-5 mr-2" />
                    Buscar
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10</div>
              <div className="text-gray-600">Imóveis Cadastrados</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">3</div>
              <div className="text-gray-600">Corretores Especializados</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">7</div>
              <div className="text-gray-600">Clientes Cadastrados</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">2025</div>
              <div className="text-gray-600">Projeto Inovador</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Sobre a Imobiliária
                <span className="block text-blue-600">3 Irmãos</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Fundada por três empreendedores visionários: <strong>Felipe Marques</strong>,{" "}
                <strong>Nicolas Bruno</strong> e <strong>Heitor Moreira</strong>, a empresa nasce com o compromisso de
                transformar a experiência dos clientes por meio do uso inteligente da tecnologia e de um atendimento
                personalizado.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Com sede em <strong>Uberlândia, Minas Gerais</strong>, apostamos em um sistema de gerenciamento
                imobiliário robusto, baseado em um banco de dados relacional, que permite o controle completo de
                informações fundamentais.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">Tecnologia Avançada</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">Banco de Dados Robusto</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">Transparência Total</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">Atendimento Personalizado</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Nossa Missão</h3>
              <p className="text-blue-100 mb-6">
                Ser referência em qualidade e inovação no mercado imobiliário, promovendo a transparência nas
                negociações e a satisfação de todas as partes envolvidas.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Award className="w-6 h-6 text-yellow-400 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Inovação</h4>
                    <p className="text-blue-100">Sistema moderno de gerenciamento</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-yellow-400 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Confiabilidade</h4>
                    <p className="text-blue-100">Parceira confiável na realização de sonhos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sistema Section */}
      <section id="sistema" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Sistema de Gerenciamento</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Um projeto de banco de dados relacional desenvolvido com o objetivo de organizar e controlar informações
              relacionadas à compra e venda de imóveis, garantindo a integridade dos dados e eficiência no processo de
              intermediação imobiliária.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Database className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Banco de Dados MySQL</h3>
              <p className="text-gray-600">
                Sistema baseado em banco de dados relacional com estrutura normalizada e integridade referencial
                completa.
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Gestão Completa</h3>
              <p className="text-gray-600">
                Cadastro de clientes, corretores, imóveis, visitas e contratos com relacionamentos bem definidos.
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Relatórios e Consultas</h3>
              <p className="text-gray-600">
                Sistema de relatórios avançado com consultas SQL otimizadas para análise de dados e tomada de decisões.
              </p>
            </Card>
          </div>

          {/* Funcionalidades */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Funcionalidades Principais</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Cadastro de Clientes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Cadastro de Corretores</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Gerenciamento de Imóveis</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Controle de Visitas e Agendamentos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Relacionamento entre Entidades</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Sistema de Relatórios e Consultas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Entre em Contato</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Estamos prontos para ajudar você a encontrar o imóvel ideal ou apresentar nosso sistema de gerenciamento
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Informações de Contato</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Localização</h4>
                    <p className="text-gray-600">Uberlândia, Minas Gerais</p>
                    <p className="text-gray-600">Sistema desenvolvido em 2025</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Desenvolvedores</h4>
                    <p className="text-gray-600">Felipe Marques</p>
                    <p className="text-gray-600">Nicolas Bruno</p>
                    <p className="text-gray-600">Heitor Moreira</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Telefone</h4>
                    <p className="text-gray-600">(34) 9999-8888</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">E-mail</h4>
                    <p className="text-gray-600">contato@3irmaos.com.br</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Acesse o Sistema</h3>
              <p className="text-gray-600 mb-6">
                Faça login para acessar o sistema de gerenciamento imobiliário e explorar todas as funcionalidades
                desenvolvidas.
              </p>
              <div className="space-y-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/login">
                    <Key className="w-4 h-4 mr-2" />
                    Fazer Login
                  </Link>
                </Button>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/imoveis">
                    <Building2 className="w-4 h-4 mr-2" />
                    Ver Imóveis
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">3 Irmãos</h3>
                  <p className="text-gray-400 text-sm">Imobiliária</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Sistema de Gerenciamento Imobiliário desenvolvido em 2025 por Felipe Marques, Nicolas Bruno e Heitor
                Moreira.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Sistema</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Banco de Dados MySQL</li>
                <li>Interface Web Moderna</li>
                <li>Gestão de Usuários</li>
                <li>Controle de Imóveis</li>
                <li>Sistema de Visitas</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Funcionalidades</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Cadastro de Clientes</li>
                <li>Gestão de Corretores</li>
                <li>Controle de Contratos</li>
                <li>Relatórios Avançados</li>
                <li>Consultas SQL</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Projeto</h4>
              <div className="space-y-3 text-gray-400">
                <p>Uberlândia, Minas Gerais</p>
                <p>Ano: 2025</p>
                <p>Tecnologia: Next.js + MySQL</p>
                <p>Docker + CI/CD</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Imobiliária 3 Irmãos - Sistema de Gerenciamento Imobiliário</p>
            <p className="mt-2">
              Desenvolvido por <span className="text-blue-400">Felipe Marques, Nicolas Bruno e Heitor Moreira</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
