import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

const trustSignals = [
  "Expiracao automatica em 72h",
  "Score e reputacao de corretores",
  "Leads qualificados por cidade e bairro"
];

const operatingBlocks = [
  {
    label: "Cliente",
    title: "Busca orientada por necessidade real.",
    text: "Em vez de vasculhar portais lotados de oferta desatualizada, o cliente publica contexto e recebe propostas aderentes."
  },
  {
    label: "Corretor",
    title: "Lead com contexto para agir rapido.",
    text: "Faixa de preco, regiao e configuracao do imovel chegam estruturadas para reduzir tentativa e erro."
  },
  {
    label: "Operacao",
    title: "Confianca tratada como regra de produto.",
    text: "Oferta invalida derruba score. Avaliacao positiva recompensa consistencia. O marketplace aprende com o comportamento."
  }
];

const featureColumns = [
  {
    eyebrow: "Oferta viva",
    title: "Disponibilidade validada antes de entrar em jogo.",
    items: [
      "Link do imovel com preco e observacao contextual",
      "Confirmacao obrigatoria de disponibilidade",
      "Status ativo, expirado ou invalido"
    ]
  },
  {
    eyebrow: "Curadoria",
    title: "Reputacao operacional para nao premiar improviso.",
    items: [
      "Score inicial de 5.0 para todo corretor",
      "Penalidade para proposta invalida",
      "Bloqueio automatico abaixo de score 3.0"
    ]
  },
  {
    eyebrow: "Velocidade",
    title: "Fluxo enxuto para validar a ideia sem inflar a stack.",
    items: [
      "Cadastro por papel: cliente ou corretor",
      "Dashboard com filtro e paginacao",
      "Base pronta para Vercel + Neon"
    ]
  }
];

const processSteps = [
  {
    step: "01",
    title: "Cliente publica a busca",
    text: "Cidade, bairro, faixa de preco e atributos do imovel viram um lead acionavel."
  },
  {
    step: "02",
    title: "Corretor responde com proposta real",
    text: "A plataforma obriga o envio com link, preco, nota e confirmacao de disponibilidade."
  },
  {
    step: "03",
    title: "Cliente avalia a experiencia",
    text: "A qualidade do atendimento retroalimenta o score e protege o marketplace de oferta fraca."
  }
];

export default async function HomePage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="page-shell home-shell">
      <section className="home-topbar">
        <div className="topbar-brand">
          <span className="brand-mark">RM</span>
          <div>
            <strong>Reverse Market</strong>
            <p>Marketplace reverso para locacao</p>
          </div>
        </div>
        <div className="button-row">
          <Link className="button-ghost" href="/pitch">
            Ver pitch
          </Link>
          <Link className="button-secondary" href="/login">
            Entrar
          </Link>
          <Link className="button" href="/register">
            Criar conta
          </Link>
        </div>
      </section>

      <section className="hero home-hero editorial-hero">
        <article className="hero-card hero-primary">
          <p className="eyebrow">Locacao com operacao mais confiavel</p>
          <h1>O cliente publica a demanda. O corretor responde com oferta viva.</h1>
          <p className="lead">
            Um MVP de marketplace reverso imobiliario desenhado para reduzir friccao, eliminar anuncio morto e
            criar uma camada de confianca desde o primeiro contato.
          </p>

          <div className="hero-marquee">
            {trustSignals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>

          <div className="button-row hero-actions">
            <Link className="button" href="/register">
              Abrir conta e testar
            </Link>
            <Link className="button-secondary" href="/pitch">
              Navegar pelo pitch
            </Link>
          </div>

          <div className="hero-kpi-grid">
            <div className="hero-kpi-card">
              <span>Foco inicial</span>
              <strong>Locacao urbana</strong>
            </div>
            <div className="hero-kpi-card">
              <span>Motor de qualidade</span>
              <strong>Score por corretor</strong>
            </div>
            <div className="hero-kpi-card">
              <span>Tempo de vida da oferta</span>
              <strong>72 horas</strong>
            </div>
          </div>
        </article>

        <aside className="hero-side home-side">
          <div className="hero-card spotlight-panel">
            <p className="eyebrow">Posicionamento</p>
            <strong>Infraestrutura leve para uma dor intensa de mercado.</strong>
            <p>
              O centro da proposta nao e listar mais imoveis. E orquestrar uma entrada comercial mais limpa, com
              contexto, reputacao e validade operacional.
            </p>
          </div>

          <div className="hero-card score-panel">
            <div className="score-panel-head">
              <p className="eyebrow">Score e confianca</p>
              <span className="status-pill">Regra ativa</span>
            </div>
            <div className="score-rule-list">
              <div>
                <strong>5.0</strong>
                <p>Ponto de partida para todo corretor.</p>
              </div>
              <div>
                <strong>-1.0</strong>
                <p>Penalidade para proposta invalida.</p>
              </div>
              <div>
                <strong>+0.1</strong>
                <p>Incremento por avaliacao positiva.</p>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section className="home-section trust-band">
        <div className="section-heading narrow">
          <p className="eyebrow">Leitura do problema</p>
          <h2>Quando a busca depende de anuncio desatualizado, o atrito vira a experiencia.</h2>
          <p>
            O produto nasce para inverter esse fluxo: tirar o cliente da exploracao cansativa e colocar os corretores
            respondendo sobre uma necessidade clara, filtrada e temporalmente limitada.
          </p>
        </div>
        <div className="home-grid-three">
          {operatingBlocks.map((block) => (
            <article className="strip-card home-insight-card" key={block.label}>
              <p className="eyebrow">{block.label}</p>
              <h3>{block.title}</h3>
              <p>{block.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section feature-section">
        <div className="section-heading">
          <p className="eyebrow">Arquitetura de produto</p>
          <h2>Tres camadas para validar a tese sem perder rigor.</h2>
          <p>
            A estrutura do MVP combina oferta validada, controle de reputacao e velocidade operacional para criar um
            ambiente pequeno, mas estrategicamente bem amarrado.
          </p>
        </div>
        <div className="feature-columns">
          {featureColumns.map((column) => (
            <article className="hero-card feature-column-card" key={column.title}>
              <p className="eyebrow">{column.eyebrow}</p>
              <h3>{column.title}</h3>
              <ul className="editorial-list">
                {column.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section process-section">
        <div className="section-heading narrow">
          <p className="eyebrow">Metodo de operacao</p>
          <h2>Fluxo simples, com responsabilidade clara em cada etapa.</h2>
        </div>
        <div className="process-grid">
          {processSteps.map((item) => (
            <article className="process-card" key={item.step}>
              <span className="process-step">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section closing-section">
        <article className="hero-card closing-card">
          <div className="section-heading narrow">
            <p className="eyebrow">Proximo passo</p>
            <h2>Se a busca por locacao ainda depende de sorte, o produto ainda tem espaco para existir.</h2>
            <p>
              O MVP ja esta estruturado com cadastro, dashboards, reputacao, expiracao automatica e base pronta para
              deploy. O passo seguinte e testar a aderencia comercial em campo.
            </p>
          </div>
          <div className="button-row">
            <Link className="button" href="/register">
              Testar o MVP
            </Link>
            <Link className="button-ghost" href="/login">
              Acessar ambiente
            </Link>
            <Link className="button-secondary" href="/pitch">
              Abrir apresentacao
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
