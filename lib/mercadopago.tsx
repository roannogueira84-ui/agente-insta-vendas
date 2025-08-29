// Placeholder para evitar erro de import.
// Se quiser usar Mercado Pago depois, troque por chamada real à API de preferências.
export async function createPreference(params: {
  title: string;
  quantity: number;
  unit_price: number;
  back_urls?: { success?: string; failure?: string };
}) {
  const id = `mp_${Date.now()}`;
  const url = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${id}`;
  return { id, init_point: url };
}

export default { createPreference };
