
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '../components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Agente Insta Vendas 24/7 - Automatize suas vendas no Instagram',
  description: 'Venda 24h no Instagram com respostas instantâneas no Direct. Configure uma vez e venda enquanto dorme.',
  keywords: 'Instagram vendas, automação vendas, marketing digital, vendas online',
  authors: [{ name: 'Agente Insta Vendas' }],
  openGraph: {
    title: 'Agente Insta Vendas 24/7',
    description: 'Venda 24h no Instagram com respostas instantâneas no Direct',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
