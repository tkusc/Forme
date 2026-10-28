import { refreshTextReveals, initTextReveals } from './text-reveal.js';
import Swup from 'swup';
import SwupHeadPlugin from '@swup/head-plugin';
import SwupParallelPlugin from '@swup/parallel-plugin';
import SwupPreloadPlugin from '@swup/preload-plugin';
import { setupOnce, initPage, initHeader, beforeVisit, capturePageState } from './app.js';

function start() {
  const swup = new Swup({
    animateHistoryBrowsing: true,
    containers: ['#swup', 'header'],
    plugins: [
      new SwupHeadPlugin({ persistAssets: true }),
      new SwupPreloadPlugin(),
      new SwupParallelPlugin()
    ]
  });
  const entries = new Map();
  let currentEntry = history.state?.index;
  let restore;
  setupOnce(url => swup.navigate(url));
  initHeader(document.querySelector('header'));
  initPage(document.querySelector('#swup'));
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', () => {
    initTextReveals(document.querySelector('#swup'));
  });

  swup.hooks.on('visit:start', visit => {
    const page = document.querySelector('#swup');
    entries.set(currentEntry, { top: page.scrollTop, state: capturePageState() });
    // Keep this tab's scroll history bounded without touching Swup's history state.
    if (entries.size > 100) entries.delete(entries.keys().next().value);
    beforeVisit();
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) visit.animation.animate = false;
  });
  swup.hooks.on('content:replace', visit => {
    const page = document.querySelector('#swup');
    const header = document.querySelector('header');
    restore = visit.history.popstate ? entries.get(history.state?.index) : undefined;
    initHeader(header);
    initPage(page, true, restore?.state);
    document.querySelectorAll('.is-previous-container').forEach(container => { container.inert = true; });
    currentEntry = history.state?.index;
  });

  function scrollToAnchor(hash) {
    const page = document.querySelector('#swup');
    let id;
    try { id = decodeURIComponent(hash.replace(/^#/, '')); } catch { return false; }
    const target = id === 'swup' ? page : page.querySelector('#' + CSS.escape(id));
    if (!target) return false;
    let top = 0;
    for (let node = target; node && node !== page; node = node.offsetParent) top += node.offsetTop;
    page.scrollTo({ top: Math.max(0, top - document.querySelector('header').offsetHeight), behavior: 'instant' });
    target.focus?.({ preventScroll: true });
    return true;
  }
  // Replace window-scrolling defaults, including same-page and hash-only links.
  swup.hooks.replace('scroll:top', () => {
    document.querySelector('#swup').scrollTo({ top: 0, left: 0, behavior: 'instant' });
    return true;
  });
  swup.hooks.replace('scroll:anchor', (visit, { hash }) => scrollToAnchor(hash));
  swup.hooks.replace('content:scroll', visit => {
    const page = document.querySelector('#swup');
    if (restore) page.scrollTop = restore.top;
    else if (!visit.to.hash || !scrollToAnchor(visit.to.hash)) page.scrollTop = 0;
    restore = undefined;
  });
  swup.hooks.on('visit:end', () => {
    refreshTextReveals();
    document.querySelector('#swup').focus({ preventScroll: true });
    document.getElementById('route-status').textContent = document.title;
  });
  swup.hooks.on('visit:abort', () => {
    initHeader(document.querySelector('header'));
    initPage(document.querySelector('#swup'), false);
  });
  if (location.hash) scrollToAnchor(location.hash);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
else start();
