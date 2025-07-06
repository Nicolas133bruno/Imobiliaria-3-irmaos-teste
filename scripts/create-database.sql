-- Sistema de Gerenciamento Imobiliário - Imobiliária 3 Irmãos
-- Autores: Felipe Marques, Nicolas Bruno, Heitor Moreira
-- Local: Uberlândia, Minas Gerais
-- Ano: 2025

CREATE DATABASE IF NOT EXISTS Imobiliaria;
USE Imobiliaria;

-- Tabela de Perfis
CREATE TABLE Perfil (
    id_Perf INT PRIMARY KEY,
    tipo_perf VARCHAR(50)
);

-- Tabela de Usuários
CREATE TABLE Usuario (
    id_usuario INT PRIMARY KEY,
    nome VARCHAR(100),
    cpf VARCHAR(14),
    telefone VARCHAR(20),
    email VARCHAR(100),
    data_nascimento DATE,
    sexo CHAR(1),
    login_usu VARCHAR(50),
    senha_usu VARCHAR(100),
    fk_Perfil_id INT,
    FOREIGN KEY (fk_Perfil_id) REFERENCES Perfil(id_Perf)
);

-- Tabela de Corretores
CREATE TABLE Corretor (
    id_corretor INT PRIMARY KEY,
    creci VARCHAR(20),
    fk_usuario_id INT,
    FOREIGN KEY (fk_usuario_id) REFERENCES Usuario(id_usuario)
);

-- Tabela de Status dos Imóveis
CREATE TABLE Status_Imovel (
    id_status INT PRIMARY KEY,
    descricao_status VARCHAR(100)
);

-- Tabela de Endereços
CREATE TABLE Endereco (
    id_endereco INT PRIMARY KEY,
    logradouro VARCHAR(100),
    numero VARCHAR(10),
    bairro VARCHAR(50),
    complemento VARCHAR(50),
    cidade VARCHAR(50),
    estado CHAR(2),
    cep VARCHAR(10)
);

-- Tabela de Imóveis
CREATE TABLE Imovel (
    id_imovel INT PRIMARY KEY,
    area_total DECIMAL(10,2),
    quarto INT,
    banheiro INT,
    vaga_garagem INT,
    valor DECIMAL(12,2),
    tipo VARCHAR(50),
    desc_tipo_imovel VARCHAR(100),
    fk_id_status INT,
    fk_id_endereco INT,
    fk_id_corretor INT,
    FOREIGN KEY(fk_id_endereco) REFERENCES Endereco(id_endereco),
    FOREIGN KEY (fk_id_status) REFERENCES Status_Imovel(id_status),
    FOREIGN KEY (fk_id_corretor) REFERENCES Corretor(id_corretor)
);

-- Tabela de Visitas
CREATE TABLE Visita (
    id_visita INT PRIMARY KEY,
    data_visita DATE,
    hora_visita TIME,
    status_visita VARCHAR(50),
    fk_id_usuario INT,
    fk_id_corretor INT,
    fk_id_imovel INT,
    FOREIGN KEY (fk_id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (fk_id_corretor) REFERENCES Corretor(id_corretor),
    FOREIGN KEY (fk_id_imovel) REFERENCES Imovel(id_imovel)
);

-- Tabela de Contratos de Aluguel
CREATE TABLE Contrato_Aluguel (
    id_contrato_alug INT PRIMARY KEY,
    tipo VARCHAR(50),
    data_inicio DATE,
    data_fim DATE,
    valor_mensalidade DECIMAL(12,2),
    fk_id_usuario INT,
    fk_id_imovel INT,
    FOREIGN KEY (fk_id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (fk_id_imovel) REFERENCES Imovel(id_imovel)
);

-- Tabela de Contratos de Venda
CREATE TABLE Contrato_Venda (
    id_contrato_venda INT PRIMARY KEY,
    tipo_venda VARCHAR(50),
    data_inicio DATE,
    data_fim DATE,
    valor_negociado DECIMAL(12,2),
    fk_id_usuario INT,
    fk_id_imovel INT,
    FOREIGN KEY (fk_id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (fk_id_imovel) REFERENCES Imovel(id_imovel)
);
