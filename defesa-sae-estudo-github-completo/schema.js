window.SCHEMA=[
  {
    "name": "instituicoes",
    "description": "Cadastro e identidade da instituição. É a conta consultada no login institucional e o centro do escopo dos dados.",
    "source": "banco/tabelas/instituicoes.php",
    "ddl": "CREATE TABLE IF NOT EXISTS `instituicoes` (\r\n  `id` INT AUTO_INCREMENT PRIMARY KEY,\r\n  `nome` VARCHAR(255) NOT NULL UNIQUE,\r\n  `email` VARCHAR(255) NOT NULL UNIQUE,\r\n  `senha` VARCHAR(255) NOT NULL,\r\n  `telefone` VARCHAR(20),\r\n  `endereco` TEXT,\r\n  `cidade` VARCHAR(100),\r\n  `estado` VARCHAR(2),\r\n  `data_criacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\r\n  `token_recuperacao` VARCHAR(255),\r\n  `token_expira` DATETIME,\r\n  INDEX idx_email (email)\r\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    "columns": [
      {
        "name": "id",
        "definition": "INT AUTO_INCREMENT PRIMARY KEY",
        "description": "Identificador técnico da linha. Chave primária, não uma permissão de acesso."
      },
      {
        "name": "nome",
        "definition": "VARCHAR(255) NOT NULL UNIQUE",
        "description": "Nome exibido na interface."
      },
      {
        "name": "email",
        "definition": "VARCHAR(255) NOT NULL UNIQUE",
        "description": "Endereço usado para identificação ou contato conforme a entidade."
      },
      {
        "name": "senha",
        "definition": "VARCHAR(255) NOT NULL",
        "description": "Hash da senha, nunca a senha original para exibição."
      },
      {
        "name": "telefone",
        "definition": "VARCHAR(20)",
        "description": "Contato como texto, preservando símbolos e zeros iniciais."
      },
      {
        "name": "endereco",
        "definition": "TEXT",
        "description": "Endereço textual da instituição."
      },
      {
        "name": "cidade",
        "definition": "VARCHAR(100)",
        "description": "Cidade da instituição."
      },
      {
        "name": "estado",
        "definition": "VARCHAR(2)",
        "description": "Sigla da unidade federativa."
      },
      {
        "name": "data_criacao",
        "definition": "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "description": "Momento de criação, preenchido automaticamente pelo banco."
      },
      {
        "name": "token_recuperacao",
        "definition": "VARCHAR(255)",
        "description": "Token temporário de recuperação; a implementação atual guarda seu valor em texto."
      },
      {
        "name": "token_expira",
        "definition": "DATETIME",
        "description": "Limite temporal de validade do token."
      },
      {
        "name": "tema",
        "definition": "VARCHAR(10) NOT NULL DEFAULT 'claro'",
        "description": "Preferência visual; adicionada pela migração.",
        "migration": true
      }
    ],
    "links": [],
    "rules": [
      "INDEX idx_email (email)"
    ]
  },
  {
    "name": "administradores",
    "description": "Identidades da área administrativa. A definição não vincula cada administrador a uma instituição.",
    "source": "banco/tabelas/administradores.php",
    "ddl": "CREATE TABLE IF NOT EXISTS `administradores` (\r\n  `id` INT AUTO_INCREMENT PRIMARY KEY,\r\n  `nome` VARCHAR(255) NOT NULL,\r\n  `email` VARCHAR(255) NOT NULL UNIQUE,\r\n  `senha` VARCHAR(255) NOT NULL,\r\n  `ativo` BOOLEAN DEFAULT TRUE,\r\n  `data_criacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\r\n  INDEX idx_email (email)\r\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    "columns": [
      {
        "name": "id",
        "definition": "INT AUTO_INCREMENT PRIMARY KEY",
        "description": "Identificador técnico da linha. Chave primária, não uma permissão de acesso."
      },
      {
        "name": "nome",
        "definition": "VARCHAR(255) NOT NULL",
        "description": "Nome exibido na interface."
      },
      {
        "name": "email",
        "definition": "VARCHAR(255) NOT NULL UNIQUE",
        "description": "Endereço usado para identificação ou contato conforme a entidade."
      },
      {
        "name": "senha",
        "definition": "VARCHAR(255) NOT NULL",
        "description": "Hash da senha, nunca a senha original para exibição."
      },
      {
        "name": "ativo",
        "definition": "BOOLEAN DEFAULT TRUE",
        "description": "Estado ativo/inativo. Desativar preserva o registro."
      },
      {
        "name": "data_criacao",
        "definition": "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "description": "Momento de criação, preenchido automaticamente pelo banco."
      },
      {
        "name": "nivel",
        "definition": "VARCHAR(30) NOT NULL DEFAULT 'Administrador'",
        "description": "Nível administrativo adicionado pela migração.",
        "migration": true
      }
    ],
    "links": [],
    "rules": [
      "INDEX idx_email (email)"
    ]
  },
  {
    "name": "alunos",
    "description": "Cadastro de alunos com código único por instituição, utilizado na identificação por QR.",
    "source": "banco/tabelas/alunos.php",
    "ddl": "CREATE TABLE IF NOT EXISTS `alunos` (\r\n  `id` INT AUTO_INCREMENT PRIMARY KEY,\r\n  `instituicao_id` INT NOT NULL,\r\n  `nome` VARCHAR(255) NOT NULL,\r\n  `turma` VARCHAR(50),\r\n  `codigo` VARCHAR(100),\r\n  `data_nascimento` DATE,\r\n  `responsavel` VARCHAR(255),\r\n  `telefone` VARCHAR(20),\r\n  `ativo` BOOLEAN DEFAULT TRUE,\r\n  `data_criacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\r\n  UNIQUE KEY unique_codigo_por_instituicao (instituicao_id, codigo),\r\n  INDEX idx_turma (turma),\r\n  FOREIGN KEY (instituicao_id) REFERENCES instituicoes(id) ON DELETE CASCADE\r\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    "columns": [
      {
        "name": "id",
        "definition": "INT AUTO_INCREMENT PRIMARY KEY",
        "description": "Identificador técnico da linha. Chave primária, não uma permissão de acesso."
      },
      {
        "name": "instituicao_id",
        "definition": "INT NOT NULL",
        "description": "Instituição proprietária do registro; base para os filtros de escopo."
      },
      {
        "name": "nome",
        "definition": "VARCHAR(255) NOT NULL",
        "description": "Nome exibido na interface."
      },
      {
        "name": "turma",
        "definition": "VARCHAR(50)",
        "description": "Turma do aluno; possui índice no esquema inicial."
      },
      {
        "name": "codigo",
        "definition": "VARCHAR(100)",
        "description": "Identificador lido pelo QR; único por instituição quando preenchido."
      },
      {
        "name": "data_nascimento",
        "definition": "DATE",
        "description": "Data de nascimento do aluno."
      },
      {
        "name": "responsavel",
        "definition": "VARCHAR(255)",
        "description": "Nome do responsável."
      },
      {
        "name": "telefone",
        "definition": "VARCHAR(20)",
        "description": "Contato como texto, preservando símbolos e zeros iniciais."
      },
      {
        "name": "ativo",
        "definition": "BOOLEAN DEFAULT TRUE",
        "description": "Estado ativo/inativo. Desativar preserva o registro."
      },
      {
        "name": "data_criacao",
        "definition": "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "description": "Momento de criação, preenchido automaticamente pelo banco."
      }
    ],
    "links": [
      {
        "column": "instituicao_id",
        "target": "instituicoes",
        "key": "id",
        "onDelete": "CASCADE",
        "logical": false
      }
    ],
    "rules": [
      "UNIQUE KEY unique_codigo_por_instituicao (instituicao_id, codigo),",
      "INDEX idx_turma (turma),"
    ]
  },
  {
    "name": "cardapio_itens",
    "description": "Associação entre cardápio e produto, com a quantidade necessária. Criada pela migração.",
    "source": "banco/migrar_integracao.php",
    "ddl": "CREATE TABLE IF NOT EXISTS cardapio_itens (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    cardapio_id INT NOT NULL,\n    estoque_id INT NOT NULL,\n    quantidade DECIMAL(10,2) NOT NULL,\n    FOREIGN KEY (cardapio_id) REFERENCES cardapios(id) ON DELETE CASCADE,\n    FOREIGN KEY (estoque_id) REFERENCES estoque(id)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci\");",
    "columns": [
      {
        "name": "id",
        "definition": "INT AUTO_INCREMENT PRIMARY KEY",
        "description": "Identificador técnico da linha. Chave primária, não uma permissão de acesso.",
        "migration": true
      },
      {
        "name": "cardapio_id",
        "definition": "INT NOT NULL",
        "description": "Cardápio ao qual a participação pertence.",
        "migration": true
      },
      {
        "name": "estoque_id",
        "definition": "INT NOT NULL",
        "description": "Produto usado no cardápio; sua FK restringe exclusão quando referenciado.",
        "migration": true
      },
      {
        "name": "quantidade",
        "definition": "DECIMAL(10,2) NOT NULL",
        "description": "Quantidade: saldo no estoque, uso no item de cardápio ou número de refeições, conforme a tabela.",
        "migration": true
      }
    ],
    "links": [
      {
        "column": "cardapio_id",
        "target": "cardapios",
        "key": "id",
        "onDelete": "CASCADE",
        "logical": false
      },
      {
        "column": "estoque_id",
        "target": "estoque",
        "key": "id",
        "onDelete": "RESTRICT / NO ACTION",
        "logical": false
      }
    ],
    "rules": [
      "Não há UNIQUE(cardapio_id, estoque_id) declarado."
    ]
  },
  {
    "name": "cardapios",
    "description": "Cabeçalho do cardápio: nome, descrição, data e turno.",
    "source": "banco/tabelas/cardapios.php",
    "ddl": "CREATE TABLE IF NOT EXISTS `cardapios` (\r\n  `id` INT AUTO_INCREMENT PRIMARY KEY,\r\n  `instituicao_id` INT NOT NULL,\r\n  `nome` VARCHAR(255) NOT NULL,\r\n  `descricao` TEXT,\r\n  `data_cardapio` DATE,\r\n  `turno_id` INT,\r\n  `ativo` BOOLEAN DEFAULT TRUE,\r\n  `data_criacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\r\n  FOREIGN KEY (instituicao_id) REFERENCES instituicoes(id) ON DELETE CASCADE,\r\n  FOREIGN KEY (turno_id) REFERENCES turnos(id) ON DELETE SET NULL\r\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    "columns": [
      {
        "name": "id",
        "definition": "INT AUTO_INCREMENT PRIMARY KEY",
        "description": "Identificador técnico da linha. Chave primária, não uma permissão de acesso."
      },
      {
        "name": "instituicao_id",
        "definition": "INT NOT NULL",
        "description": "Instituição proprietária do registro; base para os filtros de escopo."
      },
      {
        "name": "nome",
        "definition": "VARCHAR(255) NOT NULL",
        "description": "Nome exibido na interface."
      },
      {
        "name": "descricao",
        "definition": "TEXT",
        "description": "Descrição livre do registro ou evento."
      },
      {
        "name": "data_cardapio",
        "definition": "DATE",
        "description": "Dia a que o cardápio se refere."
      },
      {
        "name": "turno_id",
        "definition": "INT",
        "description": "Referência ao turno. Em refeicoes, o script de migração não declara FK."
      },
      {
        "name": "ativo",
        "definition": "BOOLEAN DEFAULT TRUE",
        "description": "Estado ativo/inativo. Desativar preserva o registro."
      },
      {
        "name": "data_criacao",
        "definition": "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "description": "Momento de criação, preenchido automaticamente pelo banco."
      }
    ],
    "links": [
      {
        "column": "instituicao_id",
        "target": "instituicoes",
        "key": "id",
        "onDelete": "CASCADE",
        "logical": false
      },
      {
        "column": "turno_id",
        "target": "turnos",
        "key": "id",
        "onDelete": "SET NULL",
        "logical": false
      }
    ],
    "rules": []
  },
  {
    "name": "configuracoes_estoque",
    "description": "Preferências de estoque, com no máximo uma configuração por instituição.",
    "source": "banco/tabelas/configuracoes_estoque.php",
    "ddl": "CREATE TABLE IF NOT EXISTS `configuracoes_estoque` (\r\n  `id` INT AUTO_INCREMENT PRIMARY KEY,\r\n  `instituicao_id` INT NOT NULL,\r\n\r\n  `estoque_minimo` DECIMAL(10, 2) NOT NULL DEFAULT 5.00,\r\n  `alerta_estoque_baixo` BOOLEAN DEFAULT TRUE,\r\n\r\n  `alerta_validade` BOOLEAN DEFAULT TRUE,\r\n  `dias_alerta_validade` INT NOT NULL DEFAULT 30,\r\n\r\n  `unidade_padrao` VARCHAR(50) NOT NULL DEFAULT 'Unidade',\r\n\r\n  `permitir_estoque_zero` BOOLEAN DEFAULT TRUE,\r\n\r\n  `data_atualizacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP\r\n    ON UPDATE CURRENT_TIMESTAMP,\r\n\r\n  UNIQUE KEY `uk_configuracoes_estoque_instituicao` (`instituicao_id`),\r\n\r\n  FOREIGN KEY (`instituicao_id`)\r\n    REFERENCES `instituicoes`(`id`)\r\n    ON DELETE CASCADE\r\n\r\n) ENGINE=InnoDB\r\nDEFAULT CHARSET=utf8mb4\r\nCOLLATE=utf8mb4_unicode_ci;",
    "columns": [
      {
        "name": "id",
        "definition": "INT AUTO_INCREMENT PRIMARY KEY",
        "description": "Identificador técnico da linha. Chave primária, não uma permissão de acesso."
      },
      {
        "name": "instituicao_id",
        "definition": "INT NOT NULL",
        "description": "Instituição proprietária do registro; base para os filtros de escopo."
      },
      {
        "name": "estoque_minimo",
        "definition": "DECIMAL(10, 2) NOT NULL DEFAULT 5.00",
        "description": "Limite configurado para comparação e alerta de saldo baixo."
      },
      {
        "name": "alerta_estoque_baixo",
        "definition": "BOOLEAN DEFAULT TRUE",
        "description": "Preferência para alerta de saldo baixo."
      },
      {
        "name": "alerta_validade",
        "definition": "BOOLEAN DEFAULT TRUE",
        "description": "Preferência para alerta de validade."
      },
      {
        "name": "dias_alerta_validade",
        "definition": "INT NOT NULL DEFAULT 30",
        "description": "Antecedência em dias para alerta."
      },
      {
        "name": "unidade_padrao",
        "definition": "VARCHAR(50) NOT NULL DEFAULT 'Unidade'",
        "description": "Unidade sugerida nas configurações."
      },
      {
        "name": "permitir_estoque_zero",
        "definition": "BOOLEAN DEFAULT TRUE",
        "description": "Preferência persistida; não confundir com constraint CHECK de saldo."
      },
      {
        "name": "data_atualizacao",
        "definition": "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "description": "Atualizada automaticamente pelo banco quando a linha muda."
      }
    ],
    "links": [
      {
        "column": "instituicao_id",
        "target": "instituicoes",
        "key": "id",
        "onDelete": "CASCADE",
        "logical": false
      }
    ],
    "rules": [
      "UNIQUE KEY `uk_configuracoes_estoque_instituicao` (`instituicao_id`),"
    ]
  },
  {
    "name": "consumo",
    "description": "Representação prevista para associar aluno a produto consumido. O endpoint registrar_consumo.php atual grava em refeicoes, não nesta tabela.",
    "source": "banco/tabelas/consumo.php",
    "ddl": "CREATE TABLE IF NOT EXISTS `consumo` (\r\n  `id` INT AUTO_INCREMENT PRIMARY KEY,\r\n  `instituicao_id` INT NOT NULL,\r\n  `aluno_id` INT NOT NULL,\r\n  `item_estoque_id` INT,\r\n  `quantidade_consumida` DECIMAL(10, 2),\r\n  `data_consumo` DATE,\r\n  `observacoes` TEXT,\r\n  `data_criacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\r\n  FOREIGN KEY (instituicao_id) REFERENCES instituicoes(id) ON DELETE CASCADE,\r\n  FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,\r\n  FOREIGN KEY (item_estoque_id) REFERENCES estoque(id) ON DELETE SET NULL,\r\n  INDEX idx_data (data_consumo)\r\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    "columns": [
      {
        "name": "id",
        "definition": "INT AUTO_INCREMENT PRIMARY KEY",
        "description": "Identificador técnico da linha. Chave primária, não uma permissão de acesso."
      },
      {
        "name": "instituicao_id",
        "definition": "INT NOT NULL",
        "description": "Instituição proprietária do registro; base para os filtros de escopo."
      },
      {
        "name": "aluno_id",
        "definition": "INT NOT NULL",
        "description": "Aluno associado ao evento. A aplicação deve validar seu escopo institucional."
      },
      {
        "name": "item_estoque_id",
        "definition": "INT",
        "description": "Produto ligado ao consumo; SET NULL preserva o consumo se a referência for excluída."
      },
      {
        "name": "quantidade_consumida",
        "definition": "DECIMAL(10, 2)",
        "description": "Quantidade fracionada de consumo."
      },
      {
        "name": "data_consumo",
        "definition": "DATE",
        "description": "Dia do consumo."
      },
      {
        "name": "observacoes",
        "definition": "TEXT",
        "description": "Texto complementar."
      },
      {
        "name": "data_criacao",
        "definition": "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "description": "Momento de criação, preenchido automaticamente pelo banco."
      }
    ],
    "links": [
      {
        "column": "instituicao_id",
        "target": "instituicoes",
        "key": "id",
        "onDelete": "CASCADE",
        "logical": false
      },
      {
        "column": "aluno_id",
        "target": "alunos",
        "key": "id",
        "onDelete": "CASCADE",
        "logical": false
      },
      {
        "column": "item_estoque_id",
        "target": "estoque",
        "key": "id",
        "onDelete": "SET NULL",
        "logical": false
      }
    ],
    "rules": [
      "INDEX idx_data (data_consumo)"
    ]
  },
  {
    "name": "estoque",
    "description": "Produtos, saldo e características. Não é um livro de movimentações: o saldo é atualizado na própria linha.",
    "source": "banco/tabelas/estoque.php",
    "ddl": "CREATE TABLE IF NOT EXISTS `estoque` (\n  `id` INT AUTO_INCREMENT PRIMARY KEY,\n  `instituicao_id` INT NOT NULL,\n  `item` VARCHAR(255) NOT NULL,\n  `quantidade` DECIMAL(10, 2),\n  `estoque_minimo` DECIMAL(10, 2) NOT NULL DEFAULT 0,\n  `unidade` VARCHAR(50),\n  `preco_unitario` DECIMAL(10, 2),\n  `data_entrada` DATE,\n  `validade` DATE,\n  `ativo` BOOLEAN DEFAULT TRUE,\n  `data_criacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  FOREIGN KEY (instituicao_id) REFERENCES instituicoes(id) ON DELETE CASCADE\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    "columns": [
      {
        "name": "id",
        "definition": "INT AUTO_INCREMENT PRIMARY KEY",
        "description": "Identificador técnico da linha. Chave primária, não uma permissão de acesso."
      },
      {
        "name": "instituicao_id",
        "definition": "INT NOT NULL",
        "description": "Instituição proprietária do registro; base para os filtros de escopo."
      },
      {
        "name": "item",
        "definition": "VARCHAR(255) NOT NULL",
        "description": "Nome do produto de estoque."
      },
      {
        "name": "quantidade",
        "definition": "DECIMAL(10, 2)",
        "description": "Quantidade: saldo no estoque, uso no item de cardápio ou número de refeições, conforme a tabela."
      },
      {
        "name": "estoque_minimo",
        "definition": "DECIMAL(10, 2) NOT NULL DEFAULT 0",
        "description": "Limite configurado para comparação e alerta de saldo baixo."
      },
      {
        "name": "unidade",
        "definition": "VARCHAR(50)",
        "description": "Unidade física, como kg, L ou unidade. Não soma unidades diferentes entre produtos."
      },
      {
        "name": "preco_unitario",
        "definition": "DECIMAL(10, 2)",
        "description": "Preço por unidade previsto no esquema; não prova uso em todos os formulários."
      },
      {
        "name": "data_entrada",
        "definition": "DATE",
        "description": "Data de entrada prevista no esquema."
      },
      {
        "name": "validade",
        "definition": "DATE",
        "description": "Data de validade prevista no esquema; a cobertura da interface deve ser verificada."
      },
      {
        "name": "ativo",
        "definition": "BOOLEAN DEFAULT TRUE",
        "description": "Estado ativo/inativo. Desativar preserva o registro."
      },
      {
        "name": "data_criacao",
        "definition": "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "description": "Momento de criação, preenchido automaticamente pelo banco."
      }
    ],
    "links": [
      {
        "column": "instituicao_id",
        "target": "instituicoes",
        "key": "id",
        "onDelete": "CASCADE",
        "logical": false
      }
    ],
    "rules": []
  },
  {
    "name": "historico",
    "description": "Eventos de auditoria com snapshots em JSON. A cobertura depende dos pontos do código que inserem registros.",
    "source": "banco/tabelas/historico.php",
    "ddl": "CREATE TABLE IF NOT EXISTS `historico` (\r\n  `id` INT AUTO_INCREMENT PRIMARY KEY,\r\n  `instituicao_id` INT NOT NULL,\r\n  `tabela` VARCHAR(100),\r\n  `acao` VARCHAR(50),\r\n  `usuario_id` INT,\r\n  `descricao` TEXT,\r\n  `dados_anteriores` JSON,\r\n  `dados_novos` JSON,\r\n  `data_acao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\r\n  FOREIGN KEY (instituicao_id) REFERENCES instituicoes(id) ON DELETE CASCADE,\r\n  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,\r\n  INDEX idx_data (data_acao)\r\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    "columns": [
      {
        "name": "id",
        "definition": "INT AUTO_INCREMENT PRIMARY KEY",
        "description": "Identificador técnico da linha. Chave primária, não uma permissão de acesso."
      },
      {
        "name": "instituicao_id",
        "definition": "INT NOT NULL",
        "description": "Instituição proprietária do registro; base para os filtros de escopo."
      },
      {
        "name": "tabela",
        "definition": "VARCHAR(100)",
        "description": "Nome da tabela alvo do evento de auditoria."
      },
      {
        "name": "acao",
        "definition": "VARCHAR(50)",
        "description": "Operação registrada, como INSERT ou UPDATE."
      },
      {
        "name": "usuario_id",
        "definition": "INT",
        "description": "Usuário atribuído à ação; opcional e frequentemente NULL nos fluxos."
      },
      {
        "name": "descricao",
        "definition": "TEXT",
        "description": "Descrição livre do registro ou evento."
      },
      {
        "name": "dados_anteriores",
        "definition": "JSON",
        "description": "Snapshot anterior em JSON."
      },
      {
        "name": "dados_novos",
        "definition": "JSON",
        "description": "Snapshot posterior em JSON."
      },
      {
        "name": "data_acao",
        "definition": "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "description": "Momento da auditoria."
      }
    ],
    "links": [
      {
        "column": "instituicao_id",
        "target": "instituicoes",
        "key": "id",
        "onDelete": "CASCADE",
        "logical": false
      },
      {
        "column": "usuario_id",
        "target": "usuarios",
        "key": "id",
        "onDelete": "SET NULL",
        "logical": false
      }
    ],
    "rules": [
      "INDEX idx_data (data_acao)"
    ]
  },
  {
    "name": "horarios",
    "description": "Momentos de atendimento com nome e hora HH:MM, usados no registro da refeição.",
    "source": "banco/tabelas/horarios.php",
    "ddl": "CREATE TABLE IF NOT EXISTS `horarios` (\r\n  `id` INT AUTO_INCREMENT PRIMARY KEY,\r\n  `instituicao_id` INT NOT NULL,\r\n  `nome` VARCHAR(100) NOT NULL,\r\n  `horario` VARCHAR(5) NOT NULL,\r\n  `descricao` TEXT,\r\n  `ativo` BOOLEAN DEFAULT TRUE,\r\n  `data_criacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\r\n  UNIQUE KEY unique_horario (instituicao_id, nome),\r\n  FOREIGN KEY (instituicao_id) REFERENCES instituicoes(id) ON DELETE CASCADE\r\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    "columns": [
      {
        "name": "id",
        "definition": "INT AUTO_INCREMENT PRIMARY KEY",
        "description": "Identificador técnico da linha. Chave primária, não uma permissão de acesso."
      },
      {
        "name": "instituicao_id",
        "definition": "INT NOT NULL",
        "description": "Instituição proprietária do registro; base para os filtros de escopo."
      },
      {
        "name": "nome",
        "definition": "VARCHAR(100) NOT NULL",
        "description": "Nome exibido na interface."
      },
      {
        "name": "horario",
        "definition": "VARCHAR(5) NOT NULL",
        "description": "Texto de hora HH:MM; não é TIME no esquema atual."
      },
      {
        "name": "descricao",
        "definition": "TEXT",
        "description": "Descrição livre do registro ou evento."
      },
      {
        "name": "ativo",
        "definition": "BOOLEAN DEFAULT TRUE",
        "description": "Estado ativo/inativo. Desativar preserva o registro."
      },
      {
        "name": "data_criacao",
        "definition": "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "description": "Momento de criação, preenchido automaticamente pelo banco."
      }
    ],
    "links": [
      {
        "column": "instituicao_id",
        "target": "instituicoes",
        "key": "id",
        "onDelete": "CASCADE",
        "logical": false
      }
    ],
    "rules": [
      "UNIQUE KEY unique_horario (instituicao_id, nome),"
    ]
  },
  {
    "name": "refeicoes",
    "description": "Registro de atendimento a um aluno. É a tabela escrita pelo scanner PHP e lida nos relatórios.",
    "source": "banco/tabelas/refeicoes.php",
    "ddl": "CREATE TABLE IF NOT EXISTS `refeicoes` (\r\n  `id` INT AUTO_INCREMENT PRIMARY KEY,\r\n  `instituicao_id` INT NOT NULL,\r\n  `aluno_id` INT NOT NULL,\r\n  `tipo` VARCHAR(100),\r\n  `data_refeicao` DATE,\r\n  `horario` VARCHAR(5),\r\n  `quantidade` INT DEFAULT 1,\r\n  `data_criacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\r\n  FOREIGN KEY (instituicao_id) REFERENCES instituicoes(id) ON DELETE CASCADE,\r\n  FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,\r\n  INDEX idx_data (data_refeicao),\r\n  INDEX idx_tipo (tipo)\r\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    "columns": [
      {
        "name": "id",
        "definition": "INT AUTO_INCREMENT PRIMARY KEY",
        "description": "Identificador técnico da linha. Chave primária, não uma permissão de acesso."
      },
      {
        "name": "instituicao_id",
        "definition": "INT NOT NULL",
        "description": "Instituição proprietária do registro; base para os filtros de escopo."
      },
      {
        "name": "aluno_id",
        "definition": "INT NOT NULL",
        "description": "Aluno associado ao evento. A aplicação deve validar seu escopo institucional."
      },
      {
        "name": "tipo",
        "definition": "VARCHAR(100)",
        "description": "Tipo textual da refeição."
      },
      {
        "name": "data_refeicao",
        "definition": "DATE",
        "description": "Dia do registro de refeição."
      },
      {
        "name": "horario",
        "definition": "VARCHAR(5)",
        "description": "Texto de hora HH:MM; não é TIME no esquema atual."
      },
      {
        "name": "quantidade",
        "definition": "INT DEFAULT 1",
        "description": "Quantidade: saldo no estoque, uso no item de cardápio ou número de refeições, conforme a tabela."
      },
      {
        "name": "data_criacao",
        "definition": "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "description": "Momento de criação, preenchido automaticamente pelo banco."
      },
      {
        "name": "horario_id",
        "definition": "INT NULL",
        "description": "Relação lógica com horario; adicionada sem FK pela migração.",
        "migration": true
      },
      {
        "name": "turno_id",
        "definition": "INT NULL",
        "description": "Referência ao turno. Em refeicoes, o script de migração não declara FK.",
        "migration": true
      }
    ],
    "links": [
      {
        "column": "instituicao_id",
        "target": "instituicoes",
        "key": "id",
        "onDelete": "CASCADE",
        "logical": false
      },
      {
        "column": "aluno_id",
        "target": "alunos",
        "key": "id",
        "onDelete": "CASCADE",
        "logical": false
      },
      {
        "column": "horario_id",
        "target": "horarios",
        "key": "id",
        "onDelete": "Sem ação de FK declarada",
        "logical": true
      },
      {
        "column": "turno_id",
        "target": "turnos",
        "key": "id",
        "onDelete": "Sem ação de FK declarada",
        "logical": true
      }
    ],
    "rules": [
      "INDEX idx_data (data_refeicao),",
      "INDEX idx_tipo (tipo)"
    ]
  },
  {
    "name": "turnos",
    "description": "Períodos como manhã ou tarde, configuráveis por instituição.",
    "source": "banco/tabelas/turnos.php",
    "ddl": "CREATE TABLE IF NOT EXISTS `turnos` (\r\n  `id` INT AUTO_INCREMENT PRIMARY KEY,\r\n  `instituicao_id` INT NOT NULL,\r\n  `nome` VARCHAR(100) NOT NULL,\r\n  `descricao` TEXT,\r\n  `ativo` BOOLEAN DEFAULT TRUE,\r\n  `data_criacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\r\n  UNIQUE KEY unique_turno (instituicao_id, nome),\r\n  FOREIGN KEY (instituicao_id) REFERENCES instituicoes(id) ON DELETE CASCADE\r\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    "columns": [
      {
        "name": "id",
        "definition": "INT AUTO_INCREMENT PRIMARY KEY",
        "description": "Identificador técnico da linha. Chave primária, não uma permissão de acesso."
      },
      {
        "name": "instituicao_id",
        "definition": "INT NOT NULL",
        "description": "Instituição proprietária do registro; base para os filtros de escopo."
      },
      {
        "name": "nome",
        "definition": "VARCHAR(100) NOT NULL",
        "description": "Nome exibido na interface."
      },
      {
        "name": "descricao",
        "definition": "TEXT",
        "description": "Descrição livre do registro ou evento."
      },
      {
        "name": "ativo",
        "definition": "BOOLEAN DEFAULT TRUE",
        "description": "Estado ativo/inativo. Desativar preserva o registro."
      },
      {
        "name": "data_criacao",
        "definition": "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "description": "Momento de criação, preenchido automaticamente pelo banco."
      }
    ],
    "links": [
      {
        "column": "instituicao_id",
        "target": "instituicoes",
        "key": "id",
        "onDelete": "CASCADE",
        "logical": false
      }
    ],
    "rules": [
      "UNIQUE KEY unique_turno (instituicao_id, nome),"
    ]
  },
  {
    "name": "usuarios",
    "description": "Usuários vinculados à instituição e referência opcional do histórico. Não confundir com o login institucional.",
    "source": "banco/tabelas/usuarios.php",
    "ddl": "CREATE TABLE IF NOT EXISTS `usuarios` (\r\n  `id` INT AUTO_INCREMENT PRIMARY KEY,\r\n  `instituicao_id` INT NOT NULL,\r\n  `nome` VARCHAR(255) NOT NULL,\r\n  `email` VARCHAR(255) NOT NULL,\r\n  `senha` VARCHAR(255) NOT NULL,\r\n  `ativo` BOOLEAN DEFAULT TRUE,\r\n  `data_criacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\r\n  UNIQUE KEY unique_email_por_instituicao (instituicao_id, email),\r\n  FOREIGN KEY (instituicao_id) REFERENCES instituicoes(id) ON DELETE CASCADE\r\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    "columns": [
      {
        "name": "id",
        "definition": "INT AUTO_INCREMENT PRIMARY KEY",
        "description": "Identificador técnico da linha. Chave primária, não uma permissão de acesso."
      },
      {
        "name": "instituicao_id",
        "definition": "INT NOT NULL",
        "description": "Instituição proprietária do registro; base para os filtros de escopo."
      },
      {
        "name": "nome",
        "definition": "VARCHAR(255) NOT NULL",
        "description": "Nome exibido na interface."
      },
      {
        "name": "email",
        "definition": "VARCHAR(255) NOT NULL",
        "description": "Endereço usado para identificação ou contato conforme a entidade."
      },
      {
        "name": "senha",
        "definition": "VARCHAR(255) NOT NULL",
        "description": "Hash da senha, nunca a senha original para exibição."
      },
      {
        "name": "ativo",
        "definition": "BOOLEAN DEFAULT TRUE",
        "description": "Estado ativo/inativo. Desativar preserva o registro."
      },
      {
        "name": "data_criacao",
        "definition": "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "description": "Momento de criação, preenchido automaticamente pelo banco."
      }
    ],
    "links": [
      {
        "column": "instituicao_id",
        "target": "instituicoes",
        "key": "id",
        "onDelete": "CASCADE",
        "logical": false
      }
    ],
    "rules": [
      "UNIQUE KEY unique_email_por_instituicao (instituicao_id, email),"
    ]
  }
];
