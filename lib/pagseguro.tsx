const API_BASE = process.env.PAGSEGURO_SANDBOX === "true"
  ? "https://sandbox.api.pagseguro.com"
  : "https://api.pagseguro.com";

const TOKEN = process.env.PAGSEGURO_TOKEN || "";

export type CheckoutItem = {
  name: string;
  quantity: number;
  unit_amount: number; // centavos
};

export async function createCheckoutLink(params: {
  reference_id?: string;
  items: CheckoutItem[];
  customer?: { name?: string; email?: string };
  return_url?: string;
}) {
  // Placeholder: em produção, chamar a API oficial de Links de Pagamento
  // (POST /checkouts ou /orders dependendo do fluxo escolhido).
  if (!TOKEN) throw new Error("PAGSEGURO_TOKEN não configurado.");
  const total = params.items.reduce((s, i) => s + i.unit_amount * i.quantity, 0) / 100;
  // Retorna um link fictício só para o build funcionar
  return {
    id: params.reference_id ?? `ps_${Date.now()}`,
    url: `${API_BASE}/checkout/placeholder?total=${total}`,
    total
  };
}

export default { createCheckoutLink };
