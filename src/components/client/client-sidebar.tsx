'use client';

import React from 'react';
import Link from 'next/link';

export default function ClientSidebar() {
  return (
    <aside style={{ padding: 16, borderRight: '1px solid #e5e7eb' }}>
      <nav style={{ display: 'grid', gap: 8 }}>
        <Link href="/dashboard">Início</Link>
        <Link href="/dashboard/produtos">Produtos</Link>
        <Link href="/dashboard/pedidos">Pedidos</Link>
        <Link href="/dashboard/clientes">Clientes</Link>
        <Link href="/dashboard/configuracoes">Configurações</Link>
      </nav>
    </aside>
  );
}
