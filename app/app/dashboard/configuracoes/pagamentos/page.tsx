
'use client'
import { useEffect, useState } from 'react';

type Config = {
  id: string;
  provider: 'PAGSEGURO'|'MERCADOPAGO';
  email?: string;
  token?: string;
  publicKey?: string;
  sandboxMode?: boolean;
  isActive?: boolean;
}

export default function ConfigPagamentosPage() {
  const [configs, setConfigs] = useState<Config[]>([]);
  const [form, setForm] = useState<Partial<Config>>({ provider: 'PAGSEGURO', sandboxMode: true, isActive: true });

  async function load() {
    const res = await fetch('/api/payments/config', { cache: 'no-store' });
    const data = await res.json();
    setConfigs(data.configs || []);
  }

  useEffect(() => { load(); }, []);

  async function save(e: any) {
    e.preventDefault();
    const res = await fetch('/api/payments/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) { setForm({ provider: 'PAGSEGURO', sandboxMode: true, isActive: true }); load(); }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Configurações de Pagamento</h1>
      <form onSubmit={save} className="space-y-3 max-w-xl">
        <label className="block">
          <span className="text-sm">Provedor</span>
          <select value={form.provider as any} onChange={e => setForm({ ...form, provider: e.target.value as any })} className="border p-2 w-full rounded">
            <option value="PAGSEGURO">PagSeguro</option>
            <option value="MERCADOPAGO">Mercado Pago</option>
          </select>
        </label>
        <label className="block">
          <span className="text-sm">Email (opcional)</span>
          <input className="border p-2 w-full rounded" value={form.email||''} onChange={e => setForm({ ...form, email: e.target.value })} />
        </label>
        <label className="block">
          <span className="text-sm">Token / Access Token</span>
          <input className="border p-2 w-full rounded" value={form.token||''} onChange={e => setForm({ ...form, token: e.target.value })} required />
        </label>
        <label className="block">
          <span className="text-sm">Public Key (se aplicável)</span>
          <input className="border p-2 w-full rounded" value={form.publicKey||''} onChange={e => setForm({ ...form, publicKey: e.target.value })} />
        </label>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={!!form.sandboxMode} onChange={e => setForm({ ...form, sandboxMode: e.target.checked })} />
            Sandbox
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={!!form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} />
            Ativo
          </label>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded">Salvar</button>
      </form>

      <div>
        <h2 className="text-lg font-medium mt-6 mb-2">Configurações salvas</h2>
        <div className="grid gap-3">
          {configs.map(c => (
            <div key={c.id} className="border p-3 rounded">
              <div><b>Provedor:</b> {c.provider}</div>
              <div><b>Email:</b> {c.email||'-'}</div>
              <div><b>Sandbox:</b> {String(c.sandboxMode)}</div>
              <div><b>Ativo:</b> {String(c.isActive)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
