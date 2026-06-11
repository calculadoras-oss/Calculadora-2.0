/* ============================================================
   shared-calc.js — calculamundo · Lógica compartilhada
   Inclua no FINAL do <body> de TODAS as páginas
   ============================================================ */
 
/* ---------- Constantes ---------- */
const SITE_URL  = 'https://calculamundo.com.br';
const SITE_NAME = 'calculamundo';
 
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
 
/* ---------- Injeta Footer + seção "Outras Calculadoras" ---------- */
(function injectFooter() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  const outras = CM_CALCULADORAS.filter(c => c.href !== current);
 
  const cards = outras.map(c => `
    <a href="${c.href}" class="tool-card">
      <div class="tool-icon">${c.icon}</div>
      <div class="tool-name">${c.name}</div>
      <div class="tool-desc">${c.desc}</div>
    </a>`).join('');
 
  const outrasSection = `
    <div class="section-title">🛠️ Outras Calculadoras</div>
    <div class="tools-grid">${cards}</div>`;
 
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
 
  // Injeta "Outras Calculadoras" antes do footer, dentro do .container
  const container = document.querySelector('.container');
  if (container) container.insertAdjacentHTML('beforeend', outrasSection);
 
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
 
