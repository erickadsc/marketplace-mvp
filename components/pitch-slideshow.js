'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function PitchSlideshow() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="pitch-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop
        className="pitch-swiper"
      >
        {/* Slide 1: Título */}
        <SwiperSlide>
          <div className="slide slide-title">
            <h1>Seu Marketplace Profissional</h1>
            <p>Conectando profissionais com clientes</p>
            <div className="slide-decorator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2: Problema */}
        <SwiperSlide>
          <div className="slide slide-dark">
            <h2>O Problema</h2>
            <ul className="slide-list">
              <li>Profissionais lutam para encontrar clientes qualificados</li>
              <li>Clientes não sabem onde encontrar profissionais confiáveis</li>
              <li>Falta de transparência em preços e avaliações</li>
              <li>Processo de contratação complexo e demorado</li>
            </ul>
          </div>
        </SwiperSlide>

        {/* Slide 3: Solução */}
        <SwiperSlide>
          <div className="slide slide-accent">
            <h2>Nossa Solução</h2>
            <div className="solution-grid">
              <div className="solution-card">
                <h3>🔍 Descoberta</h3>
                <p>Plataforma intuitiva para encontrar profissionais</p>
              </div>
              <div className="solution-card">
                <h3>⭐ Reputação</h3>
                <p>Sistema de avaliações transparente e confiável</p>
              </div>
              <div className="solution-card">
                <h3>💼 Propostas</h3>
                <p>Processo simplificado de negociação</p>
              </div>
              <div className="solution-card">
                <h3>🛡️ Segurança</h3>
                <p>Transações protegidas e verificadas</p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 4: Recursos Principais */}
        <SwiperSlide>
          <div className="slide slide-light">
            <h2>Recursos Principais</h2>
            <div className="features-list">
              <div className="feature-item">
                <span className="feature-icon">👤</span>
                <h3>Perfis Detalhados</h3>
                <p>Portfolio, experiência e avaliações completas</p>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💬</span>
                <h3>Comunicação</h3>
                <p>Sistema de mensagens integrado</p>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <h3>Análytica</h3>
                <p>Dashboard com métricas e desempenho</p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 5: Modelo de Negócio */}
        <SwiperSlide>
          <div className="slide slide-dark">
            <h2>Modelo de Negócio</h2>
            <div className="business-model">
              <div className="model-box">
                <h3>Comissão por Transação</h3>
                <p>10-15% sobre propostas confirmadas</p>
              </div>
              <div className="model-box highlight">
                <h3>Serviços Premium</h3>
                <p>Destaque de perfil, featured listings</p>
              </div>
              <div className="model-box">
                <h3>Planos Corporativos</h3>
                <p>Para equipes e agências</p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 6: Mercado */}
        <SwiperSlide>
          <div className="slide slide-light">
            <h2>Mercado Alvo</h2>
            <div className="market-grid">
              <div className="market-item">
                <h3>Designers</h3>
                <p>UI/UX, Gráfico, Web</p>
              </div>
              <div className="market-item">
                <h3>Desenvolvedores</h3>
                <p>Full-stack, Mobile, Cloud</p>
              </div>
              <div className="market-item">
                <h3>Consultores</h3>
                <p>Marketing, Negócios, Tech</p>
              </div>
              <div className="market-item">
                <h3>Criadores</h3>
                <p>Conteúdo, Vídeo, Social</p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 7: Roadmap */}
        <SwiperSlide>
          <div className="slide slide-accent">
            <h2>Roadmap</h2>
            <div className="roadmap">
              <div className="roadmap-item">
                <div className="roadmap-date">Q2 2026</div>
                <p>MVP com recursos core</p>
              </div>
              <div className="roadmap-item">
                <div className="roadmap-date">Q3 2026</div>
                <p>Mobile app, pagamentos integrados</p>
              </div>
              <div className="roadmap-item">
                <div className="roadmap-date">Q4 2026</div>
                <p>Expansão internacional</p>
              </div>
              <div className="roadmap-item">
                <div className="roadmap-date">2027</div>
                <p>IA para recomendações</p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 8: Tração */}
        <SwiperSlide>
          <div className="slide slide-light">
            <h2>Tração Inicial</h2>
            <div className="traction-metrics">
              <div className="metric">
                <h3>150+</h3>
                <p>Profissionais cadastrados</p>
              </div>
              <div className="metric">
                <h3>80+</h3>
                <p>Clientes ativos</p>
              </div>
              <div className="metric">
                <h3>35+</h3>
                <p>Propostas criadas</p>
              </div>
              <div className="metric">
                <h3>4.8★</h3>
                <p>Avaliação média</p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 9: Chamada para Ação */}
        <SwiperSlide>
          <div className="slide slide-title slide-cta">
            <h1>Vamos Crescer Juntos?</h1>
            <p>Junte-se à revolução dos marketplaces profissionais</p>
            <div className="cta-buttons">
              <button className="btn-primary">Começar Agora</button>
              <button className="btn-secondary">Saiba Mais</button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <style jsx>{`
        .pitch-container {
          width: 100%;
          height: 100vh;
          background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
          overflow: hidden;
        }

        .pitch-swiper {
          width: 100%;
          height: 100%;
        }

        .slide {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 60px 40px;
          text-align: center;
          color: #fff;
        }

        .slide-title {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .slide-dark {
          background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
        }

        .slide-accent {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .slide-light {
          background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
          color: #1f2937;
        }

        .slide-cta {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        h1 {
          font-size: 4rem;
          font-weight: 700;
          margin-bottom: 20px;
          animation: slideInDown 0.8s ease-out;
        }

        h2 {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 40px;
          animation: slideInDown 0.8s ease-out;
        }

        h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 10px;
        }

        p {
          font-size: 1.3rem;
          margin-bottom: 10px;
          opacity: 0.95;
        }

        .slide-decorator {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-top: 40px;
        }

        .slide-decorator span {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          animation: pulse 2s infinite;
        }

        .slide-decorator span:nth-child(2) {
          animation-delay: 0.3s;
        }

        .slide-decorator span:nth-child(3) {
          animation-delay: 0.6s;
        }

        .slide-list {
          list-style: none;
          padding: 0;
          margin: 0;
          max-width: 600px;
          text-align: left;
        }

        .slide-list li {
          font-size: 1.1rem;
          padding: 15px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .slide-list li:before {
          content: '✓';
          color: #fbbf24;
          font-weight: bold;
          font-size: 1.3rem;
          min-width: 20px;
        }

        .solution-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-top: 20px;
          max-width: 800px;
        }

        .solution-card {
          background: rgba(255, 255, 255, 0.1);
          padding: 30px 20px;
          border-radius: 12px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: transform 0.3s ease;
        }

        .solution-card:hover {
          transform: translateY(-5px);
        }

        .solution-card h3 {
          font-size: 1.3rem;
          margin-bottom: 10px;
        }

        .solution-card p {
          font-size: 0.95rem;
        }

        .features-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 30px;
          max-width: 900px;
        }

        .feature-item {
          text-align: center;
        }

        .feature-icon {
          font-size: 3rem;
          display: block;
          margin-bottom: 15px;
        }

        .feature-item h3 {
          color: #667eea;
        }

        .feature-item p {
          color: #6b7280;
          font-size: 0.95rem;
        }

        .business-model {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          max-width: 800px;
        }

        .model-box {
          background: rgba(255, 255, 255, 0.1);
          padding: 30px;
          border-radius: 12px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .model-box.highlight {
          background: rgba(251, 191, 36, 0.2);
          border-color: #fbbf24;
          box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
        }

        .market-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          max-width: 700px;
        }

        .market-item {
          background: linear-gradient(135deg, #667eea20 0%, #764ba220 100%);
          padding: 25px;
          border-radius: 12px;
          border: 1px solid #667eea40;
        }

        .market-item h3 {
          color: #667eea;
          margin-bottom: 8px;
        }

        .market-item p {
          color: #6b7280;
          font-size: 0.95rem;
        }

        .roadmap {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
          max-width: 800px;
        }

        .roadmap-item {
          background: rgba(255, 255, 255, 0.1);
          padding: 25px 15px;
          border-radius: 12px;
          backdrop-filter: blur(10px);
          border-left: 4px solid #fbbf24;
        }

        .roadmap-date {
          font-weight: bold;
          color: #fbbf24;
          font-size: 0.9rem;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .roadmap-item p {
          font-size: 0.95rem;
        }

        .traction-metrics {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
          max-width: 600px;
        }

        .metric {
          text-align: center;
        }

        .metric h3 {
          font-size: 2.5rem;
          color: #667eea;
          margin-bottom: 10px;
        }

        .metric p {
          color: #6b7280;
          font-size: 1rem;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          margin-top: 40px;
          justify-content: center;
        }

        .btn-primary,
        .btn-secondary {
          padding: 15px 40px;
          font-size: 1.1rem;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background: #fff;
          color: #667eea;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .btn-secondary {
          background: transparent;
          color: #fff;
          border: 2px solid #fff;
        }

        .btn-secondary:hover {
          background: #fff;
          color: #667eea;
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        :global(.swiper-button-next),
        :global(.swiper-button-prev) {
          color: #fff;
          background: rgba(255, 255, 255, 0.2);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        :global(.swiper-button-next:hover),
        :global(.swiper-button-prev:hover) {
          background: rgba(255, 255, 255, 0.4);
        }

        :global(.swiper-button-next::after),
        :global(.swiper-button-prev::after) {
          font-size: 20px;
        }

        :global(.swiper-pagination-bullet) {
          background: rgba(255, 255, 255, 0.5);
        }

        :global(.swiper-pagination-bullet-active) {
          background: #fff;
        }

        @media (max-width: 768px) {
          .slide {
            padding: 40px 20px;
          }

          h1 {
            font-size: 2.5rem;
          }

          h2 {
            font-size: 2rem;
          }

          .solution-grid,
          .market-grid,
          .roadmap {
            grid-template-columns: 1fr;
          }

          .traction-metrics {
            grid-template-columns: 1fr;
          }

          .cta-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
