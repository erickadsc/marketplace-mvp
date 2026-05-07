# Marketplace Reverso Imobiliario MVP

MVP simples para validar a ideia do `pitch_imobiliario.pptx`: o cliente publica um perfil de busca para locacao e os corretores respondem com opcoes realmente disponiveis.

## O que este MVP cobre

- Cadastro e login para `cliente` e `corretor`
- Cliente cria perfis de busca para locacao
- Corretor visualiza leads e envia propostas
- Propostas com status `ACTIVE`, `EXPIRED` e `INVALID`
- Expiracao automatica de propostas apos 72 horas
- Score do corretor com bloqueio abaixo de `3.0`
- Avaliacao do corretor pelo cliente

## Regras implementadas

- Score inicial do corretor: `5.0`
- Proposta invalida: `-1.0`
- Avaliacao positiva (`nota >= 4`): `+0.1`
- Propostas novas so podem ser enviadas se o score do corretor for `>= 3.0`
- Expiracao acontece automaticamente sempre que dashboards e rotas de propostas sao acessados

## Stack

- `Next.js` com App Router
- `Node.js` nas API Routes
- `PostgreSQL`
- `Prisma`
- `Docker` opcional para ambiente local

## Desenvolvimento local

1. Instale as dependencias:

```bash
npm install
```

2. Copie `.env.example` para `.env` e ajuste:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/reverse_real_estate"
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/reverse_real_estate"
JWT_SECRET="sua-chave-segura"
```

3. Prepare o banco:

```bash
npm run db:setup
```

4. Rode o projeto:

```bash
npm run dev
```

## Usuarios demo

- Cliente: `cliente@demo.com` / `123456`
- Corretor: `corretor@demo.com` / `123456`

## Dashboard evoluido

- Filtros por texto e status
- Paginacao server-side simples por query string
- Acao de excluir perfil de busca
- Acoes rapidas de contato por email
- Painel visual mais comercial para cliente e corretor

## Deploy real em Vercel

### Variaveis obrigatorias

- `DATABASE_URL`
- `DIRECT_URL`
- `JWT_SECRET`

### Melhor opcao recomendada

- `Vercel + Neon`

Guia dedicado:

- [DEPLOY_VERCEL_NEON.md](/c:/Users/erick/OneDrive/Documentos/Projetos/meusiteproduto/marketplace-mvp/DEPLOY_VERCEL_NEON.md)

### Fluxo recomendado

1. Suba o repositorio para GitHub, GitLab ou Bitbucket
2. Importe o projeto na Vercel
3. Configure as variaveis de ambiente em `Production`, `Preview` e `Development` conforme necessario
4. Garanta que o schema seja aplicado com:

```bash
npm run prisma:migrate:deploy
```

5. Faça o seed apenas se quiser ambiente demo:

```bash
npm run prisma:seed
```

### Build command na Vercel

O projeto ja inclui:

- `vercel.json` com `npm run vercel-build`
- `postinstall` com `prisma generate`
- scripts `vercel:deploy`, `vercel:deploy:prod` e `vercel:pull`

### Observacao importante

Para producao, use `prisma migrate deploy` em vez de `prisma db push`.

## Neon ou Supabase

### Neon

Use:

- `DATABASE_URL`: string poolada para runtime
- `DIRECT_URL`: string direta para migrations e Prisma CLI

### Supabase

Use:

- `DATABASE_URL`: string poolada do Supavisor, normalmente na porta `6543`
- `DIRECT_URL`: string direta do banco, normalmente `db.PROJECT_REF.supabase.co:5432`

## Saude e deploy

- Health check em `GET /api/health`
- `next.config.mjs` com `output: "standalone"`
- Migration inicial versionada em `prisma/migrations`
- `Dockerfile` para imagem Node pronta para producao
- `docker-compose.yml` com app + PostgreSQL

## Estrutura

- `app/`: telas e API Routes
- `components/`: formularios e acoes do frontend
- `lib/`: autenticacao, dominio e utilitarios
- `prisma/schema.prisma`: modelagem do banco
- `prisma/migrations/`: migrations prontas para producao

## Observacoes

- Acrescentei `proposalId` em `avaliacoes` para evitar avaliacao duplicada por proposta
- Acrescentei `expiresAt` e `availabilityConfirmed` em `propostas` para sustentar as regras do pitch
- Mantive o novo MVP isolado em `marketplace-mvp/` para nao sobrescrever o sistema antigo da pasta raiz
