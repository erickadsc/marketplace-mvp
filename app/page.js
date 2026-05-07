import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function HomePage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <article className="hero-card">
          <p className="eyebrow">Marketplace reverso de locacao</p>
          <h1>Imoveis realmente disponiveis, sem busca perdida.</h1>
          <p className="lead">
            O cliente descreve o que precisa e os corretores respondem com opcoes confirmadas.
            Cada proposta expira em 72 horas e a reputacao do corretor sobe ou desce com base na qualidade.
          </p>
          <div className="hero-marquee">
            <span>Disponibilidade real</span>
            <span>Leads quentes</span>
            <span>Curadoria por score</span>
          </div>
          <div className="button-row">
            <Link className="button" href="/register">
              Criar conta
            </Link>
            <Link className="button-secondary" href="/login">
              Entrar
            </Link>
          </div>
          <div className="stat-grid">
            <div className="mini-stat">
              <span>Problema atacado</span>
              <strong>Anuncios desatualizados</strong>
            </div>
            <div className="mini-stat">
              <span>Diferencial</span>
              <strong>Disponibilidade validada</strong>
            </div>
            <div className="mini-stat">
              <span>Foco inicial</span>
              <strong>Locacao urbana</strong>
            </div>
          </div>
        </article>

        <aside className="hero-side">
          <div className="hero-card signal-box spotlight-card">
            <p className="eyebrow">Proposta de valor</p>
            <strong>Um funil imobiliario mais rapido para locacao.</strong>
            <p>
              Em vez de obrigar o cliente a caçar anuncios velhos, o fluxo parte da demanda e puxa ofertas
              vivas de corretores com reputacao monitorada.
            </p>
          </div>
          <div className="hero-card signal-box">
            <p className="eyebrow">Como funciona</p>
            <ul>
              <li>Cliente cria um perfil de busca para locacao.</li>
              <li>Corretores veem leads qualificados por bairro e faixa de preco.</li>
              <li>Propostas entram com link, preco, observacao e confirmacao de disponibilidade.</li>
              <li>Cliente avalia o corretor apos o contato.</li>
            </ul>
          </div>
          <div className="hero-card signal-box">
            <p className="eyebrow">Regras do MVP</p>
            <ul>
              <li>Score inicial de corretor em 5.0.</li>
              <li>Menos 1 ponto para proposta invalida.</li>
              <li>Mais 0.1 para avaliacao positiva.</li>
              <li>Score abaixo de 3 bloqueia novas propostas.</li>
            </ul>
          </div>
        </aside>
      </section>

      <section className="marketing-strip">
        <article className="strip-card">
          <p className="eyebrow">Para cliente</p>
          <h2>Menos rolagem, mais resposta util.</h2>
          <p>Dashboards simples para centralizar propostas, status e avaliacao do atendimento.</p>
        </article>
        <article className="strip-card">
          <p className="eyebrow">Para corretor</p>
          <h2>Leads claros para agir rapido.</h2>
          <p>Veja faixa de preco, regiao e exigencias antes de investir tempo em uma oferta.</p>
        </article>
        <article className="strip-card">
          <p className="eyebrow">Para operacao</p>
          <h2>Qualidade como regra do produto.</h2>
          <p>Expiracao automatica e score ajudam a proteger a confianca da plataforma desde o MVP.</p>
        </article>
      </section>
    </main>
  );
}
