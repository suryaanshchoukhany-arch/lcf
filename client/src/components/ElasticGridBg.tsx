import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────
   Canvas-based Elastic Typographic Grid
   ─────────────────────────────────────────────────────────────
   High-performance implementation using HTML Canvas + spring
   physics. Zero React re-renders on mouse move — everything
   runs inside a single requestAnimationFrame loop.

   Supports two modes:
   • lines mode: each line is a separate row with its own cols
     e.g. lines={['13TH','EDITION']}  →  row 1: 4 cols, row 2: 7 cols
   • repeat mode: fills a uniform NxM grid repeating a text string
     e.g. text="LCFMAYO" spacing={95}
   ────────────────────────────────────────────────────────────── */

interface ElasticGridBgProps {
  /** Array of text lines — each line becomes a row with columns = line.length */
  lines?: string[];
  /** Single text string (fills uniform grid repeating characters) */
  text?: string;
  /** Number of columns for uniform grid */
  cols?: number;
  /** Number of rows for uniform grid */
  rows?: number;
  /** Cell spacing in px for auto-sizing */
  spacing?: number;
  /** Expansion factor for hovered cell (default: 3.5) */
  expansion?: number;
  /** Spring stiffness — higher = snappier (default: 0.15) */
  stiffness?: number;
  /** Spring damping — lower = more overshoot (default: 0.65) */
  damping?: number;
  /** Text fill color (default: '#2563EB') */
  fillColor?: string;
  /** Font family (default: 'Syne, system-ui, sans-serif') */
  fontFamily?: string;
  /** Gap between cells in pixels (default: 3) */
  gap?: number;
  /** Randomize rest positions slightly for organic feel (default: true) */
  randomizeDisruption?: boolean;
  /** Extra CSS classes */
  className?: string;
  // Legacy API compat — accepted but unused in canvas renderer
  gridLines?: boolean;
  nodes?: boolean;
  textColor?: string;
  hoverTextColor?: string;
  crosshairTextColor?: string;
  gridLinesClass?: string;
  nodeStyle?: string;
  nodeColor?: string;
  activeNodeColor?: string;
  mode?: string;
  overshoot?: number;
  duration?: number;
}

/** Spring divider: position with velocity-based animation */
interface Spring {
  pos: number;
  vel: number;
  target: number;
  rest: number;
}

export default function ElasticGridBg({
  lines,
  text = '13THEDITION',
  cols: presetCols,
  rows: presetRows,
  spacing,
  expansion = 3.5,
  stiffness = 0.15,
  damping = 0.65,
  fillColor = '#2563EB',
  fontFamily = 'Syne, system-ui, sans-serif',
  gap = 3,
  randomizeDisruption = true,
  className = '',
}: ElasticGridBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const ctxEl = canvasEl.getContext('2d', { alpha: true });
    if (!ctxEl) return;

    // Non-null aliases used by closures below
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = ctxEl;

    // ── All mutable state lives in this closure (no React state) ──
    let width = 0;
    let height = 0;
    let rectLeft = 0;
    let rectTop = 0;
    let dpr = 1;
    let gridLines_: string[] = [];
    let rowSprings: Spring[] = [];
    let colSprings: Spring[][] = [];
    let mouseX = -1;
    let mouseY = -1;
    let mouseActive = false;
    let ambientTime = Math.random() * 100;
    const REF_FONT_SIZE = 300;
    const charMetrics = new Map<string, { w: number; a: number; d: number }>();

    // ── Build grid structure from props ──
    function buildGrid() {
      if (lines && lines.length > 0) {
        gridLines_ = lines.map((l) => l.toUpperCase());
      } else {
        const clean = text.replace(/\s+/g, '').toUpperCase();
        const nCols =
          presetCols ||
          (spacing && width > 0
            ? Math.max(3, Math.floor(width / spacing))
            : Math.ceil(clean.length / 2));
        const nRows =
          presetRows ||
          (spacing && height > 0
            ? Math.max(2, Math.floor(height / spacing))
            : 2);
        gridLines_ = [];
        for (let r = 0; r < nRows; r++) {
          let row = '';
          for (let c = 0; c < nCols; c++) {
            row += clean[(r * nCols + c) % clean.length];
          }
          gridLines_.push(row);
        }
      }

      const nRows = gridLines_.length;

      // Row springs: nRows+1 dividers spanning [0..1]
      rowSprings = [];
      for (let i = 0; i <= nRows; i++) {
        const rest = i / nRows;
        rowSprings.push({ pos: rest, vel: 0, target: rest, rest });
      }

      // Column springs: per row, nCols+1 dividers spanning [0..1]
      colSprings = gridLines_.map((line) => {
        const n = line.length;
        const springs: Spring[] = [];
        for (let i = 0; i <= n; i++) {
          let rest = i / n;
          // Slight randomization for organic feel (inner dividers only)
          if (randomizeDisruption && i > 0 && i < n) {
            rest += (Math.random() - 0.5) * (0.12 / n);
          }
          springs.push({ pos: rest, vel: 0, target: rest, rest });
        }
        return springs;
      });

      charMetrics.clear();
    }

    // ── Resize handler ──
    function resize() {
      const rect = canvas.getBoundingClientRect();
      rectLeft = rect.left;
      rectTop = rect.top;
      dpr = window.devicePixelRatio || 1;
      const newW = rect.width;
      const newH = rect.height;
      if (newW === width && newH === height) return;
      width = newW;
      height = newH;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      // Rebuild if spacing-based (dimensions affect grid structure)
      if (spacing) buildGrid();
    }

    // ── Measure a character (cached) ──
    function measureChar(char: string) {
      let m = charMetrics.get(char);
      if (m) return m;
      ctx.save();
      ctx.font = `900 ${REF_FONT_SIZE}px ${fontFamily}`;
      const tm = ctx.measureText(char);
      m = {
        w: tm.width || REF_FONT_SIZE * 0.6,
        a: tm.actualBoundingBoxAscent ?? REF_FONT_SIZE * 0.72,
        d: tm.actualBoundingBoxDescent ?? REF_FONT_SIZE * 0.08,
      };
      ctx.restore();
      charMetrics.set(char, m);
      return m;
    }

    // ── Set expansion targets on a divider array ──
    function setTargets(springs: Spring[], idx: number, exp: number) {
      const n = springs.length - 1; // number of cells
      if (n <= 0) return;
      if (idx < 0 || idx >= n) {
        // Return to rest positions
        for (const s of springs) s.target = s.rest;
        return;
      }
      // Expanded cell gets `exp` weight, others get 1
      const totalWeight = n - 1 + exp;
      let cum = 0;
      for (let i = 0; i <= n; i++) {
        springs[i].target = cum;
        if (i < n) cum += (i === idx ? exp : 1) / totalWeight;
      }
      springs[n].target = 1;
    }

    // ── Update a single spring (returns true if still moving) ──
    function updateSpring(s: Spring): boolean {
      const force = (s.target - s.pos) * stiffness;
      s.vel = (s.vel + force) * damping;
      s.pos += s.vel;
      return Math.abs(s.vel) > 0.00005 || Math.abs(s.target - s.pos) > 0.0001;
    }

    // ── Mouse & touch handlers ──
    function onMove(cx: number, cy: number) {
      mouseX = cx - rectLeft;
      mouseY = cy - rectTop;
      mouseActive =
        mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
    }
    const onMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length) onMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onLeave = () => {
      mouseActive = false;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onLeave, { passive: true });

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Initial setup
    resize();
    buildGrid();

    // Re-measure characters when fonts finish loading
    document.fonts.ready.then(() => charMetrics.clear());

    // ── Animation loop ──
    function frame() {
      rafRef.current = requestAnimationFrame(frame);
      if (!width || !height || !gridLines_.length) return;

      const nRows = gridLines_.length;
      const nx = mouseX / width; // normalized mouse X [0..1]
      const ny = mouseY / height; // normalized mouse Y [0..1]

      // ─── Determine targets ───
      if (mouseActive) {
        // Find which row the mouse is over
        let hRow = -1;
        for (let r = 0; r < nRows; r++) {
          if (ny >= rowSprings[r].pos && ny < rowSprings[r + 1].pos) {
            hRow = r;
            break;
          }
        }
        setTargets(rowSprings, hRow, expansion);

        // Find which column in each row the mouse X falls into
        for (let r = 0; r < nRows; r++) {
          const cs = colSprings[r];
          const numCols = gridLines_[r].length;
          let hCol = -1;
          for (let c = 0; c < numCols; c++) {
            if (nx >= cs[c].pos && nx < cs[c + 1].pos) {
              hCol = c;
              break;
            }
          }
          // Hovered row gets full expansion, other rows get partial
          setTargets(cs, hCol, r === hRow ? expansion : expansion * 0.5);
        }
      } else {
        // Ambient breathing — virtual cursor drifts in a Lissajous pattern
        ambientTime += 0.005;
        const ax = 0.5 + Math.sin(ambientTime * 0.7) * 0.3;
        const ay = 0.5 + Math.cos(ambientTime * 0.5) * 0.25;

        let aRow = -1;
        for (let r = 0; r < nRows; r++) {
          if (ay >= rowSprings[r].rest && ay < rowSprings[r + 1].rest) {
            aRow = r;
            break;
          }
        }
        setTargets(rowSprings, aRow, expansion * 0.3);

        for (let r = 0; r < nRows; r++) {
          const cs = colSprings[r];
          const numCols = gridLines_[r].length;
          let aCol = -1;
          for (let c = 0; c < numCols; c++) {
            if (ax >= cs[c].rest && ax < cs[c + 1].rest) {
              aCol = c;
              break;
            }
          }
          setTargets(cs, aCol, expansion * 0.2);
        }
      }

      // ─── Update springs ───
      for (const s of rowSprings) updateSpring(s);
      for (const row of colSprings) {
        for (const s of row) updateSpring(s);
        // Safety: prevent divider crossing
        for (let i = 1; i < row.length; i++) {
          if (row[i].pos <= row[i - 1].pos + 0.001) {
            row[i].pos = row[i - 1].pos + 0.001;
          }
        }
      }
      // Row divider crossing safety
      for (let i = 1; i < rowSprings.length; i++) {
        if (rowSprings[i].pos <= rowSprings[i - 1].pos + 0.001) {
          rowSprings[i].pos = rowSprings[i - 1].pos + 0.001;
        }
      }

      // ─── Draw ───
      ctx.clearRect(0, 0, width * dpr, height * dpr);

      // Set font once per frame
      ctx.font = `900 ${REF_FONT_SIZE}px ${fontFamily}`;
      ctx.fillStyle = fillColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';

      for (let r = 0; r < nRows; r++) {
        const y0 = rowSprings[r].pos * height;
        const y1 = rowSprings[r + 1].pos * height;
        const cellH = y1 - y0;
        const cs = colSprings[r];
        const rowText = gridLines_[r];

        for (let c = 0; c < rowText.length; c++) {
          const x0 = cs[c].pos * width;
          const x1 = cs[c + 1].pos * width;
          const cellW = x1 - x0;
          const char = rowText[c];
          if (!char || char === ' ' || cellW < 2 || cellH < 2) continue;

          const m = measureChar(char);
          const charH = m.a + m.d;

          // Draw area = cell minus gap
          const dw = cellW - gap;
          const dh = cellH - gap;
          if (dw <= 0 || dh <= 0) continue;

          const scaleX = dw / m.w;
          const scaleY = dh / charH;
          const posX = x0 + gap / 2 + dw / 2;
          const posY = y0 + gap / 2 + dh / 2;

          // Replace translate + scale + save + restore with direct matrix setTransform
          ctx.setTransform(scaleX * dpr, 0, 0, scaleY * dpr, posX * dpr, posY * dpr);
          ctx.fillText(char, 0, (m.a - m.d) / 2);
        }
      }

      // Reset transform matrix to default for subsequent browser/canvas states
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onLeave);
    };
  }, [
    lines,
    text,
    presetCols,
    presetRows,
    spacing,
    expansion,
    stiffness,
    damping,
    fillColor,
    fontFamily,
    gap,
    randomizeDisruption,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full h-full ${className}`}
      style={{ pointerEvents: 'inherit' }}
    />
  );
}
