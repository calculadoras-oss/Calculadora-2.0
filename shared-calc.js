/* ============================================================
   shared-calc.js — calculamundo · Lógica compartilhada
   Inclua no FINAL do <body> de TODAS as páginas
   ============================================================ */

/* ---------- Constantes ---------- */
const SITE_URL  = 'https://calculamundo.com.br';
const SITE_NAME = 'calculamundo';

/* ---------- Páginas do site (nav) ---------- */
const CM_PAGES = [
  { href: 'index.html',                    label: 'Juros Compostos' },
  { href: 'calculadora-aposentadoria.html',label: 'Aposentadoria'   },
  { href: 'simulador-financiamento.html',  label: 'Financiamento'   },
  { href: 'comparador-investimentos.html', label: 'Comparador'      },
  { href: 'quanto-rende-1-milhao.html',    label: 'R$ 1 Milhão'     },
];

/* ---------- Injeta Nav ---------- */
(function injectNav() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  const links = CM_PAGES.map(p =>
    `<a href="${p.href}"${current === p.href ? ' class="active"' : ''}>${p.label}</a>`
  ).join('');

  const navHTML = `
    <nav>
      <div class="nav-inner">
        <a href="index.html" class="nav-logo">✦ ${SITE_NAME}</a>
        <div class="nav-links">${links}</div>
        <button class="nav-theme-btn" id="theme-btn" onclick="toggleTheme()">🌙</button>
      </div>
    </nav>`;

  document.body.insertAdjacentHTML('afterbegin', navHTML);
})();

/* ---------- Injeta Footer ---------- */
(function injectFooter() {
  const footerHTML = `
    <footer>
      <div class="footer-inner">
        <div class="footer-links">
          <a href="sobre.html">Sobre Nós</a>
          <a href="contato.html">Contato</a>
          <a href="privacidade.html">Política de Privacidade</a>
          <a href="termos.html">Termos de Uso</a>
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
 * @param {number} P    - Valor inicial (aporte único)
 * @param {number} Ap   - Aporte mensal
 * @param {number} i    - Taxa mensal (ex: 0.01 para 1%)
 * @param {number} n    - Prazo em meses
 * @returns {{ total, investido, juros, renda, labels, totais, investidos }}
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

  const total    = totais[totais.length - 1] || 0;
  const investido = P + Ap * n;
  const juros    = total - investido;
  const renda    = i > 0 ? total * i : 0;

  return { total, investido, juros, renda, labels, totais, investidos };
}

/**
 * Formata número como moeda BRL.
 * @param {number} v
 * @returns {string} ex: "R$ 1.234,56"
 */
function fmtBRL(v) {
  return 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * Renderiza gráfico de linha (patrimônio vs investido).
 * @param {string}   canvasId  - ID do elemento <canvas>
 * @param {string[]} labels
 * @param {number[]} totais
 * @param {number[]} investidos
 * @returns {Chart} instância do Chart.js (guarde para destruir antes de recriar)
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
 * Abre ChatGPT com prompt pré-preenchido com os dados da simulação.
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
  window.open('https://chat.openai.com/?q=' + encodeURIComponent(prompt), '_blank');
}
