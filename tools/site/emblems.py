import re

ICONS = {
    'Zerg and ZTC': 'M24 13l2.2 3.8 4.3-1.1.7 4.4 4.2 1.6-1.6 4.2L36 27l-3.2 2.9 1.6 4.2-4.2 1.6-.7 4.4-4.3-1.1L24 43l-2.2-3.8-4.3 1.1-.7-4.4-4.2-1.6 1.6-4.2L13 27l3.2-2.9-1.6-4.2 4.2-1.6.7-4.4 4.3 1.1zM24 22.5a5 5 0 1 0 0 10 5 5 0 0 0 0-10z',
    'Zerg Bot': 'M15 20h18a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H15a3 3 0 0 1-3-3V23a3 3 0 0 1 3-3zM24 20v-5M24 13a2 2 0 1 0 0 .1M19 27.5h.1M29 27.5h.1M19.5 32h9M12 26h-3M36 26h3',
    'ZergBox agent filesystem': 'M11 22h26v14H11zM11 22c0-5 5-8 13-8s13 3 13 8M11 22h26M21 26h6v5h-6zM24 28.5v1M15 22v14M33 22v14',
    'ZergRouter': 'M24 12v26M18 38h12M24 15h11l3 3-3 3H24M24 24H13l-3 3 3 3h11',
    'Zergstack': 'M14 38V14M14 14h22M14 19l5-5M36 14v8M33 22h6v4h-6zM10 38h20M18 38v-9h8v9',
    'Multi-agent simulation engine': 'M24 13a11 11 0 1 0 0 22 11 11 0 0 0 0-22zM13 24h22M24 13c-4 3-5 7-5 11s1 8 5 11c4-3 5-7 5-11s-1-8-5-11zM9 30c6 4 24 4 30-6',
    'ZergChat': 'M12 14h18v11H19l-5 4v-4h-2zM20 29v3h11l5 4v-4h2V21h-6M16 19h10M16 22h7',
    'Zergboard': 'M13 16h12v18H13zM19 13h12v18M25 10h12v18h-6M16 21h6M16 25h6M16 29h4',
    'Forward-deployed engineering': 'M24 11a13 13 0 1 0 0 26 13 13 0 0 0 0-26zM24 15l3 9-3 9-3-9zM24 11v3M24 34v3M11 24h3M34 24h3',
    'MOBIVOLT': 'M14 15h20v20H14zM18 12v3M30 12v3M26 18l-6 8h5l-2 6 6-8h-5z',
    'AI at UCR': 'M24 16c-4-3-9-3-13-1v18c4-2 9-2 13 1 4-3 9-3 13-1V15c-4-2-9-2-13 1zM24 16v18M15 21h5M15 25h5M28 21h5M28 25h5',
}


def medallion(path):
    return ('<span class="emblem" aria-hidden="true"><svg viewBox="0 0 48 48" focusable="false">'
            '<circle class="em-ring" cx="24" cy="24" r="22.5"/><circle class="em-dash" cx="24" cy="24" r="19"/>'
            f'<path class="em-icon" d="{path}"/></svg></span>')


html = open('work/index.html').read()
count = 0
for title, path in ICONS.items():
    pattern = re.compile(r'(<li><article class="work">\n(?:(?!</article>).)*?<h3>(?:<a [^>]*>)?' + re.escape(title) + r'[ ]?(?:</a>)?</h3>)', re.S)
    match = pattern.search(html)
    if not match:
        raise SystemExit(f'no entry for {title}')
    block_end = html.index('</article>', match.start())
    block = html[match.start():block_end]
    if 'class="emblem"' in block:
        continue
    html = html[:block_end] + medallion(path) + html[block_end:]
    count += 1
open('work/index.html', 'w').write(html)
print(count, 'emblems added')
