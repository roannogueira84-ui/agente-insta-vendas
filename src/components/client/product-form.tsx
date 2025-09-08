'use client';

import React, { useState } from 'react';

type AnyProps = Record<string, any>;

/**
 * Formulário genérico para evitar erro de import.
 * Se o seu código já espera props específicas (ex.: initialData),
 * mantemos tudo opcional para não quebrar o TypeScript.
 */
export default function ProductForm(props: AnyProps) {
  const [name, setName] = useState(props.initialData?.name ?? '');
  const [price, setPrice] = useState<number | ''>(props.initialData?.price ?? '');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      // Placeholder: adapte para sua API real
      console.log('Salvar produto', { name, price });
      alert('Produto salvo (placeholder). Ajuste a integração com sua API.');
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar (placeholder).');
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, maxWidth: 480 }}>
      <div style={{ display: 'grid', gap: 4 }}>
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          placeholder="Ex.: Curso Instagram"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ border: '1px solid #e5e7eb', borderRadius: 6, padding: 8 }}
        />
      </div>

      <div style={{ display: 'grid', gap: 4 }}>
        <label htmlFor="price">Preço</label>
        <input
          id="price"
          type="number"
          step="0.01"
          placeholder="Ex.: 97.90"
          value={price}
          onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
          style={{ border: '1px solid #e5e7eb', borderRadius: 6, padding: 8 }}
        />
      </div>

      <button
        type="submit"
        style={{
          height: 40,
          borderRadius: 6,
          border: '1px solid #111827',
          background: '#111827',
          color: 'white',
          fontWeight: 600,
        }}
      >
        Salvar
      </button>
    </form>
  );
}
