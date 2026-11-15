import html, json, os, re, sys

ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
TEMPLATE = 'projects/selfie-a-day/index.html'


def make(slug, title, description, body_html, action=None):
    src = open(os.path.join(ROOT, TEMPLATE)).read()
    head, rest = src.split('</head>', 1)
    t = html.escape(title, quote=False)
    d = html.escape(description)
    head = re.sub(r'<title>.*?</title>', f'<title>{t} · Michael Chen</title>', head)
    head = re.sub(r'(<meta (?:name|property)="(?:description|og:description|twitter:description)" content=")[^"]*', lambda m: m.group(1) + d, head)
    head = re.sub(r'(<meta (?:property|name)="(?:og:title|twitter:title)" content=")[^"]*', lambda m: m.group(1) + html.escape(title), head)
    head = head.replace('/projects/selfie-a-day/', f'/projects/{slug}/')
    head = re.sub(r'"name":"Selfie a Day"', json.dumps(title).join(['"name":', '']), head)
    cta = '' if not action else f'<p class="cta-row"><a class="cta" href="{html.escape(action["href"])}" rel="noopener">{html.escape(action["label"])}</a></p>'
    main = (f'<main id="top" tabindex="-1" class="page-case"><div class="page-head"><div class="shell"><nav class="crumbs" aria-label="Breadcrumb"><ol>'
            f'<li><a href="/">Home</a></li><li><a href="/projects/">Projects &amp; Fun</a></li><li><span aria-current="page">{t}</span></li></ol></nav>'
            f'<h1>{t}</h1></div></div><section class="shelf"><div class="shell"><div class="essay">{body_html}{cta}</div>'
            f'<p class="more"><a href="/projects/">Back to Projects &amp; Fun</a></p></div></section></main>')
    rest = re.sub(r'<main.*?</main>', lambda m: main, rest, flags=re.S)
    out = head + '</head>' + rest
    if 'Selfie a Day' in out or 'selfie-a-day' in out:
        raise SystemExit(f'{slug}: template text leaked')
    path = os.path.join(ROOT, 'projects', slug)
    os.makedirs(path, exist_ok=True)
    open(os.path.join(path, 'index.html'), 'w').write(out)


if __name__ == '__main__':
    spec = json.load(open(sys.argv[1]))
    for page in spec:
        make(**page)
        print('wrote', page['slug'])
