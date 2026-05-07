import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { expireStaleProposals } from "@/lib/domain";
import { formatCompactLocation, formatCurrency, formatDateTime, formatProposalStatus } from "@/lib/format";
import { ClientProfileForm } from "@/components/client-profile-form";
import { ProposalForm } from "@/components/proposal-form";
import { ReviewForm } from "@/components/review-form";
import { LogoutButton } from "@/components/logout-button";
import { QueryPagination } from "@/components/query-pagination";
import { DeleteSearchProfileButton } from "@/components/delete-search-profile-button";

const PAGE_SIZE = 4;

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function toPositiveInt(value, fallback = 1) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

function paginate(items, page) {
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;

  return {
    items: items.slice(start, start + PAGE_SIZE),
    totalPages,
    page: safePage
  };
}

function FilterForm({ role, searchParams }) {
  const pathname = "/dashboard";

  return (
    <form className="toolbar" action={pathname} method="GET">
      <input type="hidden" name="view" value={role} />
      <label className="field compact-field">
        <span>Busca</span>
        <input name="q" defaultValue={searchParams.q || ""} placeholder="Cidade, bairro, nome..." />
      </label>
      <label className="field compact-field">
        <span>Status</span>
        <select name="status" defaultValue={searchParams.status || "ALL"}>
          <option value="ALL">Todos</option>
          <option value="ACTIVE">Ativas</option>
          <option value="EXPIRED">Expiradas</option>
          <option value="INVALID">Invalidas</option>
        </select>
      </label>
      <div className="button-row">
        <button className="button-secondary" type="submit">
          Filtrar
        </button>
        <Link className="button-ghost" href={`/dashboard?view=${role}`}>
          Limpar
        </Link>
      </div>
    </form>
  );
}

function sortByStatusAndDate(proposals) {
  const statusWeight = {
    ACTIVE: 0,
    INVALID: 1,
    EXPIRED: 2
  };

  return [...proposals].sort((a, b) => {
    const byStatus = statusWeight[a.status] - statusWeight[b.status];
    if (byStatus !== 0) return byStatus;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export default async function DashboardPage({ searchParams }) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  await expireStaleProposals();

  const params = await searchParams;
  const page = toPositiveInt(params?.page, 1);
  const query = normalizeText(params?.q);
  const statusFilter = params?.status || "ALL";
  const currentView = params?.view || (user.type === "CLIENT" ? "client" : "broker");

  if (user.type === "CLIENT") {
    const [profiles, proposalRows] = await Promise.all([
      prisma.searchProfile.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" }
      }),
      prisma.proposal.findMany({
        where: {
          profile: {
            userId: user.id
          }
        },
        include: {
          broker: {
            select: {
              id: true,
              name: true,
              email: true,
              score: true
            }
          },
          profile: true,
          review: true
        },
        orderBy: { createdAt: "desc" }
      })
    ]);

    const filteredProfiles = profiles.filter((profile) => {
      if (!query) return true;
      const haystack = normalizeText(`${profile.city} ${profile.district}`);
      return haystack.includes(query);
    });

    const filteredProposals = sortByStatusAndDate(proposalRows).filter((proposal) => {
      const matchesQuery =
        !query ||
        normalizeText(
          `${proposal.broker.name} ${proposal.profile.city} ${proposal.profile.district} ${proposal.note}`
        ).includes(query);
      const matchesStatus = statusFilter === "ALL" || proposal.status === statusFilter;
      return matchesQuery && matchesStatus;
    });

    const pagedProfiles = paginate(filteredProfiles, toPositiveInt(params?.profilesPage, 1));
    const pagedProposals = paginate(filteredProposals, page);

    return (
      <main className="page-shell dashboard-shell">
        <header className="dashboard-hero">
          <div className="hero-copy">
            <p className="eyebrow">Dashboard do cliente</p>
            <h1>Seu radar de locacao em tempo real.</h1>
            <p className="lead">
              Centralize perfis, acompanhe propostas confiaveis e sinalize quais corretores realmente entregam disponibilidade.
            </p>
            <div className="hero-marquee">
              <span>{profiles.length} perfis criados</span>
              <span>{proposalRows.filter((item) => item.status === "ACTIVE").length} propostas ativas</span>
              <span>Avaliacao apos contato</span>
            </div>
          </div>
          <div className="hero-sidecard">
            <span className="badge">Cliente</span>
            <strong>{user.name}</strong>
            <p>{user.email}</p>
            <div className="button-row">
              <Link className="button-secondary" href="/dashboard?view=client">
                Atualizar painel
              </Link>
              <LogoutButton />
            </div>
          </div>
        </header>

        <section className="metric-row">
          <article className="panel metric accent-metric">
            <span>Perfis ativos</span>
            <strong>{profiles.length}</strong>
          </article>
          <article className="panel metric">
            <span>Propostas totais</span>
            <strong>{proposalRows.length}</strong>
          </article>
          <article className="panel metric">
            <span>Corretores avaliados</span>
            <strong>{proposalRows.filter((item) => item.review).length}</strong>
          </article>
        </section>

        <section className="panel section-split">
          <div className="section-head">
            <div>
              <h2>Novo perfil de busca</h2>
              <p>Transforme necessidade em lead qualificado com cidade, bairro e faixa de preco.</p>
            </div>
          </div>
          <ClientProfileForm />
        </section>

        <section className="panel">
          <div className="section-head">
            <div>
              <h2>Seus perfis publicados</h2>
              <p>Exclua perfis antigos para manter os leads limpos e relevantes.</p>
            </div>
          </div>
          <div className="card-grid">
            {pagedProfiles.items.length ? (
              pagedProfiles.items.map((profile) => (
                <article className="lead-card" key={profile.id}>
                  <div className="card-topline">
                    <strong>{formatCompactLocation(profile.city, profile.district)}</strong>
                    <span className="status-pill">Lead ativo</span>
                  </div>
                  <p>{formatCurrency(profile.minPrice)} ate {formatCurrency(profile.maxPrice)}</p>
                  <div className="meta">
                    <span>{profile.bedrooms} quartos</span>
                    <span>{profile.bathrooms} banheiros</span>
                    <span>{profile.parkingSpots} vagas</span>
                    <span>Locacao</span>
                  </div>
                  <div className="button-row">
                    <DeleteSearchProfileButton profileId={profile.id} />
                  </div>
                </article>
              ))
            ) : (
              <div className="empty">Nenhum perfil corresponde aos filtros atuais.</div>
            )}
          </div>
          <QueryPagination
            pathname="/dashboard"
            searchParams={{ ...params, view: currentView, profilesPage: String(pagedProfiles.page), page: String(page) }}
            page={pagedProfiles.page}
            totalPages={pagedProfiles.totalPages}
            pageParam="profilesPage"
          />
        </section>

        <section className="panel">
          <div className="section-head">
            <div>
              <h2>Propostas recebidas</h2>
              <p>Filtre por status e priorize corretores com boa reputacao.</p>
            </div>
          </div>
          <FilterForm role="client" searchParams={params || {}} />
          <div className="proposal-grid">
            {pagedProposals.items.length ? (
              pagedProposals.items.map((proposal) => (
                <article className="proposal-card feature-card" key={proposal.id}>
                  <div className="card-topline">
                    <strong>{proposal.broker.name}</strong>
                    <span
                      className={`status-pill ${
                        proposal.status === "EXPIRED" ? "expired" : proposal.status === "INVALID" ? "invalid" : ""
                      }`}
                    >
                      {formatProposalStatus(proposal.status)}
                    </span>
                  </div>
                  <p>{formatCompactLocation(proposal.profile.city, proposal.profile.district)}</p>
                  <div className="price-highlight">{formatCurrency(proposal.price)}</div>
                  <div className="meta">
                    <span>Score {Number(proposal.broker.score).toFixed(1)}</span>
                    <span>Recebida em {formatDateTime(proposal.createdAt)}</span>
                    <span>{proposal.review ? "Ja avaliada" : "Aguardando avaliacao"}</span>
                  </div>
                  <p>{proposal.note}</p>
                  <div className="button-row">
                    <a className="button-secondary" href={proposal.propertyLink} target="_blank" rel="noreferrer">
                      Abrir imovel
                    </a>
                    <a className="button-ghost" href={`mailto:${proposal.broker.email}`}>
                      Falar com corretor
                    </a>
                  </div>
                  <ReviewForm proposalId={proposal.id} disabled={Boolean(proposal.review)} />
                </article>
              ))
            ) : (
              <div className="empty">Nenhuma proposta corresponde aos filtros atuais.</div>
            )}
          </div>
          <QueryPagination
            pathname="/dashboard"
            searchParams={{ ...params, view: currentView, page: String(pagedProposals.page) }}
            page={pagedProposals.page}
            totalPages={pagedProposals.totalPages}
          />
        </section>
      </main>
    );
  }

  const [leadRows, sentProposalRows] = await Promise.all([
    prisma.searchProfile.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        proposals: {
          where: { brokerId: user.id },
          select: { id: true, status: true }
        }
      },
      orderBy: { createdAt: "desc" }
    }),
    prisma.proposal.findMany({
      where: { brokerId: user.id },
      include: {
        profile: {
          include: {
            user: {
              select: {
                name: true,
                email: true
              }
            }
          }
        },
        review: true
      },
      orderBy: { createdAt: "desc" }
    })
  ]);

  const filteredLeads = leadRows.filter((lead) => {
    if (!query) return true;
    return normalizeText(`${lead.user.name} ${lead.city} ${lead.district}`).includes(query);
  });

  const filteredSentProposals = sortByStatusAndDate(sentProposalRows).filter((proposal) => {
    const matchesQuery =
      !query ||
      normalizeText(`${proposal.profile.user.name} ${proposal.profile.city} ${proposal.profile.district} ${proposal.note}`).includes(query);
    const matchesStatus = statusFilter === "ALL" || proposal.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const pagedLeads = paginate(filteredLeads, toPositiveInt(params?.leadsPage, 1));
  const pagedSentProposals = paginate(filteredSentProposals, page);
  const scoreBlocked = Number(user.score) < 3;

  return (
    <main className="page-shell dashboard-shell">
      <header className="dashboard-hero broker-theme">
        <div className="hero-copy">
          <p className="eyebrow">Dashboard do corretor</p>
          <h1>Leads melhores, resposta mais rapida.</h1>
          <p className="lead">
            Veja a demanda em tempo real, envie propostas verificadas e preserve seu score para continuar ativo.
          </p>
          <div className="hero-marquee">
            <span>Score atual {Number(user.score).toFixed(1)}</span>
            <span>{leadRows.length} leads publicados</span>
            <span>{sentProposalRows.length} propostas enviadas</span>
          </div>
        </div>
        <div className="hero-sidecard">
          <span className="badge">Corretor</span>
          <strong>{user.name}</strong>
          <p>{user.email}</p>
          <div className="button-row">
            <Link className="button-secondary" href="/dashboard?view=broker">
              Atualizar painel
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <section className="metric-row">
        <article className={`panel metric ${scoreBlocked ? "danger-metric" : "accent-metric"}`}>
          <span>Score atual</span>
          <strong>{Number(user.score).toFixed(1)}</strong>
        </article>
        <article className="panel metric">
          <span>Leads disponiveis</span>
          <strong>{leadRows.length}</strong>
        </article>
        <article className="panel metric">
          <span>Avaliacoes recebidas</span>
          <strong>{sentProposalRows.filter((item) => item.review).length}</strong>
        </article>
      </section>

      {scoreBlocked ? (
        <section className="panel warning-panel">
          <strong>Envio temporariamente bloqueado.</strong>
          <p>Seu score esta abaixo de 3.0. Recupere reputacao com atendimentos melhores e sem propostas invalidas.</p>
        </section>
      ) : null}

      <section className="panel">
        <div className="section-head">
          <div>
            <h2>Leads de clientes</h2>
            <p>Use filtros para priorizar bairros e clientes mais aderentes ao seu estoque disponivel.</p>
          </div>
        </div>
        <FilterForm role="broker" searchParams={params || {}} />
        <div className="lead-grid">
          {pagedLeads.items.length ? (
            pagedLeads.items.map((lead) => (
              <article className="lead-card feature-card" key={lead.id}>
                <div className="card-topline">
                  <strong>{lead.user.name}</strong>
                  <span className="status-pill">{lead.proposals.length} propostas suas</span>
                </div>
                <p>{formatCompactLocation(lead.city, lead.district)}</p>
                <div className="price-highlight">{formatCurrency(lead.minPrice)} ate {formatCurrency(lead.maxPrice)}</div>
                <div className="meta">
                  <span>{lead.bedrooms} quartos</span>
                  <span>{lead.bathrooms} banheiros</span>
                  <span>{lead.parkingSpots} vagas</span>
                </div>
                <div className="button-row">
                  <a className="button-ghost" href={`mailto:${lead.user.email}`}>
                    Ver contato
                  </a>
                </div>
                <ProposalForm profileId={lead.id} clientName={lead.user.name} />
              </article>
            ))
          ) : (
            <div className="empty">Nenhum lead corresponde aos filtros atuais.</div>
          )}
        </div>
          <QueryPagination
            pathname="/dashboard"
            searchParams={{ ...params, view: currentView, leadsPage: String(pagedLeads.page), page: String(page) }}
            page={pagedLeads.page}
            totalPages={pagedLeads.totalPages}
            pageParam="leadsPage"
          />
      </section>

      <section className="panel">
        <div className="section-head">
          <div>
            <h2>Historico de propostas</h2>
            <p>Acompanhe propostas ativas, expiradas e invalidadas em uma trilha unica.</p>
          </div>
        </div>
        <div className="proposal-grid">
          {pagedSentProposals.items.length ? (
            pagedSentProposals.items.map((proposal) => (
              <article className="proposal-card" key={proposal.id}>
                <div className="card-topline">
                  <strong>{proposal.profile.user.name}</strong>
                  <span
                    className={`status-pill ${
                      proposal.status === "EXPIRED" ? "expired" : proposal.status === "INVALID" ? "invalid" : ""
                    }`}
                  >
                    {formatProposalStatus(proposal.status)}
                  </span>
                </div>
                <p>{formatCompactLocation(proposal.profile.city, proposal.profile.district)}</p>
                <div className="price-highlight">{formatCurrency(proposal.price)}</div>
                <div className="meta">
                  <span>Expira em {formatDateTime(proposal.expiresAt)}</span>
                  <span>{proposal.review ? `Avaliacao ${proposal.review.rating}/5` : "Sem avaliacao"}</span>
                </div>
                <p>{proposal.note}</p>
                <div className="button-row">
                  <a className="button-secondary" href={proposal.propertyLink} target="_blank" rel="noreferrer">
                    Abrir imovel
                  </a>
                  <a className="button-ghost" href={`mailto:${proposal.profile.user.email}`}>
                    Contatar cliente
                  </a>
                </div>
              </article>
            ))
          ) : (
            <div className="empty">Nenhuma proposta corresponde aos filtros atuais.</div>
          )}
        </div>
        <QueryPagination
          pathname="/dashboard"
          searchParams={{ ...params, view: currentView, page: String(pagedSentProposals.page) }}
          page={pagedSentProposals.page}
          totalPages={pagedSentProposals.totalPages}
        />
      </section>
    </main>
  );
}
