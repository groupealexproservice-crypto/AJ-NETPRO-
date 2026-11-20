// Coureurs construits avec les mêmes carrés que la grille de fenêtres de Benax Service.
export const GRIDS = {
  piste: ['....##.', '....##.', '...##.#', '..####.', '.###...', '..###..', '.#...#.', '#....#.'],
  route: ['...##..', '...##..', '..####.', '.#.##.#', '...##..', '..#.##.', '.#...#.', '#...##.'],
  trail: ['.....##', '.....##', '...###.', '..###.#', '..##.#.', '.#..##.', '#....#.', '###..###'],
};
const S = 22, G = 7;
export function pixelRunner(name, { className = '', title = '' } = {}) {
  const grid = GRIDS[name];
  const cols = grid[0].length, rows = grid.length;
  const w = cols * S + (cols - 1) * G, h = rows * S + (rows - 1) * G;
  let rects = '';
  grid.forEach((row, r) => [...row].forEach((c, i) => {
    if (c === '#') rects += `<rect x="${i * (S + G)}" y="${r * (S + G)}" width="${S}" height="${S}"/>`;
  }));
  return `<svg class="${className}" viewBox="0 0 ${w} ${h}" fill="currentColor" shape-rendering="crispEdges" role="img" aria-label="${title}"${title ? '' : ' aria-hidden="true"'}>${rects}</svg>`;
}
