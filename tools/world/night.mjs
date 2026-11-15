const MOON_RIM = '#5d5384';

export const NIGHT = {
  '#e8bb9a': '#3d3456', '#deae95': '#4b3f62', '#d6a38f': '#45395b', '#f6d6a6': '#6e5f8a', '#cf9585': '#7a4a5a',
  '#a3828c': '#352d4b', '#937482': '#2f2843', '#f8cf8e': MOON_RIM, '#a8574a': '#6b3a48',
  '#4b3d55': '#231e33', '#3f334a': '#1e1a2c', '#efb46c': '#5c4f7c',
  '#251f2c': '#14111c', '#1c1722': '#0f0d15', '#e9b066': '#4f4470', '#f2c27c': '#5a4a70', '#efbf78': '#4b3f62', '#d9a35e': '#3d3456',
  '#53405b': '#241f36', '#614b66': '#2a2440', '#523f58': '#221d33', '#ffd9a0': MOON_RIM, '#ffe7b0': MOON_RIM,
  '#fbf0dd': '#4c4466', '#fff8ea': '#625a84', '#f0c9a2': '#3a3453', '#f7e6cf': '#6a6080',
  '#f1c590': '#3a3352', '#e3a27f': '#2a2742', '#c98a7f': '#1f1d33', '#e8a57c': '#3d3456', '#fff3cf': '#e8dcc0', '#fff8e4': '#efe4c8',
  '#fff8e6': '#fbf6e8', '#fbe6b0': '#ece2c6', '#ffe2a6': '#e6dcc0',
  '#5a4656': '#2a2440', '#3b3242': '#7d6b8f', '#2c2433': '#55466b', '#6b5363': '#2a2440', '#4a3c4f': '#1a1626',
};

export function nightCss() {
  const rules = [];
  for (const [day, night] of Object.entries(NIGHT)) {
    const sel = (attr) => `.night .world [${attr}="${day}"]`;
    rules.push(`${sel('fill')}{fill:${night}}`, `${sel('stroke')}{stroke:${night}}`, `${sel('stop-color')}{stop-color:${night}}`);
  }
  return rules.join('\n');
}

const SKY_NIGHT = '<stop offset="0" stop-color="#141a33"/><stop offset=".5" stop-color="#2b2e52"/><stop offset=".8" stop-color="#4f4168"/><stop offset="1" stop-color="#3a3352"/>';
const PLATE_EXTRA = {
  '#fffaf0': '#fbf6e8', '#fbeccc': '#ece2c6', '#fff1d6': '#e6dcc0', '#fbd99a': '#ece2c6', '#ffd7a0': '#d9d0e8',
  '#e6b998': '#3d3456', '#e9b693': '#3d3456', '#e3cfc0': '#3d3456', '#e7b590': '#2a2742',
  '#d9c0b4': '#4b3f62', '#d0b6ab': '#45395b', '#9c8796': '#352d4b', '#8d7888': '#2f2843', '#f6dcaa': '#5d5384',
  '#6a5868': '#231e33', '#5c4b5b': '#1e1a2c', '#e4cdb7': '#3a3352', '#c9a69a': '#262541', '#fff6e6': '#e8dcc0',
  '#fbf4e8': '#4c4466', '#efd9c3': '#3a3453', '#fff': '#625a84', '#f4dfc6': '#6a6080', '#f6e7d3': '#6a6080', '#c2a09a': '#6a6080', '#c9aaa4': '#6a6080',
  '#8a6a5a': '#8d7a9c', '#6b5363': '#a596b8', '#b4893f': '#8d7a9c', '#e6ddd0': '#3d3456', '#8d7a74': '#6a6080',
  '#a8939a': '#4b3f62', '#d9cbbd': '#3a3352', '#6d5c5c': '#8d7a9c', '#8a6f60': '#a596b8', '#f2ebe1': '#231e33',
};

export function nightPlate(svg, count = 110) {
  const map = { ...NIGHT, ...PLATE_EXTRA };
  let out = svg.replace(/(<linearGradient id="[^"]*-sky"[^>]*>).*?(<\/linearGradient>)/, `$1${SKY_NIGHT}$2`);
  out = out.replace(/"(#[0-9a-fA-F]{3,6})"/g, (match, hex) => (map[hex.toLowerCase()] ? `"${map[hex.toLowerCase()]}"` : match));
  if (!count) return out;
  const stars = [];
  let seed = 9;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < count; i += 1) stars.push(`M${(rand() * 2400).toFixed(1)} ${(rand() * 260).toFixed(1)}h1.8v1.8h-1.8z`);
  return out.replace(/(<rect[^>]*url\(#[^)]*-sky\)"\/>)/, `$1<path d="${stars.join('')}" fill="#f1e6cf" opacity=".8"/>`);
}
