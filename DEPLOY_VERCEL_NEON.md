# Deploy Real: Vercel + Neon

Esta e a melhor rota para este MVP hoje: `Next.js` na Vercel e `Postgres` no Neon.

## Por que esta opcao

- Configuracao mais enxuta que Supabase para um MVP que hoje so precisa de banco
- Bom encaixe com `Prisma`
- Pooling no runtime e conexao direta para migrations
- Fluxo natural com `Vercel` para `Next.js`

## 1. Criar o banco no Neon

No painel do Neon:

1. Crie um projeto novo
2. Copie duas strings:
   - pooled connection string
   - direct connection string

Use assim:

```env
DATABASE_URL="postgresql://USER:PASSWORD@ep-xxx-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
DIRECT_URL="postgresql://USER:PASSWORD@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
JWT_SECRET="gere-uma-chave-forte"
```

## 2. Subir o codigo para um git remoto

Pode ser GitHub, GitLab ou Bitbucket.

## 3. Importar o projeto na Vercel

No painel da Vercel:

1. Clique em `Add New Project`
2. Escolha o repositório
3. Em `Root Directory`, selecione `marketplace-mvp` se o repositório tiver mais de uma pasta
4. Salve as variaveis:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `JWT_SECRET`

## 4. Aplicar as migrations

Depois que o projeto estiver conectado:

```bash
npm run prisma:migrate:deploy
```

Se quiser popular com dados demo:

```bash
npm run prisma:seed
```

## 5. Scripts uteis no projeto

```bash
npm run vercel:pull
npm run vercel:deploy
npm run vercel:deploy:prod
```

## 6. Validacoes

- Health check: `/api/health`
- Build command: `npm run vercel-build`
- Migrations versionadas em `prisma/migrations`

## Observacao importante

Em producao:

- use `DATABASE_URL` poolada no app
- use `DIRECT_URL` direta para `Prisma CLI`
- prefira `prisma migrate deploy` em vez de `prisma db push`
