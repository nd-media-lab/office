// Pixel-art portraits: 16x16 busts composed from layers (skin, hair, shirt, accessories), drawn as inline SVG.
const SPRITE_SKINS = { pale: '#f6d9c0', light: '#f1c7a1', tan: '#d9a066', brown: '#a8693f', dark: '#6f4328' };

// agent -> look. fem:true adds lashes, lipstick and blush (long hair / bun, earrings, never glasses or a beard).
// hair styles: short | long | bun | ponytail | bald. acc kinds: hardhat cap headband visor headset headphones
// glasses sunglasses tie earrings badge
const AGENT_LOOKS = {
  theo:   { skin: 'light', hair: '#5b3a1e', style: 'short', shirt: '#2f6fdc', beard: '#5b3a1e', acc: [['badge', '#f1c40f']] },
  ivy:    { fem: true, skin: 'pale', hair: '#7b2d26', style: 'long', shirt: '#16a085', acc: [['earrings', '#f1c40f']] },
  vera:   { fem: true, skin: 'tan', hair: '#1a1a1a', style: 'bun', shirt: '#8e44ad', acc: [['earrings', '#ecf0f1'], ['badge', '#f1c40f']] },
  marcus: { skin: 'dark', hair: '#111111', style: 'short', shirt: '#34495e', beard: '#111111', acc: [['tie', '#c0392b']] },
  nina:   { fem: true, skin: 'light', hair: '#e67e22', style: 'ponytail', shirt: '#e84393', acc: [['headband', '#00cec9']] },
  pia:    { fem: true, skin: 'brown', hair: '#2c1810', style: 'long', shirt: '#d63031', acc: [['headphones', '#2d3436']] },
  kai:    { skin: 'tan', hair: '#2d3436', style: 'short', shirt: '#6c5ce7', acc: [['cap', '#00b894']] },
  otto:   { skin: 'pale', hair: '#bdc3c7', style: 'short', shirt: '#b2bec3', beard: '#bdc3c7', acc: [['badge', '#0984e3']] },
  lena:   { fem: true, skin: 'light', hair: '#f1c40f', style: 'long', shirt: '#fd79a8', acc: [['earrings', '#e84393']] },
  leo:    { skin: 'light', hair: '#c0392b', style: 'short', shirt: '#27ae60', acc: [['headset', '#2c3e50']] },
  hana:   { fem: true, skin: 'tan', hair: '#2d3436', style: 'bun', shirt: '#0984e3', acc: [['earrings', '#00cec9'], ['badge', '#ffffff']] },
  marco:  { skin: 'tan', hair: '#3b2a1a', style: 'short', shirt: '#f0b429', acc: [['hardhat', '#e17055'], ['headset', '#2c3e50']] },
  ravi:   { skin: 'brown', hair: '#111111', style: 'short', shirt: '#2980b9', beard: '#111111', acc: [['headphones', '#e74c3c']] },
  quinn:  { fem: true, skin: 'pale', hair: '#6c3483', style: 'long', shirt: '#1abc9c', acc: [['headband', '#f1c40f'], ['earrings', '#ecf0f1']] },
  sam:    { skin: 'dark', hair: '#000000', style: 'bald', shirt: '#e67e22', acc: [['hardhat', '#f1c40f'], ['badge', '#ffffff']] },
  boss:   { skin: 'light', hair: '#3b2a1a', style: 'short', shirt: '#2d3436', acc: [['sunglasses', '#111111'], ['tie', '#c0392b']] },
};

function _grid() { return Array.from({ length: 16 }, () => Array(16).fill(null)); }
function _px(g, x, y, c) { if (x >= 0 && x < 16 && y >= 0 && y < 16) g[y][x] = c; }
function _rect(g, x0, y0, x1, y1, c) { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) _px(g, x, y, c); }

function buildSprite(agent) {
  const look = AGENT_LOOKS[agent] || { skin: 'light', hair: '#555555', style: 'short', shirt: '#7f8c8d', acc: [] };
  const skin = SPRITE_SKINS[look.skin] || SPRITE_SKINS.light;
  const g = _grid();
  _rect(g, 2, 13, 13, 15, look.shirt); _rect(g, 3, 12, 12, 12, look.shirt);
  _rect(g, 6, 11, 9, 12, skin); _rect(g, 4, 4, 11, 10, skin); _rect(g, 5, 3, 10, 3, skin); _rect(g, 5, 11, 10, 11, skin);
  _px(g, 3, 7, skin); _px(g, 12, 7, skin);
  _px(g, 6, 7, '#1b1b1b'); _px(g, 9, 7, '#1b1b1b');
  _px(g, 7, 9, '#7a3b2e'); _px(g, 8, 9, '#7a3b2e');
  if (look.fem) {
    _px(g, 5, 6, '#1b1b1b'); _px(g, 10, 6, '#1b1b1b');
    _px(g, 7, 9, '#d6336c'); _px(g, 8, 9, '#d6336c');
    _px(g, 5, 8, '#f3a6b8'); _px(g, 10, 8, '#f3a6b8');
  }
  if (look.beard) { _rect(g, 5, 10, 10, 11, look.beard); _px(g, 4, 9, look.beard); _px(g, 11, 9, look.beard); _px(g, 7, 9, '#7a3b2e'); _px(g, 8, 9, '#7a3b2e'); }
  const h = look.hair;
  if (look.style !== 'bald') {
    _rect(g, 4, 2, 11, 3, h); _rect(g, 4, 4, 5, 4, h); _rect(g, 10, 4, 11, 4, h);
    if (look.style === 'long') { _rect(g, 3, 4, 3, 10, h); _rect(g, 12, 4, 12, 10, h); }
    if (look.style === 'bun') { _rect(g, 6, 0, 9, 1, h); }
    if (look.style === 'ponytail') { _rect(g, 12, 5, 13, 9, h); }
  } else { _rect(g, 5, 3, 10, 3, '#e9c9a6'); }
  for (const [kind, c] of look.acc) {
    switch (kind) {
      case 'hardhat': _rect(g, 4, 1, 11, 3, c); _rect(g, 2, 3, 13, 3, c); _px(g, 6, 1, '#ffffff'); break;
      case 'cap': _rect(g, 4, 1, 11, 3, c); _rect(g, 1, 4, 6, 4, c); break;
      case 'headband': _rect(g, 4, 4, 11, 4, c); break;
      case 'visor': _rect(g, 4, 5, 11, 5, c); break;
      case 'headset': _rect(g, 4, 2, 11, 2, c); _rect(g, 3, 3, 3, 8, c); _rect(g, 12, 3, 12, 8, c);
        _rect(g, 2, 6, 2, 8, '#566573'); _rect(g, 13, 6, 13, 8, '#566573'); _px(g, 3, 9, c); _px(g, 4, 10, c); _px(g, 5, 10, c); break;
      case 'headphones': _rect(g, 4, 2, 11, 2, c); _rect(g, 3, 3, 3, 8, c); _rect(g, 12, 3, 12, 8, c);
        _rect(g, 2, 6, 2, 8, '#2c3e50'); _rect(g, 13, 6, 13, 8, '#2c3e50'); break;
      case 'glasses': _rect(g, 5, 6, 7, 6, c); _rect(g, 5, 8, 7, 8, c); _px(g, 5, 7, c); _px(g, 7, 7, c);
        _rect(g, 8, 6, 10, 6, c); _rect(g, 8, 8, 10, 8, c); _px(g, 8, 7, c); _px(g, 10, 7, c); break;
      case 'sunglasses': _rect(g, 4, 6, 11, 7, c); break;
      case 'tie': _rect(g, 7, 12, 8, 15, c); _px(g, 6, 12, '#ecf0f1'); _px(g, 9, 12, '#ecf0f1'); break;
      case 'earrings': _px(g, 3, 9, c); _px(g, 12, 9, c); break;
      case 'badge': _px(g, 11, 13, c); _px(g, 11, 14, c); break;
    }
  }
  _rect(g, 2, 15, 13, 15, 'rgba(0,0,0,0.18)');
  return g;
}

function renderSprite(agent) {
  const g = buildSprite(agent);
  let rects = '';
  for (let y = 0; y < 16; y++) {
    let x = 0;
    while (x < 16) {
      const c = g[y][x];
      if (!c) { x++; continue; }
      let x2 = x;
      while (x2 + 1 < 16 && g[y][x2 + 1] === c) x2++;
      rects += '<rect x="' + x + '" y="' + y + '" width="' + (x2 - x + 1) + '" height="1" fill="' + c + '"/>';
      x = x2 + 1;
    }
  }
  return '<svg viewBox="0 0 16 16" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' + rects + '</svg>';
}

if (typeof module !== 'undefined' && module.exports) module.exports = { AGENT_LOOKS, buildSprite, renderSprite };
