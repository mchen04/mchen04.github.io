import glob
import hashlib
import html
import os
import re
import subprocess
import tempfile

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, 'images', 'social')
SITE = 'https://michaelluochen.com'
MAX_BYTES = 80000
PAGE_SKIP = ('tools', 'features', 'node_modules', 'images', 'world', 'fonts', '.git', '.worktrees')

DISTRICTS = {
    'market': ('market-still.svg', 'Projects & Fun', 'market scene with striped stalls and kites', 600, 1.05, 361, 0),
    'works': ('works-still.svg', 'Work', 'workshop scene with a large gear and a train', 760, 1.05, 315, 0),
    'library': ('library-still.svg', 'Writing', 'domed hall with rooftops and a bridge', 700, 1.05, 317, 0),
    'observatory': ('observatory-still.svg', 'ML & Research', 'observatory scene with a brass telescope under a dome', 760, 1.2, 460, 72),
    'tower': ('tower-still.svg', 'About', 'clock tower scene', 760, 1.05, 395, 0),
    'unwritten': ('unwritten-still.svg', '404', 'unwritten corner with a signpost and a half-built house', 760, 1.05, 395, 0),
}
SECTIONS = {'work': 'works', 'ml': 'observatory', 'projects': 'market', 'writing': 'library', 'about': 'tower', 'resume': 'tower'}
LABELS = {'work': 'Work', 'ml': 'ML & Research', 'projects': 'Projects & Fun', 'writing': 'Writing', 'about': 'About', 'resume': 'Resume', '404': '404'}


def shell():
    paths = glob.glob(os.path.expanduser('~/Library/Caches/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-mac-arm64/chrome-headless-shell'))
    if not paths:
        raise SystemExit('no headless shell found')
    return sorted(paths)[-1]


def pages():
    found = []
    for base, dirs, files in os.walk(ROOT):
        dirs[:] = [d for d in dirs if d not in PAGE_SKIP]
        for name in files:
            if name == 'index.html':
                found.append(os.path.join(base, name))
    found.sort()
    return [p for p in found if os.path.relpath(p, ROOT) != 'index.html']


def page_title(src):
    raw = html.unescape(re.search(r'<title>(.*?)</title>', src, re.S).group(1))
    return raw.split(' · Michael Chen')[0].strip()


def page_description(src):
    match = re.search(r'<meta name="description" content="([^"]*)"', src)
    return match.group(1) if match else ''


def slug_for(rel):
    if rel.endswith('index.html'):
        return rel[:-len('index.html')].strip('/').split('/')[-1]
    return rel[:-len('.html')]


def page_info(rel, src):
    crumbs = re.search(r'<nav class="crumbs".*?</nav>', src, re.S)
    link = re.search(r'<a href="/(work|ml|projects|writing)/"', crumbs.group(0)) if crumbs else None
    key = link.group(1) if link else (rel.split('/')[0] if '/' in rel else ('404' if rel == '404.html' else None))
    if key == '404':
        return 'unwritten', '404'
    district = SECTIONS.get(key)
    if not district:
        return None, None
    return district, LABELS[key]


def nb_title(t):
    return re.sub(r'\S*\w-\w\S*', lambda m: '<span class="nb">' + m.group(0) + '</span>', html.escape(t))


def card_html(title, label, district):
    plate, _, scene, panel, scale, x0, y0 = DISTRICTS[district]
    font = 'file://' + os.path.join(ROOT, 'fonts', 'cormorant.woff2')
    art = 'file://' + os.path.join(ROOT, 'world', plate)
    size = 2400 * scale
    fs = 200
    kicker = html.escape(f'Michael Chen · {label}')
    return f'''<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:Cormorant;src:url('{font}') format('woff2');font-weight:600}}
html,body{{margin:0;width:1200px;height:630px;overflow:hidden;background:#f6efe2}}
.card{{position:relative;width:1200px;height:630px;overflow:hidden;background:#f6efe2;color:#221c2a}}
.bg{{position:absolute;inset:0;background:url('{art}') {-x0}px {-y0}px / {size}px auto no-repeat}}
.panel{{position:absolute;inset:0 auto 0 0;width:{panel}px;background:#f6efe2}}
.copy{{position:absolute;left:80px;top:72px;width:{panel - 124}px}}
.kicker{{font:700 23px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;letter-spacing:.1em;white-space:nowrap;text-transform:uppercase;color:#6b4a14}}
h1{{font:600 {fs}px/1 Cormorant,Georgia,serif;margin:22px 0 0;letter-spacing:-.01em}}h1 .nb{{white-space:nowrap}}h1.free .nb{{white-space:normal}}
.rule{{width:68px;height:3px;background:#b4893f;margin-top:28px}}
.site{{position:absolute;left:80px;bottom:52px;font:600 25px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#4f4540}}
</style></head><body><div class="card"><div class="bg"></div><div class="panel"></div><div class="copy"><div class="kicker">{kicker}</div><h1>{nb_title(title)}</h1><div class="rule"></div></div><div class="site">michaelluochen.com</div></div><script>document.fonts.ready.then(()=>{{const h=document.querySelector('h1');const s=document.querySelector('.site');let z=parseFloat(getComputedStyle(h).fontSize);const w=()=>{{const r=document.createRange();r.selectNodeContents(h);let m=0;for(const q of r.getClientRects())m=Math.max(m,q.width);return m;}};const fit=()=>{{let z=200;h.style.fontSize=z+'px';while(z>40&&(w()>h.clientWidth||h.getBoundingClientRect().bottom>s.getBoundingClientRect().top-62)){{z-=2;h.style.fontSize=z+'px';}}return z;}};const keep=fit();z=keep;if(h.querySelector('.nb')){{h.classList.add('free');const free=fit();if(keep<free*0.9){{z=free;}}else{{h.classList.remove('free');z=fit();}}}}const lines=()=>{{const r=document.createRange();r.selectNodeContents(h);return new Set([...r.getClientRects()].map(q=>Math.round(q.top))).size;}};const L=lines();if(L>1){{let y=z;while(y>40&&lines()>=L){{y-=2;h.style.fontSize=y+'px';}}if(y>=z*0.88){{z=y;}}else{{h.style.fontSize=z+'px';}}}}h.dataset.fs=z;h.dataset.wide=w().toFixed(1);h.dataset.copy=h.clientWidth;}});</script></body></html>'''


def render_card(title, label, district):
    markup = card_html(title, label, district)
    with tempfile.NamedTemporaryFile('w', suffix='.html', delete=False, encoding='utf-8') as handle:
        handle.write(markup)
        path = handle.name
    with tempfile.NamedTemporaryFile(suffix='.png', delete=False) as handle:
        png = handle.name
    res = subprocess.run([shell(), '--headless', '--disable-gpu', '--hide-scrollbars', '--window-size=1200,630', '--virtual-time-budget=3000', f'--screenshot={png}', '--dump-dom', 'file://' + path], check=True, capture_output=True, text=True)
    m = re.search(r'data-fs="([0-9.]+)" data-wide="([0-9.]+)" data-copy="([0-9.]+)"', res.stdout)
    fs, wide, copy = float(m.group(1)), float(m.group(2)), float(m.group(3))
    os.unlink(path)
    with open(png, 'rb') as handle:
        data = handle.read()
    if len(data) <= MAX_BYTES:
        os.unlink(png)
        return data, 'png', fs, wide, copy
    for quality in (92, 86, 80, 74):
        with tempfile.NamedTemporaryFile(suffix='.jpg', delete=False) as handle:
            jpg = handle.name
        Image.open(png).convert('RGB').save(jpg, 'JPEG', quality=quality, optimize=True)
        with open(jpg, 'rb') as handle:
            data = handle.read()
        os.unlink(jpg)
        if len(data) <= MAX_BYTES:
            break
    os.unlink(png)
    return data, 'jpg', fs, wide, copy


def set_meta(src, key, value):
    pattern = re.compile(r'<meta\b[^>]*>')
    out = []
    last = 0
    for match in pattern.finditer(src):
        tag = match.group(0)
        if re.search(r'\b(?:property|name)="' + re.escape(key) + r'"', tag):
            new = re.sub(r'content="[^"]*"', 'content="' + value + '"', tag, count=1)
            out.append(src[last:match.start()])
            out.append(new)
            last = match.end()
    out.append(src[last:])
    return ''.join(out)


def add_share(src, title, description, url, image, alt, kind):
    tags = (f'<meta property="og:type" content="website">\n'
            f'<meta property="og:site_name" content="Michael Chen">\n'
            f'<meta property="og:url" content="{url}">\n'
            f'<meta property="og:title" content="{title}">\n'
            f'<meta property="og:description" content="{description}">\n'
            f'<meta property="og:image" content="{image}">\n'
            f'<meta property="og:image:alt" content="{alt}">\n'
            f'<meta property="og:image:width" content="1200">\n'
            f'<meta property="og:image:height" content="630">\n'
            f'<meta property="og:image:type" content="' + ('image/jpeg' if kind == 'jpg' else 'image/png') + '">\n'
            f'<meta name="twitter:card" content="summary_large_image">\n'
            f'<meta name="twitter:title" content="{title}">\n'
            f'<meta name="twitter:description" content="{description}">\n'
            f'<meta name="twitter:image" content="{image}">\n'
            f'<meta name="twitter:image:alt" content="{alt}">')
    match = re.search(r'<meta name="description"[^>]*>\n?', src)
    if match:
        return src[:match.end()] + tags + '\n' + src[match.end():]
    match = re.search(r'<title>.*?</title>\n?', src, re.S)
    return src[:match.end()] + tags + '\n' + src[match.end():]


def render_page(path):
    rel = os.path.relpath(path, ROOT).replace(os.sep, '/')
    if rel == 'index.html':
        return None
    src = open(path, encoding='utf-8').read()
    district, label = page_info(rel, src)
    if not district:
        return None
    title = page_title(src)
    slug = slug_for(rel)
    data, kind, fs, wide, copy = render_card(title, label, district)
    print(f'{slug} {fs:g} wide {wide} copy {copy:g}', 'ok' if wide <= copy else 'OVER')
    ext = 'png' if kind == 'png' else 'jpg'
    filename = f'{slug}.{ext}'
    with open(os.path.join(OUT, filename), 'wb') as handle:
        handle.write(data)
    digest = hashlib.sha256(data).hexdigest()[:10]
    image = f'{SITE}/images/social/{filename}?v={digest}'
    scene = DISTRICTS[district][2]
    suffix = '' if title.rstrip()[-1:] in '.!?' else '.'
    alt = html.escape(f'An illustrated {scene} from Michael Chen’s portfolio, titled {title}{suffix}', quote=True)
    if 'og:image' not in src:
        full = html.escape(re.search(r'<title>(.*?)</title>', src, re.S).group(1))
        desc = page_description(src)
        src = add_share(src, full, desc, f'{SITE}/{rel}', image, alt, kind)
    values = {'og:image': image, 'twitter:image': image, 'og:image:alt': alt, 'twitter:image:alt': alt, 'og:image:type': 'image/jpeg' if kind == 'jpg' else 'image/png', 'og:image:width': '1200', 'og:image:height': '630'}
    for key, value in values.items():
        src = set_meta(src, key, value)
    with open(path, 'w', encoding='utf-8') as handle:
        handle.write(src)
    return filename, len(data)


def main():
    os.makedirs(OUT, exist_ok=True)
    keep = set()
    sizes = []
    for path in pages():
        result = render_page(path)
        if not result:
            continue
        filename, size = result
        keep.add(filename)
        sizes.append(size)
        print('wrote', filename, size)
    for name in sorted(os.listdir(OUT)):
        if name.endswith(('.png', '.jpg')) and name not in keep:
            os.unlink(os.path.join(OUT, name))
            print('removed', name)
    print('cards', len(sizes), 'bytes', sum(sizes), 'max', max(sizes) if sizes else 0)


if __name__ == '__main__':
    main()
