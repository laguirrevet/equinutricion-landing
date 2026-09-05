#!/usr/bin/env node
/*
 * build.js — arma las partes repetidas del sitio.
 *
 * El problema que resuelve: el <head>, el <nav> y el <footer> son el mismo
 * bloque copiado a mano en las 9 páginas. Cambiar un enlace del menú son 9
 * ediciones, y basta olvidar una para que el sitio quede inconsistente (pasó:
 * las 7 guías perdieron el enlace a "Quiénes somos").
 *
 * Cómo funciona: cada bloque vive una sola vez en _build/partials/ y este
 * script lo escribe dentro de cada .html, entre marcas <!-- build:x --> ...
 * <!-- /build:x -->. Los archivos quedan en la raíz, con las mismas rutas y
 * el mismo HTML plano: GitHub Pages no se entera de que existe un build.
 *
 * Uso:
 *   node _build/build.js            escribe los cambios
 *   node _build/build.js --check    no escribe; falla si algo está desfasado
 *
 * La carpeta empieza con "_" para que Jekyll no la publique (igual que
 * _plantillas/).
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CHECK = process.argv.includes('--check');

/* ------------------------------------------------------------------ *
 * Las páginas del sitio.
 *
 *   nav     cuál ítem del menú se marca como activo
 *   prio    <priority> del sitemap
 *   lastmod fecha para el sitemap. A mano y a propósito: debe reflejar el
 *           último cambio real de CONTENIDO. Si se sacara de git, este mismo
 *           commit pondría "hoy" en las 9 páginas sin que el lector vea nada
 *           distinto, y un lastmod que miente es un lastmod que Google ignora.
 *           Al editar el texto de una página, se sube su fecha acá.
 * ------------------------------------------------------------------ */
const PAGES = {
  'index.html':                 { nav: 'inicio',  prio: '1.0', lastmod: '2026-09-01' },
  'otros-servicios.html':       { nav: 'terreno', prio: '0.7', lastmod: '2026-09-01' },
  'alimentos.html':             { nav: 'guias',   prio: '0.8', lastmod: '2026-07-30' },
  'manejo.html':                { nav: 'guias',   prio: '0.8', lastmod: '2026-07-30' },
  'suplementacion.html':        { nav: 'guias',   prio: '0.8', lastmod: '2026-07-30' },
  'entrenamiento.html':         { nav: 'guias',   prio: '0.8', lastmod: '2026-07-30' },
  'salud-preventiva.html':      { nav: 'guias',   prio: '0.8', lastmod: '2026-07-30' },
  'condicion-corporal.html':    { nav: 'guias',   prio: '0.8', lastmod: '2026-07-30' },
  'reproduccion-y-crianza.html':{ nav: 'guias',   prio: '0.8', lastmod: '2026-07-30' },
};

const SITE = 'https://equinutricion.cl/';

const partial = name =>
  fs.readFileSync(path.join(__dirname, 'partials', name + '.html'), 'utf8').replace(/\n+$/, '');

/* Qué se escribe en cada bloque, para una página dada. */
const BLOCKS = {
  head: () => partial('head'),
  nav: page =>
    partial('nav')
      .replace('{{A_INICIO}}',  PAGES[page].nav === 'inicio'  ? ' class="active"' : '')
      .replace('{{C_GUIAS}}',   PAGES[page].nav === 'guias'   ? ' active'         : '')
      .replace('{{A_TERRENO}}', PAGES[page].nav === 'terreno' ? ' class="active"' : ''),
  footer: () => partial('footer'),
};

/* Cómo reconocer un bloque que todavía no tiene marcas (solo la 1ª pasada). */
const SIN_MARCAS = {
  head: /[ \t]*<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">[\s\S]*?gtag\('config', '[^']*'\);\s*<\/script>/,
  nav: /<nav>[\s\S]*?<\/nav>/,
  footer: /<footer[\s\S]*?<\/footer>/,
};

const escapar = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function inject(src, name, contenido) {
  // La marca de apertura dice en voz alta que el bloque es generado: sin eso,
  // alguien edita el menú directo en el HTML y la próxima corrida del build se
  // lo come sin avisar.
  const abre = `<!-- build:${name} · generado por _build/build.js — no editar acá -->`;
  const cierra = `<!-- /build:${name} -->`;
  const bloque = `${abre}\n${contenido}\n${cierra}`;
  const conMarcas = new RegExp(`<!-- build:${name}\\b[\\s\\S]*?${escapar(cierra)}`);

  if (conMarcas.test(src)) return src.replace(conMarcas, () => bloque);

  if (!SIN_MARCAS[name].test(src)) {
    throw new Error(`no encuentro el bloque "${name}" ni sus marcas`);
  }
  return src.replace(SIN_MARCAS[name], () => bloque);
}

function sitemap() {
  const urls = Object.entries(PAGES).map(([page, cfg]) => {
    const loc = page === 'index.html' ? SITE : SITE + page;
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${cfg.lastmod}</lastmod>`,
      '    <changefreq>monthly</changefreq>',
      `    <priority>${cfg.prio}</priority>`,
      '  </url>',
    ].join('\n');
  });
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
}

/* ------------------------------------------------------------------ */

const cambiados = [];

for (const page of Object.keys(PAGES)) {
  const file = path.join(ROOT, page);
  const antes = fs.readFileSync(file, 'utf8');
  let despues = antes;

  for (const name of Object.keys(BLOCKS)) {
    try {
      despues = inject(despues, name, BLOCKS[name](page));
    } catch (e) {
      console.error(`✗ ${page}: ${e.message}`);
      process.exit(1);
    }
  }

  if (despues !== antes) {
    cambiados.push(page);
    if (!CHECK) fs.writeFileSync(file, despues);
  }
}

const smFile = path.join(ROOT, 'sitemap.xml');
const smAntes = fs.readFileSync(smFile, 'utf8');
const smDespues = sitemap();
if (smAntes !== smDespues) {
  cambiados.push('sitemap.xml');
  if (!CHECK) fs.writeFileSync(smFile, smDespues);
}

if (CHECK) {
  if (cambiados.length) {
    console.error('✗ desfasado respecto de _build/partials/:\n  ' + cambiados.join('\n  '));
    console.error('\n  Corrige con: node _build/build.js');
    process.exit(1);
  }
  console.log('✓ las 9 páginas y el sitemap están al día');
} else {
  console.log(
    cambiados.length
      ? 'actualizado:\n  ' + cambiados.join('\n  ')
      : 'sin cambios — todo ya estaba al día'
  );
}
