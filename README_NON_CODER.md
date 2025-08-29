
# Como publicar sem saber programação (passo a passo simples)

## O que você vai usar (tudo pelo navegador)
- **GitHub** (grátis) — para guardar os arquivos
- **Vercel** (grátis) — para publicar o site/app
- **Neon** (grátis) — banco de dados Postgres

## 1) Baixar este pacote
Você já tem o arquivo ZIP. Descompacte só para conferir, mas vamos enviar direto para o GitHub.

## 2) Criar um repositório no GitHub
- Acesse https://github.com → Sign up (se não tiver conta)
- Clique em **New repository**
- Nome: `agente-insta-vendas`
- Clique em **Create repository**
- Na página do repositório, clique em **uploading an existing file** e **arraste o ZIP** aqui. O GitHub extrai sozinho? Se não extrair, descompacte no seu computador e arraste **as pastas/arquivos**.
- Clique em **Commit changes** (para salvar).

## 3) Criar banco de dados no Neon
- Acesse https://neon.tech (crie conta)
- Clique em **New Project**
- Anote a **DATABASE_URL** (parece com: `postgresql://...neon.tech/...`)

## 4) Publicar na Vercel
- Acesse https://vercel.com (crie conta e **Conecte com GitHub**)
- Clique em **Add New Project → Import Git Repository**
- Escolha o repositório `agente-insta-vendas`
- Em **Environment Variables**, adicione:
  - `DATABASE_URL` = (cole a URL do Neon)
  - `NEXTAUTH_URL` = `https://SEU-PROJETO.vercel.app` (depois de publicar, volte e ajuste com a URL correta)
  - `NEXTAUTH_SECRET` = clique em **Generate** (qualquer valor seguro)
  - `PAGSEGURO_TOKEN` = seu token do PagSeguro (para vender o acesso R$47)
  - `PAGSEGURO_SANDBOX` = `true` (para testes) ou `false` (produção)
  - **Email (SMTP):**
    - `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM`, `EMAIL_FROM_NAME`
- Clique em **Deploy**

> Pronto! A Vercel vai construir o projeto. Eu já configurei para o banco ser sincronizado automaticamente (`prisma db push`), então você **não precisa rodar comandos**.

## 5) Configurar webhooks
No painel do **PagSeguro/Mercado Pago**, crie webhooks apontando para:
- `https://SEU-PROJETO.vercel.app/api/webhooks/pagseguro-sys`
- `https://SEU-PROJETO.vercel.app/api/webhooks/pagseguro`
- `https://SEU-PROJETO.vercel.app/api/webhooks/mercadopago`

## 6) Usar o sistema
- Landing page: `https://SEU-PROJETO.vercel.app`
- Botão “Comprar por R$47” já inicia o checkout (precisa do seu `PAGSEGURO_TOKEN`).
- **Admin:** faça login com seu e-mail (defina depois via NextAuth/email) e acesse `/admin/pedidos` e `/admin/clientes`.
- **Cliente:** depois da compra, recebe e-mail com senha temporária. Ele acessa `/dashboard`, cadastra **produtos** e configura **pagamentos** em `/dashboard/configuracoes/pagamentos`.

Qualquer dúvida, volte aqui e eu te guio.
