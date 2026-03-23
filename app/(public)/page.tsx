import Link from "next/link";
import { Search, Star, MessageCircle, Shield } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-violet-700">
            Uber Domestika
          </h1>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-violet-700 transition"
            >
              Entrar
            </Link>
            <Link
              href="/login"
              className="bg-violet-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-violet-700 transition"
            >
              Começar agora
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
            Encontre profissionais domésticos{" "}
            <span className="text-violet-600">de confiança</span> na sua região
          </h2>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
            Conectamos você a profissionais avaliados e verificados para faxina,
            cozinha, babá e muito mais. Sem complicação.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/login"
              className="bg-violet-600 text-white px-8 py-3.5 rounded-lg text-lg font-medium hover:bg-violet-700 transition shadow-lg shadow-violet-200"
            >
              Encontrar profissional
            </Link>
            <Link
              href="#como-funciona"
              className="text-violet-600 px-8 py-3.5 rounded-lg text-lg font-medium hover:bg-violet-50 transition border border-violet-200"
            >
              Como funciona
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-violet-50/50" id="como-funciona">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Como funciona
          </h3>
          <p className="text-center text-gray-500 mb-16 max-w-xl mx-auto">
            Em 3 passos simples você encontra a profissional ideal
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Search className="w-6 h-6" />}
              title="Busque na sua região"
              description="Veja todas as profissionais disponíveis no seu bairro, filtradas por serviço e avaliação."
            />
            <FeatureCard
              icon={<Star className="w-6 h-6" />}
              title="Veja avaliações reais"
              description="Leia avaliações de outros clientes para escolher a profissional ideal com segurança."
            />
            <FeatureCard
              icon={<MessageCircle className="w-6 h-6" />}
              title="Feche o contrato"
              description="Converse diretamente com a profissional e combine todos os detalhes."
            />
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Shield className="w-4 h-4" />
            Segurança e confiança
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Profissionais verificadas
          </h3>
          <p className="text-gray-500 max-w-xl mx-auto mb-12">
            Todas as profissionais passam por um processo de verificação.
            Avaliações reais de clientes como você.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            <StatCard number="500+" label="Profissionais" />
            <StatCard number="2.000+" label="Avaliações" />
            <StatCard number="12" label="Bairros em SP" />
            <StatCard number="4.8" label="Nota média" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-violet-600">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Pronta para encontrar a profissional ideal?
          </h3>
          <p className="text-violet-200 mb-8">
            Crie sua conta grátis e comece a buscar agora mesmo.
          </p>
          <Link
            href="/login"
            className="inline-block bg-white text-violet-700 px-8 py-3.5 rounded-lg text-lg font-medium hover:bg-violet-50 transition"
          >
            Criar conta grátis
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-gray-400">
          <span>© 2026 Uber Domestika. Todos os direitos reservados.</span>
          <span>Feito com 💜 em São Paulo</span>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
      <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="p-6">
      <div className="text-3xl font-bold text-violet-600 mb-1">{number}</div>
      <div className="text-gray-500 text-sm">{label}</div>
    </div>
  );
}
