-- Consultas SQL baseadas no documento do projeto

-- 1. Usuários que são corretores
SELECT * FROM Usuario 
WHERE id_usuario IN (SELECT fk_usuario_id FROM Corretor);

-- 2. Imóveis disponíveis para venda
SELECT i.id_imovel, i.tipo, i.valor, s.descricao_status 
FROM Imovel i 
JOIN Status_Imovel s ON i.fk_id_status = s.id_status 
WHERE s.descricao_status = 'Disponível para venda';

-- 3. Contratos de aluguel com valor acima de R$ 1500
SELECT id_contrato_alug, valor_mensalidade 
FROM Contrato_Aluguel 
WHERE valor_mensalidade > 1500;

-- Consultas adicionais para relatórios

-- 4. Relatório completo de imóveis com endereço e corretor
SELECT 
    i.id_imovel,
    i.desc_tipo_imovel,
    i.valor,
    i.area_total,
    e.logradouro,
    e.bairro,
    e.cidade,
    u.nome as corretor_nome,
    c.creci,
    s.descricao_status
FROM Imovel i
JOIN Endereco e ON i.fk_id_endereco = e.id_endereco
JOIN Corretor c ON i.fk_id_corretor = c.id_corretor
JOIN Usuario u ON c.fk_usuario_id = u.id_usuario
JOIN Status_Imovel s ON i.fk_id_status = s.id_status;

-- 5. Visitas por corretor
SELECT 
    u.nome as corretor,
    COUNT(v.id_visita) as total_visitas,
    COUNT(CASE WHEN v.status_visita = 'Realizada' THEN 1 END) as visitas_realizadas
FROM Corretor c
JOIN Usuario u ON c.fk_usuario_id = u.id_usuario
LEFT JOIN Visita v ON c.id_corretor = v.fk_id_corretor
GROUP BY c.id_corretor, u.nome;

-- 6. Contratos por cliente
SELECT 
    u.nome as cliente,
    u.email,
    COUNT(ca.id_contrato_alug) as contratos_aluguel,
    COUNT(cv.id_contrato_venda) as contratos_venda
FROM Usuario u
LEFT JOIN Contrato_Aluguel ca ON u.id_usuario = ca.fk_id_usuario
LEFT JOIN Contrato_Venda cv ON u.id_usuario = cv.fk_id_usuario
WHERE u.fk_Perfil_id = 3
GROUP BY u.id_usuario, u.nome, u.email;
