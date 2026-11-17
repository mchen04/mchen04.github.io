import html, json, os, re, sys

import social

ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
TEMPLATE = 'projects/selfie-a-day/index.html'
ALT = 'Michael Chen, AI engineer in the Bay Area, beside an illustrated clock tower and city at golden hour.'


def share_tags(title, description, url):
    t = html.escape(title, quote=True)
    d = html.escape(description)
    return (f'<meta property="og:type" content="website">\n'
            f'<meta property="og:site_name" content="Michael Chen">\n'
            f'<meta property="og:url" content="{url}">\n'
            f'<meta property="og:title" content="{t}">\n'
            f'<meta property="og:description" content="{d}">\n'
            f'<meta property="og:image" content="https://michaelluochen.com/og.png?v=7">\n'
            f'<meta property="og:image:alt" content="{ALT}">\n'
            f'<meta property="og:image:width" content="1200">\n'
            f'<meta property="og:image:height" content="630">\n'
            f'<meta property="og:image:type" content="image/png">\n'
            f'<meta name="twitter:card" content="summary_large_image">\n'
            f'<meta name="twitter:title" content="{t}">\n'
            f'<meta name="twitter:description" content="{d}">\n'
            f'<meta name="twitter:image" content="https://michaelluochen.com/og.png?v=7">\n'
            f'<meta name="twitter:image:alt" content="{ALT}">')


def ensure_share(head, title, description, url):
    if 'og:image' in head:
        return head
    canon = f'<link rel="canonical" href="{url}">'
    return head.replace(canon, canon + '\n\n' + share_tags(title, description, url), 1)


def replace_work(head, work):
    def rule(match):
        if '"@type": "CreativeWork"' not in match.group(1):
            return match.group(0)
        return '<script type="application/ld+json">\n' + json.dumps(work, ensure_ascii=False) + '\n</script>'
    return re.sub(r'<script type="application/ld\+json">(.*?)</script>', rule, head, flags=re.S)


def make(slug, title, description, body_html, action=None):
    src = open(os.path.join(ROOT, TEMPLATE)).read()
    head, rest = src.split('</head>', 1)
    t = html.escape(title, quote=False)
    d = html.escape(description)
    head = re.sub(r'<title>.*?</title>', f'<title>{t} · Michael Chen</title>', head)
    head = re.sub(r'(<meta (?:name|property)="(?:description|og:description|twitter:description)" content=")[^"]*', lambda m: m.group(1) + d, head)
    head = re.sub(r'(<meta (?:property|name)="(?:og:title|twitter:title)" content=")[^"]*', lambda m: m.group(1) + html.escape(title), head)
    head = head.replace('/projects/selfie-a-day/', f'/projects/{slug}/')
    head = ensure_share(head, title, description, f'https://michaelluochen.com/projects/{slug}/')
    head = re.sub(r'"name":"Selfie a Day"', json.dumps(title).join(['"name":', '']), head)
    alt = f'An illustrated scene from Michael Chen’s portfolio, titled {title}.'
    head = re.sub(r'(<meta (?:property|name)="(?:og:image:alt|twitter:image:alt)" content=")[^"]*', lambda m: m.group(1) + html.escape(alt), head)
    head = re.sub(r'(<meta (?:property|name)="(?:og:image|twitter:image)" content="https://michaelluochen.com/images/social/)[^"?]*',
                  lambda m: m.group(1) + f'{slug}.jpg', head)
    work = {"@context": "https://schema.org", "@type": "CreativeWork",
            "@id": f"https://michaelluochen.com/projects/{slug}/#work", "name": title,
            "description": description, "url": f"https://michaelluochen.com/projects/{slug}/",
            "author": {"@type": "Person", "@id": "https://michaelluochen.com/#person",
                       "name": "Michael Chen", "url": "https://michaelluochen.com/about/"}}
    head = replace_work(head, work)
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
    social.render_page(os.path.join(path, 'index.html'))


if __name__ == '__main__':
    spec = json.load(open(sys.argv[1]))
    for page in spec:
        make(**page)
        print('wrote', page['slug'])
