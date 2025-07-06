# Sistema de Gerenciamento Imobiliário - Imobiliária 3 Irmãos

**Autores:** Felipe Marques, Nicolas Bruno, Heitor Moreira  
**Local:** Uberlândia, Minas Gerais  
**Ano:** 2025

---

## Sumário

1. Introdução  
2. Sistema de Gerenciamento  
3. Características do Sistema  
4. Tecnologias Utilizadas  
5. Logo  
6. Modelo Conceitual  
7. Modelo Lógico Relacional  
8. Modelo Lógico Reverso  
9. Scripts MySQL  
10. Consultas SQL  
11. Como Executar  
12. Usuários de Teste  
13. Funcionalidades do Sistema  
14. Estrutura do Projeto  
15. Contribuição  
16. Licença

---

A Imobiliária 3 Irmãos é uma empresa inovadora no setor de intermediação imobiliária, criada com o propósito de oferecer um serviço moderno, eficiente e confiável na compra, venda e aluguel de imóveis. Fundada por três empreendedores visionários, a empresa nasce com o compromisso de transformar a experiência dos clientes por meio do uso inteligente da tecnologia e de um atendimento personalizado. Com sede em Uberlândia, a Imobiliária 3 Irmãos aposta em um sistema de gerenciamento imobiliário robusto, baseado em um banco de dados relacional, que permite o controle completo de informações fundamentais como cadastro de clientes, corretores, imóveis, agendamentos de visitas e contratos.

O objetivo é ser referência em qualidade e inovação no mercado imobiliário, promovendo a transparência nas negociações e a satisfação de todas as partes envolvidas. Acreditamos que, ao unir tecnologia, gestão eficiente e relacionamento humano, conseguimos construir uma empresa sólida e preparada para os desafios do setor. A Imobiliária 3 Irmãos não é apenas uma intermediadora de imóveis, mas uma parceira confiável na realização de sonhos e investimentos, sempre comprometida com a ética, a excelência e a evolução constante.

---

## 2. Sistema de Gerenciamento Imobiliário

O sistema de gerenciamento imobiliário é um projeto de banco de dados relacional desenvolvido com o objetivo de organizar e controlar informações relacionadas à compra e venda de imóveis. Ele permite o cadastro de clientes, corretores, imóveis, visitas e contratos de venda, além do acompanhamento de negociações realizadas.

Este sistema busca garantir a integridade dos dados armazenados e a eficiência no processo de intermediação imobiliária, contribuindo para o controle e registro das transações realizadas em uma imobiliária.

---


## 3. Características do Sistema

### Objetivos

- Armazenar dados de clientes, corretores, imóveis e contratos  
- Registrar visitas e agendamentos de imóveis  
- Controlar informações contratuais relacionadas às vendas  
- Associar corretamente cada imóvel ao seu respectivo proprietário  
- Fornecer uma estrutura padronizada e normalizada de banco de dados  

### Funcionalidades principais

- Cadastro de Clientes, Corretores e Imóveis  
- Controle de visitas e agendamento  
- Relacionamento entre Entidades  
- Sistema de Relatórios e Consultas SQL  
---

## 4. Tecnologias Utilizadas

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS  
- **Backend:** Next.js API Routes, NextAuth.js  
- **Banco de Dados:** MySQL 8.0  
- **Containerização:** Docker, Docker Compose  
- **CI/CD:** GitHub Actions  

---

## 5. Logo

![Logo da Imobiliária](imagens/Captura_de_tela_2025-07-04_215039-removebg-preview.png)

---

## 6. Modelo Conceitual

\`\`\``
Perfil
(id_perf, tipo)



Usuário
(id_usuario, nome, cpf, telefone, email, sexo, data_nascimento,login_usu,senha_usu,id_perf)
id_perf referencia Perfil
Corretor
(id_corretor, CRECI,id_usuario)
id_usuario referencia Usuario

Status_Imovel
(id_status, descricao_status)


Endereco
(id_endereco, logradouro, numero, bairro, complemento, cidade, estado, cep)

Imovel
(id_imovel, id_status, area_total, quartos, banheiros, vagas_garagem, valor_imovel, id_endereco, id_corretor)
id_endereco referencia Endereco
id_corretor referencia corretor 
id_status referencia Status_imovel


Visita
(id_visita, data_visita, hora_visita, status_visita, id_corretor, id_usuario, id_imovel)
id_corretor referencia Corretor
id_usuario referencia Usuario
id_imovel referencia Imovel

Contrato_Aluguel
(id_contrato_aluguel, tipo, data_inicio, data_fim, valor_mensalidade, id_usuario, id_imovel)
id_usuario referencia usuario
id_imovel referencia Imovel

Contrato_Venda
(id_contrato, tipo, data_inicio, data_fim, valor_negociado, id_usuario, id_imovel)
id_usuario referencia Usuario
id_imovel referencia Imovel

\`\`\``


---

## 7. Modelo Lógico Relacional

(Conforme já está detalhado no README.md, incluindo as tabelas com suas chaves primárias e estrangeiras)

---

## 8. Modelo Lógico Reverso

![Modelo Lógico Reverso](imagens/Captura%20de%20tela%202025-07-04%20204737.png)

---

## 9. Scripts MySQL

\`\`\`sql
CREATE DATABASE Imobiliaria;
USE Imobiliaria;

CREATE TABLE Perfil (
    id_Perf INT PRIMARY KEY,
    tipo_perf VARCHAR(50)
);

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
    FOREIGN KEY (fk_Perfil_id) REFERENCES Perfil(id_Perf)  -- Corrigido para id_Perf
);

CREATE TABLE Corretor (
    id_corretor INT PRIMARY KEY,
    creci VARCHAR(20),
    fk_usuario_id int,
    FOREIGN KEY (fk_usuario_id) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Status_Imovel (
    id_status INT PRIMARY KEY,
    descricao_status VARCHAR(100)
);

CREATE TABLE Endereco(
    id_endereco int primary key,
    logradouro VARCHAR(100),
    numero VARCHAR(10),
    bairro VARCHAR(50),
    complemento VARCHAR(50),
    cidade VARCHAR(50),
    estado CHAR(2),
    cep VARCHAR(10)
);

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
    fk_id_endereco int,
    fk_id_corretor int,
    FOREIGN KEY(fk_id_endereco) REFERENCES Endereco(id_endereco),
    FOREIGN KEY (fk_id_status) REFERENCES Status_Imovel(id_status),
    FOREIGN KEY (fk_id_corretor) REFERENCES Corretor(id_corretor)
);

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

INSERT INTO Perfil (id_Perf, tipo_perf) VALUES
(1, 'Administrador'),
(2, 'Corretor'),
(3, 'Cliente');

INSERT INTO Usuario (id_usuario, nome, cpf, telefone, email, data_nascimento, sexo, login_usu, senha_usu, fk_Perfil_id) VALUES
(1, 'Carlos Silva', '123.456.789-01', '(34) 9999-8888', 'carlos@imobiliaria.com', '1980-05-15', 'M', 'carlos.silva', 'senha123', 1),
(2, 'Ana Paula Oliveira', '987.654.321-09', '(34) 9888-7777', 'ana@imobiliaria.com', '1985-08-20', 'F', 'ana.oliveira', 'senha456', 1),
(3, 'Marcos Antônio', '111.222.333-44', '(34) 9777-6666', 'marcos@imobiliaria.com', '1990-03-10', 'M', 'marcos.antonio', 'senha789', 2),
(4, 'Juliana Costa', '555.666.777-88', '(34) 9666-5555', 'juliana@imobiliaria.com', '1988-11-25', 'F', 'juliana.costa', 'senha101', 2),
(5, 'Roberto Almeida', '999.888.777-66', '(34) 9555-4444', 'roberto@imobiliaria.com', '1982-07-30', 'M', 'roberto.almeida', 'senha202', 2),
(6, 'Fernando Gomes', '222.333.444-55', '(34) 9444-3333', 'fernando@gmail.com', '1995-02-18', 'M', 'fernando.gomes', 'senha303', 3),
(7, 'Patrícia Souza', '333.444.555-66', '(34) 9333-2222', 'patricia@gmail.com', '1992-09-12', 'F', 'patricia.souza', 'senha404', 3),
(8, 'Ricardo Pereira', '444.555.666-77', '(34) 9222-1111', 'ricardo@gmail.com', '1987-04-05', 'M', 'ricardo.pereira', 'senha505', 3),
(9, 'Amanda Nunes', '555.666.777-88', '(34) 9111-0000', 'amanda@gmail.com', '1993-12-22', 'F', 'amanda.nunes', 'senha606', 3),
(10, 'Lucas Martins', '666.777.888-99', '(34) 9000-9999', 'lucas@gmail.com', '1991-06-15', 'M', 'lucas.martins', 'senha707', 3);

INSERT INTO Corretor (id_corretor, creci, fk_usuario_id) VALUES
(1, 'MG-12345', 3),
(2, 'MG-54321', 4),
(3, 'MG-98765', 5);

INSERT INTO Status_Imovel (id_status, descricao_status) VALUES
(1, 'Disponível para venda'),
(2, 'Disponível para aluguel'),
(3, 'Vendido'),
(4, 'Alugado'),
(5, 'Indisponível');

INSERT INTO Endereco (id_endereco, logradouro, numero, bairro, complemento, cidade, estado, cep) VALUES
(1, 'Rua Professor José Ignácio de Souza', '1450', 'Martins', 'Apto 302', 'Uberlândia', 'MG', '38400-128'),
(2, 'Avenida João Naves de Ávila', '2500', 'Santa Mônica', 'Casa 2', 'Uberlândia', 'MG', '38408-100'),
(3, 'Rua Tiradentes', '789', 'Centro', 'Sala 501', 'Uberlândia', 'MG', '38400-186'),
(4, 'Rua das Acácias', '45', 'Jardim Patrícia', '', 'Uberlândia', 'MG', '38411-108'),
(5, 'Avenida Rondon Pacheco', '3700', 'Tibery', 'Bloco B', 'Uberlândia', 'MG', '38405-000'),
(6, 'Rua dos Ipês', '120', 'Planalto', '', 'Uberlândia', 'MG', '38410-558'),
(7, 'Rua das Hortênsias', '85', 'Mansour', 'Fundos', 'Uberlândia', 'MG', '38400-456'),
(8, 'Avenida Antônio Thomaz Ferreira de Rezende', '2001', 'Laranjeiras', 'Apto 1204', 'Uberlândia', 'MG', '38411-006'),
(9, 'Rua Goiás', '500', 'Fundinho', 'Sobrado', 'Uberlândia', 'MG', '38400-012'),
(10, 'Rua das Rosas', '33', 'Jardim Karaíba', '', 'Uberlândia', 'MG', '38412-345');

INSERT INTO Imovel (id_imovel, area_total, quarto, banheiro, vaga_garagem, valor, tipo, desc_tipo_imovel, fk_id_status, fk_id_endereco, fk_id_corretor) VALUES
(1, 85.50, 2, 1, 1, 250000.00, 'Apartamento', 'Apartamento padrão, 2 quartos', 1, 1, 1),
(2, 120.00, 3, 2, 2, 450000.00, 'Apartamento', 'Apartamento luxo, 3 quartos', 1, 8, 2),
(3, 180.00, 4, 3, 2, 650000.00, 'Casa', 'Casa padrão, 4 quartos', 1, 2, 3),
(4, 220.00, 5, 4, 3, 850000.00, 'Casa', 'Casa luxo, 5 quartos', 1, 4, 1),
(5, 65.00, 1, 1, 1, 1200.00, 'Apartamento', 'Kitnet para aluguel', 2, 3, 2),
(6, 90.00, 2, 1, 1, 1800.00, 'Apartamento', 'Apartamento para aluguel', 2, 5, 3),
(7, 150.00, 3, 2, 2, 2500.00, 'Casa', 'Casa para aluguel', 2, 6, 1),
(8, 200.00, 4, 3, 2, 750000.00, 'Casa', 'Casa vendida', 3, 7, 2),
(9, 75.00, 2, 1, 1, 1500.00, 'Apartamento', 'Apartamento alugado', 4, 9, 3),
(10, 300.00, 0, 2, 5, 1200000.00, 'Comercial', 'Sala comercial', 1, 10, 1);

INSERT INTO Visita (id_visita, data_visita, hora_visita, status_visita, fk_id_usuario, fk_id_corretor, fk_id_imovel) VALUES
(1, '2023-05-10', '14:00:00', 'Realizada', 6, 1, 1),
(2, '2023-05-12', '10:30:00', 'Realizada', 7, 2, 3),
(3, '2023-05-15', '16:00:00', 'Realizada', 8, 3, 5),
(4, '2023-05-18', '09:00:00', 'Cancelada', 9, 1, 2),
(5, '2023-05-20', '15:30:00', 'Realizada', 10, 2, 4),
(6, '2023-05-22', '11:00:00', 'Agendada', 6, 3, 6),
(7, '2023-05-25', '17:00:00', 'Agendada', 7, 1, 7),
(8, '2023-05-28', '14:30:00', 'Realizada', 8, 2, 8),
(9, '2023-06-01', '10:00:00', 'Realizada', 9, 3, 9),
(10, '2023-06-05', '16:30:00', 'Realizada', 10, 1, 10);

INSERT INTO Contrato_Aluguel (id_contrato_alug, tipo, data_inicio, data_fim, valor_mensalidade, fk_id_usuario, fk_id_imovel) VALUES
(1, 'Residencial', '2023-01-15', '2024-01-14', 1500.00, 6, 9),
(2, 'Residencial', '2023-03-01', '2024-02-28', 1800.00, 7, 6),
(3, 'Residencial', '2023-04-10', '2024-04-09', 1200.00, 8, 5);

INSERT INTO Contrato_Venda (id_contrato_venda, tipo_venda, data_inicio, data_fim, valor_negociado, fk_id_usuario, fk_id_imovel) VALUES
(1, 'À vista', '2023-02-20', '2023-02-20', 730000.00, 9, 8),
(2, 'Financiado', '2023-04-05', '2023-06-05', 240000.00, 10, 1),
(3, 'À vista', '2023-05-15', '2023-05-15', 820000.00, 6, 3);


select * from Usuario
where id_usuario IN (select fk_usuario_id from Corretor);


select i.id_imovel, i.tipo, i.valor, s.descricao_status
FROM Imovel i
JOIN Status_Imovel s ON i.fk_id_status = s.id_status
WHERE s.descricao_status = 'Disponível para venda';


select id_contrato_alug, valor_mensalidade
from Contrato_Aluguel
where valor_mensalidade > 1500;
\`\`\``

---

## 10. Consultas SQL

\`\`\`sql
-- Corretores
SELECT * FROM Usuario
WHERE id_usuario IN (SELECT fk_usuario_id FROM Corretor);

-- Imóveis disponíveis para venda
SELECT i.id_imovel, i.tipo, i.valor, s.descricao_status
FROM Imovel i
JOIN Status_Imovel s ON i.fk_id_status = s.id_status
WHERE s.descricao_status = 'Disponível para venda';

-- Contratos de aluguel com valor maior que R$ 1500
SELECT id_contrato_alug, valor_mensalidade
FROM Contrato_Aluguel
WHERE valor_mensalidade > 1500;
\`\`\`
## 10. Projeto Docker e Aplicação Java

Docker-compose.yml

\`\`\`yaml
version: "3.8"

services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: Imobiliaria
      MYSQL_USER: root
      MYSQL_PASSWORD: rootpassword
    ports:
      - "3307:3306"
    command: --default-authentication-plugin=mysql_native_password

  app:
    build: .
    depends_on:
      - mysql
    environment:
      DB_HOST: mysql
      DB_PORT: 3306
      DB_NAME: Imobiliaria
      DB_USER: root
      DB_PASS: rootpassword
\`\`\`

Dockerfile

\`\`\`Dockerfile
FROM eclipse-temurin:17-jdk-alpine AS builder

WORKDIR /app

COPY MinhaApp.java .
COPY mysql-connector-java-8.0.30.jar .

RUN javac -cp mysql-connector-java-8.0.30.jar MinhaApp.java


FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY --from=builder /app/mysql-connector-java-8.0.30.jar .
COPY --from=builder /app/MinhaApp.class .

CMD ["java", "-cp", ".:mysql-connector-java-8.0.30.jar", "MinhaApp"]
\`\`\``
env

\`\`\``.env
MYSQL_ROOT_PASSWORD=Felipe123
MYSQL_DATABASE=imobiliaria
MYSQL_USER=nicolas
MYSQL_PASSWORD=@
MYSQL_HOST=localhost
MYSQL_PORT=3306
\`\`\``

MinhaApp.java

\`\`\`java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class MinhaApp {
    public static void main(String[] args) {
        String url = "jdbc:mysql://" + System.getenv("DB_HOST") + ":" + System.getenv("DB_PORT") + "/" + System.getenv("DB_NAME");
        String user = System.getenv("DB_USER");
        String password = System.getenv("DB_PASS");

        try {
            
            Class.forName("com.mysql.cj.jdbc.Driver");

            Connection conn = DriverManager.getConnection(url, user, password);
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM Usuario LIMIT 3");

            while(rs.next()){
                System.out.println("Usuário: " + rs.getString("nome") + ", Email: " + rs.getString("email"));
            }

            rs.close();
            stmt.close();
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
\`\`\`

## 11. GitHub Actions para CI/CD
\`\`\`yaml
name: Docker Image CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v4
    - name: Build the Docker image
      run: docker build . --file Dockerfile --tag my-image-name:$(date +%s)
\`\`\`
---

## 12. Como Executar

### Pré-requisitos
- Node.js 18+  
- Docker e Docker Compose  
- Git  

### Instalação

\`\`\`giy
git clone https://github.com/seu-usuario/imobiliaria-3-irmaos.git
cd imobiliaria-3-irmaos
npm install
cp .env.local.example .env.local
\`\`\`

### Execução

\`\`\`docker
docker-compose up -d
# ou
npm run dev
\`\`\`

---

## 13. Usuários de Teste

### Administradores  
- Carlos Silva – carlos@imobiliaria.com / senha123  
- Ana Paula Oliveira – ana@imobiliaria.com / senha123

### Corretores  
- Marcos Antônio – marcos@imobiliaria.com / senha123 (CRECI: MG-12345)  
- Juliana Costa – juliana@imobiliaria.com / senha123 (CRECI: MG-54321)  
- Roberto Almeida – roberto@imobiliaria.com / senha123 (CRECI: MG-98765)

### Clientes  
- Fernando Gomes – fernando@gmail.com / senha123  
- Patrícia Souza – patricia@gmail.com / senha123  
- Ricardo Pereira – ricardo@gmail.com / senha123

---

## 14. Funcionalidades do Sistema

✅ Autenticação com perfis  
✅ Dashboard por tipo de usuário  
✅ Busca e filtros avançados  
✅ Agendamento de visitas  
✅ Controle de contratos  
✅ Relatórios SQL  
✅ Interface responsiva

---

## 15. Estrutura do Projeto

\`\`\`
imobiliaria-3-irmaos/
├── app/                # Páginas Next.js
├── components/         # Componentes React
├── lib/                # Utilitários e configurações
├── scripts/            # Scripts SQL
├── docker-compose.yml  # Configuração Docker
├── Dockerfile          # Imagem Docker
└── README.md           # Documentação
\`\`\`

---

## 16. Contribuição

Este projeto foi desenvolvido como parte de um trabalho acadêmico pelos autores Felipe Marques, Nicolas Bruno e Heitor Moreira.

---

## 17. Licença

Este projeto é de uso acadêmico e foi desenvolvido para fins educacionais.  
**Imobiliária 3 Irmãos** — Transformando sonhos em realidade através da tecnologia.
