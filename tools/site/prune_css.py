import re
import subprocess
import sys
import glob

CSS = 'portfolio.css'
css = open(CSS).read()
html = ' '.join(open(f).read() for f in subprocess.check_output(['git', 'ls-files', '*.html']).decode().split())
code = open('portfolio.js').read() + ''.join(open(f'tools/world/{f}').read() for f in ('hero.mjs', 'kit.mjs', 'plates.mjs', 'night.mjs'))
helpers = ''.join(open(f).read() for f in glob.glob('tools/site/*.py'))
known = set()
for attr in re.findall(r'class=\\?"([^"\\]*)', html + code + helpers):
    known.update(re.findall(r'[A-Za-z][\w-]*', re.sub(r'\$\{[^}]*\}', '', attr)))
for literal in re.findall(r"'([^'\n]*)'|`([^`]*)`", code):
    known.update(re.findall(r'[A-Za-z][\w-]*', ''.join(literal)))
known.update({'js', 'night', 'nav-open', 'parallax', 'blueprint', 'is-blueprint', 'is-swapping', 'has-dropcap', 'dropcap', 'sep', 'pin', 'also', 'read-on', 'prev', 'next', 'time-toggle', 'to-day', 'to-night'})
known.update(f'c{i}' for i in range(1, 10))


def used(selector):
    for cls in re.findall(r'\.([a-zA-Z][\w-]*)', re.sub(r'url\([^)]*\)|:not\([^)]*\)', '', selector)):
        if cls not in known:
            return False
    return True


def prune(block):
    def rule(match):
        selectors = [s for s in match.group(1).split(',') if s.strip()]
        keep = [s for s in selectors if used(s)]
        if not keep:
            return ''
        return ','.join(keep) + '{' + match.group(2) + '}'
    return re.sub(r'([^{}@/][^{}]*?)\{([^{}]*)\}', rule, block)


out = prune(css)
removed = len(css) - len(out)
if '--check' in sys.argv:
    print('unused CSS bytes:', removed)
    sys.exit(1 if removed else 0)
open(CSS, 'w').write(out)
print('removed', removed, 'bytes of unused CSS')
