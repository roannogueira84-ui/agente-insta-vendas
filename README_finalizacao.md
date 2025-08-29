
# Finalização do Agente Insta Vendas 24/7

Este pacote contém as integrações finais: **PagSeguro / Mercado Pago / Pix (via gateways)**, **webhooks**, **checkout do app (R$47)**, **e-mails transacionais**, **configuração de pagamentos por cliente** e **Dashboard Admin**.

## 1) Dependências a instalar
```
npm i nodemailer
```

> Se quiser usar SDKs:
```
npm i mercadopago
```
(Não é obrigatório, usamos `fetch` nas rotas.)

## 2) Variáveis de Ambiente (`.env`)
Copie `.env.example` para `.env` e preencha:
- `DATABASE_URL` (Postgres)
- `NEXTAUTH_URL` (ex.: https://seuapp.com)
- `NEXTAUTH_SECRET`
- **Email**: `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM`, `EMAIL_FROM_NAME`
- **PagSeguro (Sistema)**: `PAGSEGURO_TOKEN`, `PAGSEGURO_SANDBOX=true|false`
- **Mercado Pago (opcional, sistema)**: `MERCADOPAGO_ACCESS_TOKEN`
- Domínios públicos (para webhooks): o provedor de pagamentos precisa alcançar `https://SEU_DOMINIO/api/webhooks/...`

## 3) Prisma
Atualizamos o schema para permitir **múltiplos provedores por usuário** e adicionamos `WebhookLog`.
- Rode: `npx prisma generate`
- Rode: `npx prisma migrate dev -n init_payments_webhooks`

## 4) Rotas criadas
- **Configuração por cliente**: `POST/GET /api/payments/config`
- **Criação de link de pagamento (produto)**: `POST /api/payments/create-link` body: `{ productId, provider: 'PAGSEGURO'|'MERCADOPAGO' }`
- **Webhook por cliente (produto)**:
  - `POST /api/webhooks/pagseguro`
  - `POST /api/webhooks/mercadopago`
- **Checkout do APP (R$47)**: `POST /api/checkout/app` body opcional `{ email, name }`
- **Webhook do APP**: `POST /api/webhooks/pagseguro-sys` (cria usuário e envia e-mail)

## 5) Páginas adicionadas
- **Dashboard do cliente** → `Configurações > Pagamentos`: `/dashboard/configuracoes/pagamentos`
- **Admin**:
  - `/admin/pedidos` (últimos pedidos)
  - `/admin/clientes` (cadastros)

## 6) Fluxo esperado
1. **Venda do app (R$47)** na landing → `/api/checkout/app` cria cobrança no PagSeguro **do sistema** → PagSeguro chama webhook `/api/webhooks/pagseguro-sys` → criamos usuário, marcamos `isActive`, enviamos e-mail com senha temporária.
2. **Venda de produtos do cliente** no Direct → cliente configura **PagSeguro/Mercado Pago** no painel → ao criar link de pagamento para um produto, usamos **as credenciais dele**, e os webhooks atualizam `orders` e `webhook_logs`.

## 7) Produção (Meta/Instagram)
- Garanta que o app Meta tenha permissões aprovadas (`instagram_manage_messages`, etc.).
- Ative **Allow access to messages** na conta IG do cliente.
- Respeite a **janela de 24h** para mensagens.

## 8) Observações
- As rotas de PagSeguro/Mercado Pago usam **REST via fetch**. Se preferir SDK oficial, substitua facilmente.
- Os webhooks salvam payload completo em `webhook_logs` para auditoria.
- Ajuste os textos e estilos conforme sua marca.

Boa venda! 🚀
