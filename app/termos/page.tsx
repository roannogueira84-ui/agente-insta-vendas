
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-4xl py-12 px-6">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao início
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">Termos de Uso</h1>
          <p className="text-gray-600 mt-2">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Aceitação dos Termos</h2>
            <p className="text-gray-700 leading-relaxed">
              Ao acessar e usar o Agente Insta Vendas 24/7, você aceita e concorda em ficar vinculado aos termos 
              e condições descritos neste documento. Se você não concorda com qualquer parte destes termos, 
              você não deve usar nosso serviço.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Descrição do Serviço</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              O Agente Insta Vendas 24/7 é uma plataforma que permite aos usuários:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Cadastrar e gerenciar produtos para venda</li>
              <li>Configurar credenciais de pagamento (PagSeguro, Mercado Pago)</li>
              <li>Gerar links de pagamento automatizados</li>
              <li>Monitorar vendas e métricas de desempenho</li>
              <li>Automatizar o processo de vendas no Instagram</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Responsabilidades do Usuário</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Como usuário da plataforma, você concorda em:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Fornecer informações precisas e atualizadas durante o cadastro</li>
              <li>Manter a confidencialidade de suas credenciais de acesso</li>
              <li>Usar o serviço apenas para fins legais e legítimos</li>
              <li>Não violar direitos autorais ou de propriedade intelectual</li>
              <li>Cumprir com as políticas do Instagram e dos provedores de pagamento</li>
              <li>Ser responsável por todos os produtos vendidos através da plataforma</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Pagamentos e Reembolsos</h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>
                <strong>Pagamento:</strong> O acesso ao Agente Insta Vendas 24/7 custa R$ 47,00 (quarenta e sete reais) 
                como pagamento único para acesso vitalício.
              </p>
              <p>
                <strong>Garantia:</strong> Oferecemos 7 (sete) dias de garantia incondicional. Se você não ficar 
                satisfeito com o serviço, solicitará o reembolso integral dentro deste prazo.
              </p>
              <p>
                <strong>Reembolso:</strong> Para solicitar reembolso, entre em contato através dos canais oficiais 
                de suporte dentro do prazo de garantia.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Propriedade Intelectual</h2>
            <p className="text-gray-700 leading-relaxed">
              Todo o conteúdo, design, código, marca e funcionalidades do Agente Insta Vendas 24/7 são de 
              propriedade exclusiva da empresa. Você recebe apenas uma licença limitada e não transferível 
              para usar a plataforma conforme estes termos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitação de Responsabilidade</h2>
            <p className="text-gray-700 leading-relaxed">
              O Agente Insta Vendas 24/7 não se responsabiliza por perdas diretas ou indiretas decorrentes 
              do uso da plataforma, incluindo mas não limitado a: perdas financeiras, problemas técnicos 
              de terceiros (Instagram, PagSeguro, Mercado Pago), ou interrupções de serviço.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Modificações dos Termos</h2>
            <p className="text-gray-700 leading-relaxed">
              Reservamos o direito de modificar estes termos a qualquer momento. As alterações entrarão 
              em vigor imediatamente após a publicação na plataforma. É sua responsabilidade revisar 
              periodicamente estes termos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Rescisão</h2>
            <p className="text-gray-700 leading-relaxed">
              Podemos suspender ou encerrar sua conta a qualquer momento, com ou sem aviso prévio, 
              se você violar estes termos ou usar o serviço de maneira inadequada.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Lei Aplicável</h2>
            <p className="text-gray-700 leading-relaxed">
              Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida nos 
              tribunais competentes do Brasil.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contato</h2>
            <p className="text-gray-700 leading-relaxed">
              Para dúvidas sobre estes termos ou sobre o serviço, entre em contato através dos 
              canais oficiais de suporte disponíveis na plataforma.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
