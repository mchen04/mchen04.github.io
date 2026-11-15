import glob
import html
import os
import re
import subprocess
import tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, 'images', 'social')
PAGES = [
    ('projects', 'projects/index.html'),
    ('pancake', 'projects/pancake/index.html'),
    ('michael-router', 'projects/michael-router/index.html'),
]


def shell():
    paths = glob.glob(os.path.expanduser('~/Library/Caches/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-mac-arm64/chrome-headless-shell'))
    if not paths:
        raise SystemExit('no headless shell found')
    return sorted(paths)[-1]


def title(path):
    source = open(os.path.join(ROOT, path), encoding='utf-8').read()
    return html.unescape(re.search(r'<title>(.*?)</title>', source).group(1)).split(' · Michael Chen')[0]


def card(title):
    font = 'file://' + os.path.join(ROOT, 'fonts', 'cormorant.woff2')
    plate = 'file://' + os.path.join(ROOT, 'world', 'market-still.svg')
    return f'''<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:Cormorant;src:url('{font}') format('woff2');font-weight:600}}
html,body{{margin:0;width:1200px;height:630px;overflow:hidden;background:#f6efe2}}
.card{{position:relative;width:1200px;height:630px;overflow:hidden;background:#f6efe2;color:#221c2a}}
.bg{{position:absolute;inset:0;background:url('{plate}') 0% center/cover no-repeat}}
.panel{{position:absolute;inset:0 auto 0 0;width:760px;background:#f6efe2}}
.copy{{position:absolute;left:80px;top:104px;width:600px}}
.kicker{{font:600 19px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#7d5b1c}}
h1{{font:600 82px/1.02 Cormorant,Georgia,serif;margin:24px 0 0;letter-spacing:-.01em}}
.rule{{width:68px;height:2px;background:#b4893f;margin-top:34px}}
.site{{position:absolute;left:80px;bottom:62px;font:500 22px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#6a5c54}}
</style></head><body><div class="card"><div class="bg"></div><div class="panel"></div><div class="copy"><div class="kicker">Michael Chen</div><h1>{html.escape(title)}</h1><div class="rule"></div></div><div class="site">michaelluochen.com</div></div></body></html>'''


def main():
    os.makedirs(OUT, exist_ok=True)
    for slug, page in PAGES:
        with tempfile.NamedTemporaryFile('w', suffix='.html', delete=False, encoding='utf-8') as handle:
            handle.write(card(title(page)))
            path = handle.name
        out = os.path.join(OUT, slug + '.png')
        subprocess.run([shell(), '--headless', '--disable-gpu', '--hide-scrollbars', '--window-size=1200,630', '--virtual-time-budget=3000', f'--screenshot={out}', 'file://' + path], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        os.unlink(path)
        print('wrote', os.path.relpath(out, ROOT))


if __name__ == '__main__':
    main()
