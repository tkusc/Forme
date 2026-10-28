import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve('dist');
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = resolve(root, '.' + pathname);
    if (!file.startsWith(root + sep) && file !== root) { res.writeHead(403).end(); return; }
    try { if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html'); }
    catch { /* Read below returns the prerendered 404 on missing routes. */ }
    let content;
    try { content = await readFile(file); }
    catch { res.statusCode = 404; file = resolve(root, '404.html'); content = await readFile(file); }
    res.setHeader('Content-Type', mime[extname(file)] || 'application/octet-stream');
    res.end(content);
  } catch { res.writeHead(500).end('Preview unavailable. Run npm run build first.'); }
});
server.listen(Number(process.env.PORT || 8765), '127.0.0.1', () => {
  console.log('Local: http://127.0.0.1:' + server.address().port);
});
