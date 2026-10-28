import { readFileSync } from 'node:fs';
import vm from 'node:vm';

// Run the same data and view functions used for local filtering, without a browser.
export function createRenderer() {
  const context = vm.createContext({});
  for (const file of ['assets/data.js', 'assets/views.js']) {
    vm.runInContext(readFileSync(new URL('../' + file, import.meta.url), 'utf8'), context, { filename: file });
  }
  const { Forme, DEPTS, OBJECTS, STORIES, DESIGNERS } = context;
  const routes = ['home', ...DEPTS.map(d => 'collection:' + d.id),
    ...OBJECTS.map(o => 'object:' + o.slug), 'stories', ...STORIES.map(s => 'story:' + s.slug),
    'designers', ...DESIGNERS.filter(d => d.page).map(d => 'designer:' + d.id),
    'about', 'page:imprint', 'page:privacy', 'page:credits'];
  function render(route) {
    Object.assign(Forme.state, { route, dept: 'lighting', type: null, view: 'grid', shown: 8, sel: {}, faqOpen: 0 });
    const [kind, id] = route.split(':');
    const html = (Forme.views[kind] || Forme.views.notfound)(id);
    const title = Forme.titleFor([kind, id]);
    const active = ({ collection: 'collection:' + Forme.state.dept, object: 'collection:' + Forme.state.dept,
      stories: 'stories', story: 'stories', designers: 'designers', designer: 'designers', about: 'about' })[kind];
    return { route, html, title: (title ? title + ' · ' : '') + 'formé', active,
      dept: Forme.state.dept, home: kind === 'home', path: Forme.pathFor(route) };
  }
  return { routes, render };
}

export function renderDocument(template, page) {
  let html = template.replace('<!-- PAGE -->', page.html)
    .replaceAll('{{route}}', page.route).replaceAll('{{dept}}', page.dept)
    .replaceAll('{{home}}', page.home ? ' home-page' : '')
    .replace('<title>formé</title>', '<title>' + page.title.replaceAll('&', '&amp;').replaceAll('<', '&lt;') + '</title>');
  if (page.active) html = html.replace(/<header\b[\s\S]*?<\/header>/, header =>
    header.replace(/(<a href="[^"]+" data-go="([^"]+)")/g,
      (all, tag, route) => route === page.active ? tag + ' aria-current="page"' : all));
  return html;
}
