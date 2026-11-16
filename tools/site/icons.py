import os
import struct
import subprocess
import tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SVG = os.path.join(ROOT, 'favicon.svg')


def render(size, rounded=True):
    source = SVG
    if not rounded:
        with open(SVG, encoding='utf-8') as handle:
            markup = handle.read().replace('rx="7"', 'rx="0"')
        with tempfile.NamedTemporaryFile('w', suffix='.svg', delete=False, encoding='utf-8') as handle:
            handle.write(markup)
            source = handle.name
    with tempfile.NamedTemporaryFile(suffix='.png', delete=False) as handle:
        path = handle.name
    subprocess.run(['rsvg-convert', '-w', str(size), '-h', str(size), source, '-o', path], check=True)
    with open(path, 'rb') as handle:
        data = handle.read()
    os.unlink(path)
    if source != SVG:
        os.unlink(source)
    return data


def main():
    sizes = [16, 32, 48]
    frames = [render(size) for size in sizes]
    header = struct.pack('<HHH', 0, 1, len(sizes))
    offset = 6 + 16 * len(sizes)
    entries = b''
    for size, data in zip(sizes, frames):
        entries += struct.pack('<BBBBHHII', size % 256, size % 256, 0, 0, 1, 32, len(data), offset)
        offset += len(data)
    with open(os.path.join(ROOT, 'favicon.ico'), 'wb') as handle:
        handle.write(header + entries + b''.join(frames))
    with open(os.path.join(ROOT, 'apple-touch-icon.png'), 'wb') as handle:
        handle.write(render(180, rounded=False))


if __name__ == '__main__':
    main()
