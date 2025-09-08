'use client';

import React from 'react';
import Link from 'next/link';

type Props = {
  id: string;
  onDelete?: (id: string) => Promise<void> | void; // opcional
};

export default function ProductActions({ id, onDelete }: Props) {
  async function handleDelete() {
    try {
      if (!confirm('Tem certeza que deseja excluir este produto?')) return;
      if (onDelete) {
        await onDelete(id);
      } else {
        // Placeholder de exclusão: adapte para sua API se quiser deletar de fato
        console.log('Excluir produto (placeholder):', id);
        alert('Exclusão simulada. Implemente a chamada de API real se necessário.');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao excluir (placeholder).');
    }
  }

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Link
        href={`/dashboard/produtos/${id}`}
        style={{
          padding: '6px 10px',
          border: '1px solid #e5e7eb',
          borderRadius: 6,
          textDecoration: 'none',
        }}
      >
        Ver
      </Link>

      <Link
        href={`/dashboard/produtos/${id}/editar`}
        style={{
          padding: '6px 10px',
          border: '1px solid #e5e7eb',
          borderRadius: 6,
          textDecoration: 'none',
        }}
      >
        Editar
      </Link>

      <button
        onClick={handleDelete}
        style={{
          padding: '6px 10px',
          border: '1px solid #ef4444',
          background: '#ef4444',
          color: 'white',
          borderRadius: 6,
        }}
      >
        Excluir
      </button>
    </div>
  );
}
