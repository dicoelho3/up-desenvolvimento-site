/**
 * Percurso (linha central) de cada fio a lápis, traçado à mão sobre a imagem em public/brand/pencil.
 * Serve de "máscara de desenho": o traço vai aparecendo ao longo deste percurso, como se fosse
 * desenhado no momento. Coordenadas no espaço da imagem (largura × altura).
 */
type Pt = [number, number];

export const pencilPaths: Record<string, { w: number; h: number; pts: Pt[] }> = {
  'pencil/fio-1': {
    w: 600,
    h: 804,
    pts: [
      [135, 45], [300, 25], [450, 12], [560, 5], [596, 25], [580, 60], [520, 95], [420, 145],
      [300, 205], [180, 260], [90, 300], [30, 340], [5, 375], [20, 400], [80, 410], [200, 418],
      [320, 422], [400, 430], [425, 450], [400, 475], [340, 515], [280, 555], [240, 585],
      [235, 615], [270, 640], [320, 660], [360, 690], [400, 730], [440, 775], [465, 802],
    ],
  },
  'pencil/fio-2': {
    w: 600,
    h: 761,
    pts: [
      [200, 5], [235, 0], [290, 30], [340, 90], [375, 170], [400, 240], [430, 288], [480, 314],
      [540, 322], [582, 309], [597, 290], [583, 275], [540, 280], [490, 300], [455, 335], [410, 420],
      [380, 490], [340, 550], [280, 585], [200, 585], [130, 560], [85, 510], [80, 460],
      [105, 447], [140, 470], [158, 530], [150, 600], [120, 650], [60, 700], [5, 758],
    ],
  },
  'pencil/fio-3': {
    w: 761,
    h: 600,
    pts: [
      [5, 400], [0, 350], [40, 280], [130, 230], [230, 200], [300, 160], [335, 100], [325, 30],
      [290, 5], [275, 30], [300, 90], [360, 150], [450, 195], [540, 240], [585, 310], [580, 400],
      [540, 480], [490, 520], [450, 505], [465, 460], [540, 440], [620, 460], [690, 520], [758, 597],
    ],
  },
};

/** Converte os pontos numa curva suave (Catmull-Rom → Bézier cúbica). */
export function smoothPath(pts: Pt[]): string {
  const p = (i: number) => pts[Math.max(0, Math.min(pts.length - 1, i))]!;
  let d = `M${pts[0]![0]},${pts[0]![1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = p(i - 1);
    const [x1, y1] = p(i);
    const [x2, y2] = p(i + 1);
    const [x3, y3] = p(i + 2);
    const c1 = [x1 + (x2 - x0) / 6, y1 + (y2 - y0) / 6];
    const c2 = [x2 - (x3 - x1) / 6, y2 - (y3 - y1) / 6];
    d += ` C${c1[0]!.toFixed(1)},${c1[1]!.toFixed(1)} ${c2[0]!.toFixed(1)},${c2[1]!.toFixed(1)} ${x2},${y2}`;
  }
  return d;
}
