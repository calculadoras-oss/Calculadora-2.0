// ─────────────────────────────────────────────────────────────
//  PATCH: shared-calc.js — atualize o array CM_PAGES
//  (apenas esta seção muda; o resto do arquivo permanece igual)
// ─────────────────────────────────────────────────────────────
//
//  REGRA DO NAV:
//  • Páginas principais (ferramentas completas) → entram no nav
//  • Páginas long-tail (quanto-rende-*, juros-*) → NÃO entram no nav
//    Elas são acessadas pelos tools-grid dentro de cada página.
//
//  Para adicionar uma nova página PRINCIPAL ao nav:
//  basta incluir uma linha no array abaixo. Todos os HTMLs atualizam.
//
//  Para adicionar uma nova página LONG-TAIL:
//  só inclua links para ela nos tools-grid das páginas relacionadas.
//  Não mexe neste arquivo.
// ─────────────────────────────────────────────────────────────

const CM_PAGES = [
  { href: 'index.html',                     label: 'Juros Compostos' },
  { href: 'calculadora-aposentadoria.html', label: 'Aposentadoria'   },
  { href: 'simulador-financiamento.html',   label: 'Financiamento'   },
  { href: 'comparador-investimentos.html',  label: 'Comparador'      },
  { href: 'quanto-rende-1-milhao.html',     label: 'R$ 1 Milhão'     },
  // ↓ Adicione novas páginas principais aqui ↓
  // { href: 'nova-calculadora.html', label: 'Nome no Nav' },
];
