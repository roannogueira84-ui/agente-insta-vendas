'use client';

import React from 'react';
import Link from 'next/link';

export default function OnboardingChecklist() {
  return (
    <section style={{ padding: 16, border: '1px solid #e5e7eb', borderRadius: 8 }}>
      <h2 style={{ marginBottom: 8, fontWeight: 600 }}>Checklist de Onboarding</h2>
      <ul style={{ paddingLeft: 18, display: 'grid', gap: 6, listStyle: 'disc' }}>
        <li>Conecte o Google (Login)</li>
        <li>Crie seu primeiro produto</li>
        <li>Revise as configurações da loja</li>
      </ul>
      <div style={{ marginTop: 12 }}>
        <Link href="/dashboard/produtos/novo">+ Criar produto</Link>
      </div>
    </section>
  );
}
