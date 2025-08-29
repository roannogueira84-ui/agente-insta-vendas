
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PrivacidadePage() {
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
          <h1 className="text-4xl font-bold text-gray-900">Política de Privacidade</h1>
          <p className="text-gray-600 mt-2">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Informações que Coletamos</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                No Agente Insta Vendas 24/7, coletamos apenas as informações necessárias para fornecer 
                nossos serviços de forma eficiente e segura.
              </p>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Informações de Cadastro:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Nome completo</li>
                  <li>Endereço de e-mail</li>
                  <li>Senha criptografada</li>
                  <li>Data de cadastro e último acesso</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Informações de Produtos:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Nome, descrição e preço dos produtos</li>
                  <li>Imagens dos produtos (quando fornecidas)</li>
                  <li>Informações de estoque</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Credenciais de Pagamento:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Tokens e chaves públicas do PagSeguro/Mercado Pago</li>
                  <li>E-mail associado às contas de pagamento</li>
                  <li>Configurações de sandbox/produção</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Como Usamos Suas Informações</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Utilizamos suas informações exclusivamente para:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Fornecer acesso aos recursos da plataforma</li>
              <li>Processar e gerenciar seus produtos cadastrados</li>
              <li>Gerar links de pagamento personalizados</li>
              <li>Enviar notificações importantes sobre sua conta</li>
              <li>Fornecer suporte técnico quando solicitado</li>
              <li>Melhorar nossos serviços com base no uso agregado</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Compartilhamento de Informações</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>Não vendemos ou alugamos</strong> suas informações pessoais para terceiros. 
                Compartilhamos dados apenas nos seguintes casos:
              </p>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Com Provedores de Pagamento:</h3>
                <p>
                  Suas credenciais de pagamento são transmitidas diretamente para PagSeguro ou Mercado Pago 
                  conforme necessário para processar transações. Não armazenamos informações sensíveis como 
                  números de cartão ou dados bancários.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Prestadores de Serviço:</h3>
                <p>
                  Podemos compartilhar informações com prestadores de serviços confiáveis que nos ajudam 
                  a operar a plataforma (hospedagem, e-mail, analytics), sempre sob acordos de confidencialidade.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Requisitos Legais:</h3>
                <p>
                  Podemos divulgar informações se exigido por lei ou para proteger nossos direitos, 
                  propriedade ou segurança.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Segurança dos Dados</h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>
                Implementamos medidas de segurança técnicas e administrativas para proteger suas informações:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Criptografia de senhas usando bcrypt</li>
                <li>Conexões HTTPS em toda a plataforma</li>
                <li>Tokens de autenticação seguros</li>
                <li>Acesso limitado aos dados por nossa equipe</li>
                <li>Monitoramento regular de segurança</li>
                <li>Backups regulares dos dados</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Seus Direitos</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Acesso:</strong> Solicitar informações sobre quais dados temos sobre você</li>
              <li><strong>Correção:</strong> Corrigir dados incorretos ou incompletos</li>
              <li><strong>Exclusão:</strong> Solicitar a remoção de seus dados pessoais</li>
              <li><strong>Portabilidade:</strong> Receber seus dados em formato legível</li>
              <li><strong>Oposição:</strong> Se opor ao processamento de seus dados</li>
              <li><strong>Limitação:</strong> Limitar o processamento em certas situações</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Retenção de Dados</h2>
            <p className="text-gray-700 leading-relaxed">
              Mantemos suas informações pelo tempo necessário para fornecer nossos serviços ou conforme 
              exigido por lei. Dados de produtos e vendas são mantidos para fins de histórico e relatórios. 
              Você pode solicitar a exclusão de sua conta e dados associados a qualquer momento.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cookies e Tecnologias Similares</h2>
            <p className="text-gray-700 leading-relaxed">
              Utilizamos cookies essenciais para o funcionamento da plataforma, incluindo autenticação 
              e preferências do usuário. Não utilizamos cookies de rastreamento ou publicidade sem 
              seu consentimento explícito.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Menores de Idade</h2>
            <p className="text-gray-700 leading-relaxed">
              Nossos serviços não são direcionados a menores de 18 anos. Não coletamos intencionalmente 
              informações pessoais de menores. Se tomarmos conhecimento de que coletamos dados de um menor, 
              tomaremos medidas para excluí-los.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Alterações nesta Política</h2>
            <p className="text-gray-700 leading-relaxed">
              Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças significativas 
              por e-mail ou através de aviso na plataforma. O uso continuado após as alterações constitui 
              aceitação da nova política.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contato</h2>
            <div className="text-gray-700 leading-relaxed">
              <p className="mb-3">
                Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Encarregado de Dados:</strong> Equipe de Privacidade</p>
                <p><strong>E-mail:</strong> privacidade@agenteinstavendas.com.br</p>
                <p><strong>Tempo de resposta:</strong> Até 15 dias úteis</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
