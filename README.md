# 📊 Kanban Interativo - Painel Administrativo

Um aplicativo web de Kanban completo e funcional para gerenciar tarefas com salvamento automático em JSON, gráficos e relatórios detalhados.

## 🎯 Características

- ✅ **Drag & Drop** — Arraste cards entre colunas
- ✅ **4 Status** — Em Análise, Processo, Desenvolvendo, Concluído
- ✅ **Organização Automática** — Cards ordenados por data (prazo)
- ✅ **Scroll nas Colunas** — Ativa automaticamente quando > 4 cards
- ✅ **Campos Completos** — Título, especificações, prazo, prioridade, responsável, categoria e cor
- ✅ **Salvar em JSON** — Persistência automática em `dados-salvos/kanban.json`
- ✅ **Importação Automática** — Carrega dados ao abrir a página
- ✅ **Relatórios Detalhados** — Gráficos, estatísticas e tabelas
- ✅ **Exportar PDF** — Baixe relatórios em PDF
- ✅ **Interface Responsiva** — Design limpo com Tailwind CSS
- ✅ **Ícones Lucide** — Ícones visuais modernos

## 📁 Estrutura do Projeto

```
PROJETO ORGANIZAÇÃO/
├── KANBAN.html              # Arquivo principal (Frontend)
├── server.js                # Servidor Node.js (Backend)
├── package.json             # Dependências do projeto
├── dados-salvos/
│   └── kanban.json         # Base de dados com as tarefas
└── README.md               # Este arquivo
```

## 🚀 Como Iniciar

### Pré-requisitos
- **Node.js** instalado (versão 12+)
- **npm** (vem com Node.js)

### Instalação

1. **Navegue até a pasta do projeto:**
   ```powershell
   cd 'C:\Users\Windows\Desktop\PROJETO ORGANIZAÇÃO'
   ```

2. **Instale as dependências:**
   ```powershell
   npm install
   ```

3. **Inicie o servidor:**
   ```powershell
   node server.js
   ```

4. **Abra no navegador:**
   - Se o servidor servir o HTML: `http://localhost:3663`
   - Se abrir manualmente: abra `KANBAN.html` no navegador

## 📱 Como Usar

### Criar uma Tarefa
1. Clique no botão **➕** no canto superior direito de qualquer coluna
2. Preencha os detalhes:
   - **Título da Tarefa** — obrigatório
   - **Especificações** — descrição detalhada
   - **Prazo** — data de vencimento
   - **Nível de Necessidade** — Baixa, Média, Alta, Crítica
   - **Responsável** — nome do programador
   - **Categoria** — Backend, Frontend, Bug, etc
   - **Cor do Card** — escolha entre 6 cores
3. Clique em **Salvar**

### Editar uma Tarefa
- Clique **2x (duplo clique)** em um card para editá-lo
- Atualize os campos desejados
- Clique em **Salvar**

### Mover uma Tarefa
- Clique e segure em um card
- Arraste para outra coluna
- Solte para confirmar
- Os cards são automaticamente reordenados por data

### Duplicar uma Tarefa
1. Clique 2x em um card para abrir o modal
2. Clique em **Duplicar**
3. O card será copiado na mesma coluna

### Excluir uma Tarefa
1. Clique 2x em um card
2. Clique em **Excluir**
3. Confirme a exclusão

### Salvar Alterações
- Clique em **"Salvar Alterações"** (botão azul) no header
- Os dados são salvos em `dados-salvos/kanban.json`
- Se o servidor estiver offline, salva em localStorage como fallback

### Gerar Relatório
1. Clique em **"Gerar Relatório"** (botão verde) no header
2. Visualize:
   - Estatísticas gerais (total, conclusão %, em progresso, atrasadas)
   - Gráficos de distribuição por status e prioridade
   - Tabela completa com todos os detalhes
3. Clique em **"Baixar PDF"** para exportar o relatório

## 📊 Campos das Tarefas

| Campo | Tipo | Descrição |
|-------|------|-----------|
| Título | Texto | Nome da tarefa (obrigatório) |
| Especificações | Texto longo | Detalhes e requisitos |
| Prazo | Data | DD/MM/YYYY — marcado em vermelho se atrasado |
| Nível de Necessidade | Seleção | Baixa, Média, Alta, Crítica |
| Responsável | Texto | Nome do programador atribuído |
| Categoria | Texto | Backend, Frontend, Bug, Infrastructure, etc |
| Cor do Card | Cor | 6 opções disponíveis |

## 🎨 Colunas do Kanban

| Coluna | Cor | Status |
|--------|-----|--------|
| 1. Em análise | Cinza | Tarefas em revisão |
| 2. Processo | Azul | Tarefas iniciadas |
| 3. Desenvolvendo | Amarelo | Tarefas em desenvolvimento |
| 4. Concluído | Verde | Tarefas finalizadas |

## 📋 Relatório

O relatório contém:

### 📈 Estatísticas
- Total de tarefas
- Porcentagem de conclusão
- Tarefas em progresso
- Tarefas atrasadas

### 📊 Gráficos
- **Distribuição por Status** — quantos cards em cada coluna
- **Distribuição por Prioridade** — quantas tarefas por nível

### 📋 Tabela Detalhada
- Título da tarefa
- Status atual
- Nível de prioridade (com cor)
- Prazo (destaca em vermelho se atrasado)
- Responsável
- Categoria

## 💾 Persistência de Dados

### Arquivo de Dados
- **Localização:** `dados-salvos/kanban.json`
- **Formato:** JSON array
- **Atualização:** automática ao clicar em "Salvar Alterações"

### Exemplo de Estrutura
```json
[
  {
    "id": "card-1735164823456",
    "title": "[Fase 1] Autenticação",
    "specs": "Implementar login com JWT",
    "prazo": "2025-12-20",
    "necessidade": "Crítica",
    "categoria": "Backend",
    "responsavel": "João Silva",
    "colorClass": "bg-white",
    "column": "2",
    "order": 0
  }
]
```

## 🔧 Configuração do Servidor

### Arquivo: `server.js`

```javascript
const PORT = 3663; // Porta do servidor
```

**Endpoints:**
- `GET /state` — Retorna o estado atual do kanban
- `POST /state` — Salva o estado do kanban
- `GET /cards` — Lista todos os cards
- `POST /cards` — Cria um novo card
- `PUT /cards/:id` — Edita um card
- `DELETE /cards/:id` — Deleta um card
- `POST /save-board` — Salva snapshot com timestamp

## 🌐 Portas

Por padrão, o servidor roda na **porta 3663**. Se precisar alterar:

1. Abra `server.js`
2. Localize: `const PORT = 3663;`
3. Altere para a porta desejada
4. Abra `KANBAN.html`
5. Localize: `const API_BASE = 'http://localhost:3663';`
6. Atualize a porta

## 📦 Dependências

```json
{
  "express": "^4.x.x",
  "cors": "^2.x.x"
}
```

## 🛠️ Bibliotecas Frontend

- **Tailwind CSS** — Framework CSS (CDN)
- **Lucide Icons** — Ícones modernos (CDN)
- **html2pdf** — Exportação de PDF (CDN)

## 🎯 Exemplos de Uso

### Criar um Card de Backend
1. Clique em **➕** na coluna "Em análise"
2. Preencha:
   - Título: "[Fase 1] API REST"
   - Especificações: "Criar endpoints para usuários"
   - Prazo: "2025-12-15"
   - Prioridade: "Alta"
   - Responsável: "Maria Santos"
   - Categoria: "Backend"
3. Clique em **Salvar**
4. Clique em **"Salvar Alterações"** no header

### Acompanhar Progresso
1. Clique em **"Gerar Relatório"**
2. Veja a porcentagem de conclusão
3. Verifique tarefas atrasadas
4. Analise a distribuição por prioridade

### Exportar Relatório
1. Abra o relatório
2. Clique em **"Baixar PDF"**
3. Arquivo será salvo como `Relatorio-Kanban-YYYY-MM-DD.pdf`

## 🐛 Troubleshooting

### O servidor não inicia
```
Erro: Port 3663 already in use
```
**Solução:** Altere a porta em `server.js` para outra disponível (ex: 3664)

### Dados não salvam
- Verifique se o servidor está rodando (`node server.js`)
- Verifique se a pasta `dados-salvos/` existe
- Verifique o console do navegador (F12) para erros

### Relatório em PDF vazio
- Verifique se há cards criados
- Recarregue a página (F5)
- Clique em "Gerar Relatório" novamente

## 📝 Notas

- Os cards são automaticamente ordenados por data (prazo mais próximo primeiro)
- Cards sem prazo aparecem no final da coluna
- Prazo é validado automaticamente — tarefas vencidas aparecem em vermelho no relatório
- O scroll da coluna aparece automaticamente após 4 cards
- Alterações não salvas mostram o botão "Salvar Alterações" pulsando em vermelho

## 📞 Suporte

Para dúvidas ou sugestões sobre o projeto, verifique:
1. Este README
2. Console do navegador (F12) para erros
3. Arquivos do projeto na pasta `dados-salvos/kanban.json`

## 📄 Licença

Projeto de código aberto — uso livre.

---

**Última atualização:** 19 de novembro de 2025

**Desenvolvido com ❤️ para gerenciar tarefas de forma eficiente**
