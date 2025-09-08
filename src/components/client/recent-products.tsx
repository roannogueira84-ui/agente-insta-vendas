'use client';

import React from 'react';
import Link from 'next/link';

type Product = {
  id: string;
  name: string;
  price?: number;
};

export default function RecentProducts(props: { items?: Product[] }) {
  const items = props.items ?? [];

  if (items.length === 0) {
    return (
      <section style={{ padding: 16, border: '1px solid #e5e7eb', borderRadius: 8 }}>
        <h2 style={{ marginBottom: 8, fontWeight: 600 }}>Produtos recentes</h2>
        <p>Nenhum produto ainda.</p>
        <div style={{ marginTop: 12 }}>
          <Link href="/dashboard/produtos/novo">+ Criar produto</Link>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: 16, border: '1px solid #e5e7eb', borderRadius: 8 }}>
      <h2 style={{ marginBottom: 8, fontWeight: 600 }}>Produtos recentes</h2>
      <ul style={{ display: 'grid', gap: 8, paddingLeft: 0, listStyle: 'none' }}>
        {items.map((p) => (
          <li key={p.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link href={`/dashboard/produtos/${p.id}`}>{p.name}</Link>
            {p.price != null && <span>R$ {p.price.toFixed(2)}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}
