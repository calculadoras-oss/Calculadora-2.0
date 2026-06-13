/* ============================================================
   shared-calc.js — calculamundo · Lógica compartilhada
   Inclua no FINAL do <body> de TODAS as páginas
   ============================================================ */

/* ---------- Constantes ---------- */
const SITE_URL  = 'https://calculamundo.com.br';
const SITE_NAME = 'calculamundo';

/* ---------- Detecta se está dentro de /artigos/ ---------- */
const CM_IN_ARTIGOS = window.location.pathname.includes('/artigos/');
const CM_ROOT = CM_IN_ARTIGOS ? '../' : '';
function cmRootHref(file) { return CM_ROOT + file; }
function cmArtigoHref(file) { return CM_IN_ARTIGOS ? file : 'artigos/' + file; }

/* ---------- Páginas do site (nav) ---------- */
const CM_PAGES = [
  { href: 'calculadora-aposentadoria.html',label: 'Aposentadoria'   },
  { href: 'simulador-financiamento.html',  label: 'Financiamento'   },
  { href: 'comparador-investimentos.html', label: 'Comparador'      },
  { href: 'quanto-rende-1-milhao.html',    label: 'R$ 1 Milhão'     },
];

/* ---------- Todas as calculadoras (para seção "Outras") ---------- */
const CM_CALCULADORAS = [
  { href: 'index.html',                     icon: '📈', name: 'Calculadora de Juros Compostos',      desc: 'Simule o crescimento do seu patrimônio com juros compostos.' },
  { href: 'calculadora-aposentadoria.html', icon: '🏖️', name: 'Calculadora de Aposentadoria',        desc: 'Descubra quanto precisa investir para se aposentar com a renda que deseja.' },
  { href: 'simulador-financiamento.html',   icon: '🏠', name: 'Simulador de Financiamento',          desc: 'Compare sistemas Price e SAC para financiamentos imobiliários e veículos.' },
  { href: 'comparador-investimentos.html',  icon: '⚖️', name: 'Comparador de Investimentos',         desc: 'Tesouro Direto vs CDB vs Poupança: qual rende mais para o seu perfil?' },
  { href: 'aposentadoria-com-1-milhao.html',icon: '💰', name: 'Aposentadoria com 1 Milhão',          desc: 'Descubra se dá para se aposentar com R$ 1 milhão.' },
  { href: 'juros-compostos-20-anos.html',   icon: '💲', name: 'Juros Compostos em 20 Anos',          desc: 'Veja o poder dos juros compostos em 20 anos.' },
  { href: 'quanto-rende-1000-reais.html',   icon: '🤑', name: 'Quanto Rende R$ 1.000?',             desc: 'Descubra quanto rende R$ 1.000 na poupança, CDB, Tesouro Direto e outros.' },
  { href: 'quanto-rende-5000-no-cdi.html',  icon: '🤑', name: 'Quanto Rende R$ 5.000?',             desc: 'Simule quanto R$ 5.000 rendem no CDI: 100%, 110%, 120%. Compare prazos e veja o rendimento líquido após IR.' },
  { href: 'renda-passiva-100-mil.html',     icon: '💵', name: 'Renda Passiva com R$ 100 Mil',        desc: 'Descubra quanto você recebe por mês com R$ 100.000 investidos.' },
  { href: 'quanto-rende-1-milhao.html',     icon: '💎', name: 'Quanto Rende R$ 1 Milhão?',          desc: 'Simule a renda passiva mensal gerada por um patrimônio de R$ 1 milhão.' },
];

/* ---------- Artigos do blog ---------- */
/* Para adicionar um novo artigo, basta acrescentar uma linha aqui. */
const CM_ARTIGOS = [
  { file: 'artigo-juros-compostos-vs-simples.html', icon: '📊', name: 'Juros Compostos vs Juros Simples', desc: 'A diferença que define sua riqueza no longo prazo.' },
  { file: 'artigo-planejar-aposentadoria.html',      icon: '🏖️', name: 'Como Planejar a Aposentadoria',  desc: 'Passo a passo para construir sua independência financeira.' },
  { file: 'artigo-tesouro-direto.html',              icon: '🏛️', name: 'Tesouro Direto: Guia Completo',   desc: 'Como investir com segurança no título público.' },
   { file: 'artigo-diversificacao.html',              icon: '🎯', name: 'Diversificação de Investimentos',  desc: 'Como proteger e fazer seu dinheiro crescer ao mesmo tempo.' },
  { file: 'artigo-reserva-emergencia.html',          icon: '🛡️', name: 'Reserva de Emergência',           desc: 'Quanto guardar e onde deixar para render sem perder liquidez.' },
  { file: 'artigo-inflacao-poder-compra.html',       icon: '📉', name: 'Inflação e Poder de Compra',       desc: 'Como o IPCA corrói seu patrimônio e como se proteger.' },
];

/* ---------- Injeta Nav ---------- */
(function injectNav() {
  const current = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
  const isBlogIndex = CM_IN_ARTIGOS && window.location.pathname.endsWith('/');
  const links = CM_PAGES.map(p =>
    `<a href="${cmRootHref(p.href)}"${current === p.href ? ' class="active"' : ''}>${p.label}</a>`
  ).join('') + `<a href="${cmRootHref('artigos/')}"${isBlogIndex ? ' class="active"' : ''}>Blog</a>`;

  const navHTML = `
    <nav>
      <div class="nav-inner">
        <a href="${cmRootHref('index.html')}" class="nav-logo">✦ ${SITE_NAME}</a>
        <div class="nav-links">${links}</div>
        <button class="nav-theme-btn" id="theme-btn" onclick="toggleTheme()">🌙</button>
      </div>
    </nav>`;

  document.body.insertAdjacentHTML('afterbegin', navHTML);
})();

/* ---------- Injeta Footer + seções "Artigos do Blog" e "Outras Calculadoras" ---------- */
(function injectFooter() {
  const current = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
  const isBlogIndexPage = CM_IN_ARTIGOS && window.location.pathname.endsWith('/');
  const container = document.querySelector('.container');

  /* --- Seção "Artigos do Blog" --- */
  const artigosFiltrados = CM_ARTIGOS.filter(a => !(CM_IN_ARTIGOS && !isBlogIndexPage && current === a.file));

  if (artigosFiltrados.length > 0) {
    const artigosCards = artigosFiltrados.map(a => `
      <a href="${cmArtigoHref(a.file)}" class="aff-card">
        <div class="aff-name">${a.icon} ${a.name}</div>
        <div class="aff-benefit">${a.desc}</div>
        <span class="aff-cta">Ler artigo →</span>
      </a>`).join('');

    const blogSection = `
      <div class="aff-section">
        <div class="aff-title">📰 Artigos do Blog</div>
        <div class="aff-sub">Aprenda mais sobre investimentos e planejamento financeiro:</div>
        <div class="aff-grid">${artigosCards}</div>
      </div>`;

    if (container) container.insertAdjacentHTML('beforeend', blogSection);
  }

  /* --- Seção "Outras Calculadoras" --- */
  const outras = CM_CALCULADORAS.filter(c => c.href !== current);

  const cards = outras.map(c => `
    <a href="${cmRootHref(c.href)}" class="tool-card">
      <div class="tool-icon">${c.icon}</div>
      <div class="tool-name">${c.name}</div>
      <div class="tool-desc">${c.desc}</div>
    </a>`).join('');

  const outrasSection = `
    <div class="section-title">🛠️ Outras Calculadoras</div>
    <div class="tools-grid">${cards}</div>`;

  if (container) container.insertAdjacentHTML('beforeend', outrasSection);

  /* --- Footer --- */
  const footerHTML = `
    <footer>
      <div class="footer-inner">
        <div class="footer-links">
          <a href="${cmRootHref('sobre.html')}">Sobre Nós</a>
          <a href="${cmRootHref('contato.html')}">Contato</a>
          <a href="${cmRootHref('privacidade.html')}">Política de Privacidade</a>
          <a href="${cmRootHref('termos.html')}">Termos de Uso</a>
        </div>
        <p style="max-width:600px;line-height:1.6;font-size:12px;">
          Aviso: Os resultados das ferramentas são simulações matemáticas baseadas em estimativas.
          Rendimentos passados não garantem retornos futuros. Consulte sempre um profissional
          certificado antes de tomar decisões financeiras.
        </p>
        <p>© <span class="year-auto"></span> ·
          <a href="${SITE_URL}" style="color:var(--gold);text-decoration:none;font-weight:500;">${SITE_URL.replace('https://', '')}</a>
          · Todos os direitos reservados.
        </p>
      </div>
    </footer>
    <div class="toast" id="toast"></div>`;

  document.body.insertAdjacentHTML('beforeend', footerHTML);
  document.querySelectorAll('.year-auto').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
})();

/* ---------- Tema (dark/light) ---------- */
function toggleTheme() {
  const isLight = document.body.classList.toggle('light');
  const btn = document.getElementById('theme-btn');
  if (btn) btn.textContent = isLight ? '🌙' : '☀️';
  localStorage.setItem('cm-theme', isLight ? 'light' : 'dark');
}

(function applyTheme() {
  if (localStorage.getItem('cm-theme') === 'light') {
    document.body.classList.add('light');
    requestAnimationFrame(() => {
      const btn = document.getElementById('theme-btn');
      if (btn) btn.textContent = '🌙';
    });
  }
})();

/* ---------- Toast ---------- */
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

/* ---------- Compartilhar ---------- */
function copyLink() {
  const url = window.location.href.split('?')[0];
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      showToast('✅ Link copiado com sucesso!');
      const b = document.querySelector('.btn-copy');
      if (b) { b.textContent = '✅ Copiado!'; setTimeout(() => b.textContent = '📋 Copiar link', 2000); }
    });
  } else {
    // Fallback para navegadores sem clipboard API (HTTP, Safari antigo)
    const ta = document.createElement('textarea');
    ta.value = url;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast('✅ Link copiado com sucesso!');
      const b = document.querySelector('.btn-copy');
      if (b) { b.textContent = '✅ Copiado!'; setTimeout(() => b.textContent = '📋 Copiar link', 2000); }
    } catch (e) {
      showToast('⚠️ Copie o link manualmente: ' + url);
    }
    document.body.removeChild(ta);
  }
}

function shareWhatsApp(texto) {
  const txt = texto || `🤑 Simulei na ${SITE_NAME}!\n🔗 ${window.location.href}`;
  window.open('https://api.whatsapp.com/send?text=' + encodeURIComponent(txt), '_blank');
}

function shareInstagram(texto) {
  const txt = texto || `🤑 Simulei na ${SITE_NAME}!\n🔗 ${window.location.href}`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(txt).then(() => {
      showToast('📸 Texto copiado! Cole nos Stories do Instagram.');
    });
  }
}

/* ============================================================
   MOTOR DE CÁLCULO — reutilizável por todas as páginas
   ============================================================ */

/**
 * Calcula juros compostos mês a mês.
 */
function calcJuros(P, Ap, i, n) {
  const labels    = [];
  const totais    = [];
  const investidos = [];

  for (let m = 1; m <= n; m++) {
    const saldo = i > 0
      ? P * Math.pow(1 + i, m) + Ap * (Math.pow(1 + i, m) - 1) / i
      : P + Ap * m;
    labels.push(m === 1 ? '1m' : m % 12 === 0 ? (m / 12) + 'a' : '');
    totais.push(+saldo.toFixed(2));
    investidos.push(+(P + Ap * m).toFixed(2));
  }

  const total     = totais[totais.length - 1] || 0;
  const investido = P + Ap * n;
  const juros     = total - investido;
  const renda     = i > 0 ? total * i : 0;

  return { total, investido, juros, renda, labels, totais, investidos };
}

/**
 * Formata número como moeda BRL.
 */
function fmtBRL(v) {
  return 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * Renderiza gráfico de linha (patrimônio vs investido).
 */
function renderLineChart(canvasId, labels, totais, investidos) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Patrimônio Total',
          data: totais,
          borderColor: '#C9A84C',
          backgroundColor: 'rgba(201,168,76,0.1)',
          fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2.5,
        },
        {
          label: 'Total Investido',
          data: investidos,
          borderColor: '#2ECC71',
          backgroundColor: 'rgba(46,204,113,0.05)',
          fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2,
          borderDash: [6, 3],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { labels: { color: '#8888AA', font: { family: 'DM Sans' } } },
        tooltip: {
          backgroundColor: '#12121A', borderColor: '#C9A84C', borderWidth: 1,
          titleColor: '#C9A84C', bodyColor: '#E8E8F0',
          callbacks: {
            label: ctx => ' ' + ctx.dataset.label + ': ' + fmtBRL(ctx.parsed.y),
          },
        },
      },
      scales: {
        x: { ticks: { color: '#555577', font: { size: 11 } }, grid: { color: 'rgba(255,255,255,0.04)' } },
        y: {
          ticks: {
            color: '#555577', font: { size: 11 },
            callback: v => 'R$' + (v >= 1e6 ? (v / 1e6).toFixed(1) + 'M' : v >= 1e3 ? (v / 1e3).toFixed(0) + 'k' : v),
          },
          grid: { color: 'rgba(255,255,255,0.04)' },
        },
      },
    },
  });
}

/**
 * Abre o ChatGPT com o prompt da simulação copiado para a área de transferência.
 * Como o chatgpt.com não aceita parâmetros de URL para pré-preencher mensagens,
 * copiamos o prompt e abrimos o chat — o usuário só precisa colar (Ctrl+V / Cmd+V).
 */
function abrirChatGPT({ P, Ap, i, meses, total, investido, juros, renda }) {
  const prompt =
    'Você é um consultor financeiro. Analise esta simulação de juros compostos:\n\n' +
    '- Valor inicial: ' + fmtBRL(P) + '\n' +
    '- Aporte mensal: ' + fmtBRL(Ap) + '/mês\n' +
    '- Taxa: ' + (i * 100).toFixed(2) + '% ao mês\n' +
    '- Prazo: ' + meses + ' meses\n' +
    '- Patrimônio final: ' + fmtBRL(total) + '\n' +
    '- Total investido: ' + fmtBRL(investido) + '\n' +
    '- Juros ganhos: ' + fmtBRL(juros) + '\n' +
    '- Renda passiva estimada: ' + fmtBRL(renda) + '/mês\n\n' +
    'Por favor: 1) Avalie se é um bom resultado, 2) Explique o poder dos juros compostos neste caso, 3) Dê 2 dicas práticas para melhorar ainda mais.';

  const copiado = (function tentarCopiar() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(prompt);
      return true;
    }
    try {
      const ta = document.createElement('textarea');
      ta.value = prompt;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      return true;
    } catch (e) {
      return false;
    }
  })();

  if (copiado) {
    showToast('📋 Prompt copiado! Cole no ChatGPT com Ctrl+V.');
  }

  window.open('https://chatgpt.com/', '_blank');
}
