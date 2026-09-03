/* =============================================================================
   MOUNT THE V3 SPECIMEN
   -----------------------------------------------------------------------------
   Assembles the layers in the native order, loads the production Rive world, and
   runs ONE clock. Everything expensive pauses when the card leaves the viewport.
   ============================================================================= */

import {
  v3BoxFromWidth, v3WorldLiftPx, v3OrbHoverDy, WORLD_COMPOSITIONS,
  CARD_INK, CARD_STOCK, V3_INK, COMFORT_MATERIAL, RARITY_FINISH,
  finishLayoutFor, finishStateAt, loopSecondsFor, STATIC_SAMPLE_PHASE,
  COMFORT_BANDS_RGB, orbEnergy, GEM_TIER_PARAMS, plaqueLayoutFor,
} from './collectible-v3.js';
import { createFinish, drawOrb, gemSvg } from './card-render.js';

const BASE = 'art/';
/** The Rive sample the canonical poster was captured at (world-posters-v3.ts). */
const POSTER_SAMPLE_SECONDS = 3.0;
/** Restrained inspection angles. A premium card under light, never a novelty wobble. */
const TILT_MAX_DEG = 7.5;

const el = (tag, cls, css) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (css) Object.assign(n.style, css);
  return n;
};
const px = (n) => `${n}px`;

/** Load the UMD Rive web runtime once and hand back its global. */
let riveRuntimePromise = null;
function loadRiveRuntime() {
  if (window.rive) return Promise.resolve(window.rive);
  if (riveRuntimePromise) return riveRuntimePromise;
  riveRuntimePromise = new Promise((resolve, reject) => {
    const tag = document.createElement('script');
    tag.src = `${BASE}rive/rive.js`;
    tag.onload = () => resolve(window.rive);
    tag.onerror = reject;
    document.head.appendChild(tag);
  });
  return riveRuntimePromise;
}

export async function mountCollectibleV3(host, facts, opts = {}) {
  const reduced = !!opts.reduceMotion;
  const width = host.clientWidth || opts.width || 340;
  const box = v3BoxFromWidth(width);
  const material = COMFORT_MATERIAL[facts.comfortType];
  const fin = RARITY_FINISH[facts.rarity];
  const gemP = GEM_TIER_PARAMS[facts.rarity];
  const composition = WORLD_COMPOSITIONS[facts.archetypeId] ?? null;
  const liftPx = v3WorldLiftPx(composition, box);
  const layout = finishLayoutFor(facts.finishSeed, facts.rarity, 3, 0);
  const loopSeconds = loopSecondsFor(facts.rarity);
  const pal = COMFORT_BANDS_RGB[facts.comfortType];
  const energy = orbEnergy(facts.recoveryScore);
  const dpr = Math.min(2.5, window.devicePixelRatio || 1);

  // --- the poster's cover-fit + lift, in CARD space (plaque-backdrop-v3.ts) ---
  const PW = 848, PH = 1264;                       // the archetype art standard
  const scale = Math.max(box.artW / PW, box.artH / PH);
  const drawnW = PW * scale, drawnH = PH * scale;
  const offX = (drawnW - box.artW) / 2;
  const posterX = box.artX - offX;
  const posterY = box.artY - liftPx;

  /* ---------------------------------------------------------------- structure */
  host.textContent = '';
  host.style.perspective = px(width * 3.2);
  const tilt = el('div', 'v3-tilt', {
    position: 'relative', width: px(box.width), height: px(box.height),
    transformStyle: 'preserve-3d', willChange: 'transform', margin: '0 auto',
  });
  host.appendChild(tilt);

  // THE MANUFACTURED BODY — stock, radius, and real physical depth.
  const stock = el('div', 'v3-stock', {
    position: 'absolute', inset: '0', borderRadius: px(box.radius),
    background: CARD_STOCK.dark, overflow: 'hidden',
    boxShadow: `0 ${px(box.width * 0.075)} ${px(box.width * 0.16)} rgba(0,0,0,.66),
                0 ${px(box.width * 0.012)} ${px(box.width * 0.03)} rgba(0,0,0,.5)`,
  });
  tilt.appendChild(stock);

  // THE ART WINDOW — the world is INSET into the frame, never bled to the edge.
  const artWin = el('div', 'v3-art', {
    position: 'absolute', left: px(box.artX), top: px(box.artY),
    width: px(box.artW), height: px(box.artH),
    borderRadius: px(box.artRadius), overflow: 'hidden',
    background: V3_INK.worldGround,
  });
  stock.appendChild(artWin);

  const worldBox = { left: px(posterX - box.artX), top: px(posterY - box.artY),
                     width: px(drawnW), height: px(drawnH) };

  const poster = el('img', 'v3-poster', { position: 'absolute', ...worldBox, display: 'block' });
  poster.src = `${BASE}card/${facts.archetypeId}.webp`;
  poster.alt = '';
  poster.decoding = 'async';
  artWin.appendChild(poster);

  const riveCanvas = el('canvas', 'v3-rive', { position: 'absolute', ...worldBox, opacity: '0',
    transition: 'opacity .5s ease' });
  artWin.appendChild(riveCanvas);

  // COMFORT = MATERIAL. A very low tint plus the surface's own grain; never a
  // texture pasted across the artwork (comfort-material.ts).
  const matLayer = el('div', 'v3-material', {
    position: 'absolute', inset: '0', pointerEvents: 'none',
    background: material.overlayColor, opacity: String(material.overlayOpacity),
    mixBlendMode: 'soft-light',
  });
  artWin.appendChild(matLayer);
  const grain = el('div', 'v3-grain', {
    position: 'absolute', inset: '0', pointerEvents: 'none',
    opacity: String(0.05 * material.grain),
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E")`,
    backgroundSize: '120px 120px',
  });
  artWin.appendChild(grain);

  // RARITY = FINISH. One light crossing a flat card, additive over everything.
  const finishCanvas = el('canvas', 'v3-finish', {
    position: 'absolute', inset: '0', width: px(box.width), height: px(box.height),
    borderRadius: px(box.radius), pointerEvents: 'none',
    mixBlendMode: 'plus-lighter',
  });
  finishCanvas.width = Math.round(box.width * dpr);
  finishCanvas.height = Math.round(box.height * dpr);
  stock.appendChild(finishCanvas);

  // THE ORB — the global anchor, never a per-archetype position.
  // The frosted GLASS BODY is its own element so it can actually refract the
  // world behind it (LiquidGlass), instead of being painted as an opaque disc.
  const orbCanvas = el('canvas', 'v3-orb', {
    position: 'absolute', left: px(box.orbBoxX), top: px(box.orbBoxY),
    width: px(box.orbBoxSize), height: px(box.orbBoxSize * (160 / 150)),
    pointerEvents: 'none',
  });
  orbCanvas.width = Math.round(box.orbBoxSize * dpr);
  orbCanvas.height = Math.round(box.orbBoxSize * (160 / 150) * dpr);
  stock.appendChild(orbCanvas);
  const orbCtx = orbCanvas.getContext('2d');

  stock.appendChild(buildTopBar(box, facts));
  const plaque = buildPlaque(box, facts, material, poster, worldBox, liftPx);
  stock.appendChild(plaque.node);

  // EDGE LIGHT — a second, non-hue rarity separator, scaled by the tier.
  const bevel = el('div', 'v3-bevel', {
    position: 'absolute', inset: '0', borderRadius: px(box.radius), pointerEvents: 'none',
    boxShadow: `inset 0 0 0 ${px(box.bevel)} rgba(255,246,232,${(0.1 + 0.14 * fin.edgeLight).toFixed(3)}),
                inset 0 0 ${px(box.width * 0.06)} ${px(-box.width * 0.03)} rgba(255,214,160,${(0.16 * fin.edgeLight).toFixed(3)}),
                inset 0 0 0 ${px(box.frame)} rgba(0,0,0,0.34)`,
  });
  stock.appendChild(bevel);

  // POINTER SPECULAR — a separate sheet, exactly as the native orb keeps
  // `specularDrive` separate from its clock.
  const glint = el('div', 'v3-glint', {
    position: 'absolute', inset: '0', borderRadius: px(box.radius),
    pointerEvents: 'none', mixBlendMode: 'plus-lighter', opacity: '0',
    transition: 'opacity .35s ease',
  });
  stock.appendChild(glint);

  /* ------------------------------------------------------------------- world */
  let rive = null;
  try {
    // rive.js is a UMD bundle with no ES exports (it assigns `window.rive`), which
    // is why the app's own capture.html loads it with a plain <script> tag. A
    // dynamic import() would execute it into an empty namespace.
    const R = await loadRiveRuntime();
    if (R?.RuntimeLoader?.setWasmUrl) R.RuntimeLoader.setWasmUrl(`${BASE}rive/rive.wasm`);
    rive = await new Promise((resolve) => {
      const r = new R.Rive({
        src: `${BASE}rive/archetype_${facts.archetypeId}.riv`,
        canvas: riveCanvas,
        autoplay: !reduced,
        layout: new R.Layout({ fit: R.Fit.Cover, alignment: R.Alignment.Center }),
        onLoad: () => {
          r.resizeDrawingSurfaceToCanvas();
          riveCanvas.style.opacity = '1';
          // Reduce Motion settles on the SAME frame the canonical poster was
          // captured at, so the still is a designed one, not a paused animation.
          if (reduced) {
            const anims = r.animationNames || [];
            const name = anims.includes('Idle') ? 'Idle' : anims[0];
            if (name) { try { r.scrub(name, POSTER_SAMPLE_SECONDS); } catch (e) {} }
          }
          resolve(r);
        },
        onLoadError: () => resolve(null),
      });
      setTimeout(() => resolve(null), 8000);
    });
  } catch (e) {
    console.warn('[apoyu] Rive world unavailable, canonical poster stands in:', e);
  }
  if (rive) poster.style.opacity = '0';

  /* ------------------------------------------------------------------ finish */
  await new Promise((r) => (poster.complete ? r() : (poster.onload = r, poster.onerror = r)));
  const finish = createFinish(finishCanvas, poster);
  if (finish) {
    const { gl, loc } = finish;
    gl.viewport(0, 0, finishCanvas.width, finishCanvas.height);
    gl.uniform2f(loc.uSize, box.width, box.height);
    gl.uniform2f(loc.uPosterOrigin, posterX, posterY);
    gl.uniform2f(loc.uPosterSize, drawnW, drawnH);
    gl.uniform1f(loc.uWidth, box.width);
    gl.uniform1f(loc.uHeight, box.height);
    gl.uniform4f(loc.uArt, box.artX, box.artY, box.artW, box.artH);
    gl.uniform1f(loc.uAngle, (layout.foilAngle * Math.PI) / 180);
    gl.uniform1f(loc.uBandW, Math.max(0.02, fin.catchWidthFraction * 1.6));
    gl.uniform1f(loc.uSweepAlpha, fin.laminateOpacity);
    gl.uniform1f(loc.uChroma, fin.chromaSplit);
    gl.uniform1f(loc.uSparkle, fin.holoSparkle);
    gl.uniform1f(loc.uHolo, fin.holoPlay);
    gl.uniform1f(loc.uStripeFreq, (Math.PI * 2) / Math.max(4, box.width * 0.02));
    gl.uniform2f(loc.uSeed, layout.noiseOffsetX, layout.noiseOffsetY);
    gl.uniform1f(loc.uWave, 0.028);                       // FINISH_WAVE_AMPLITUDE
    gl.uniform1f(loc.uWavePhase, layout.noiseOffsetX * Math.PI * 2);
  }

  /* ------------------------------------------------------- inspection inputs */
  const ptr = { tx: 0, ty: 0, x: 0, y: 0, active: false };
  let dragging = false, startX = 0, startY = 0, axisLocked = null;

  const setTargetFromPoint = (clientX, clientY) => {
    const r = tilt.getBoundingClientRect();
    ptr.tx = Math.max(-1, Math.min(1, ((clientX - r.left) / r.width) * 2 - 1));
    ptr.ty = Math.max(-1, Math.min(1, ((clientY - r.top) / r.height) * 2 - 1));
  };
  const engage = () => { ptr.active = true; glint.style.opacity = '1'; };
  const release = () => {
    ptr.active = false; ptr.tx = 0; ptr.ty = 0; glint.style.opacity = '0';
  };

  host.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;         // touch is handled as a drag
    engage(); setTargetFromPoint(e.clientX, e.clientY);
  });
  host.addEventListener('pointerleave', (e) => { if (e.pointerType !== 'touch') release(); });

  // TOUCH: dragging ON the card inspects it; vertical scrolling still belongs to
  // the page. The axis is locked on the first meaningful movement, so a scroll
  // that starts on the card is never stolen.
  host.addEventListener('touchstart', (e) => {
    const t = e.touches[0]; if (!t) return;
    dragging = true; axisLocked = null; startX = t.clientX; startY = t.clientY;
  }, { passive: true });
  host.addEventListener('touchmove', (e) => {
    const t = e.touches[0]; if (!t || !dragging) return;
    const dx = t.clientX - startX, dy = t.clientY - startY;
    if (axisLocked === null && Math.abs(dx) + Math.abs(dy) > 6) {
      axisLocked = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if (axisLocked === 'x') engage();
    }
    if (axisLocked === 'x') { e.preventDefault(); setTargetFromPoint(t.clientX, t.clientY); }
  }, { passive: false });
  const endTouch = () => { dragging = false; if (axisLocked === 'x') release(); axisLocked = null; };
  host.addEventListener('touchend', endTouch, { passive: true });
  host.addEventListener('touchcancel', endTouch, { passive: true });

  /* ------------------------------------------------------------- ONE CLOCK */
  let visible = true, raf = 0, t0 = performance.now();
  const io = new IntersectionObserver((es) => {
    visible = es[0].isIntersecting;
    if (rive) { visible && !reduced ? rive.play() : rive.pause(); }
    if (visible && !reduced && !raf) { t0 = performance.now() - elapsed * 1000; raf = requestAnimationFrame(frame); }
    if (!visible && raf) { cancelAnimationFrame(raf); raf = 0; }
  }, { threshold: 0.01 });
  io.observe(host);

  let elapsed = 0;
  let frames = 0;                   // review/telemetry only
  let phasePin = null;              // review only: pin the finish's loop phase
  function render(time) {
    frames++;
    const finishTime = phasePin === null ? time : phasePin * loopSeconds;
    const state = finishStateAt(layout, facts.rarity, finishTime, reduced && phasePin === null);
    if (finish) {
      const { gl, loc } = finish;
      gl.uniform1f(loc.uCatch, state.catchOffset);
      gl.uniform1f(loc.uShimmer, fin.holoShimmer * (fin.fractureOpacity > 0 ? state.fractureScale : 1));
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    // pointer easing — critically damped enough to feel like an object, not a toy
    ptr.x += (ptr.tx - ptr.x) * 0.14;
    ptr.y += (ptr.ty - ptr.y) * 0.14;
    const ry = ptr.x * TILT_MAX_DEG, rx = -ptr.y * TILT_MAX_DEG;
    const hover = reduced ? 0 : v3OrbHoverDy(time, loopSeconds, box.orbDiameter);
    tilt.style.transform = `rotateX(${rx.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg)`;
    artWin.style.transform = `translate3d(${(-ptr.x * box.width * 0.012).toFixed(2)}px, ${(-ptr.y * box.width * 0.008).toFixed(2)}px, 0)`;
    orbCanvas.style.transform = `translate3d(${(ptr.x * box.width * 0.02).toFixed(2)}px, ${(hover + -ptr.y * box.width * 0.012).toFixed(2)}px, 0)`;
    const gx = (0.5 + ptr.x * 0.42) * 100, gy = (0.5 + ptr.y * 0.42) * 100;
    const gA = fin.glintOpacity * (0.42 + 0.58 * Math.min(1, Math.hypot(ptr.x, ptr.y)));
    glint.style.background =
      `radial-gradient(46% 34% at ${gx.toFixed(1)}% ${gy.toFixed(1)}%, rgba(255,251,240,${(0.5 * gA).toFixed(3)}) 0%, rgba(255,238,208,${(0.17 * gA).toFixed(3)}) 38%, rgba(255,232,198,0) 70%)`;
    drawOrb(orbCtx, {
      size: box.orbBoxSize, score: facts.recoveryScore, pal, energy, dpr,
      t: reduced ? STATIC_SAMPLE_PHASE * loopSeconds : time,
      specX: ptr.x, specY: ptr.y, material, haloScale: state.orbHaloScale,
      world: { img: poster, x: posterX, y: posterY, w: drawnW, h: drawnH,
               boxX: box.orbBoxX, boxY: box.orbBoxY },
    });
    plaque.gem.innerHTML = gemSvg(box.gemW, facts.rarity, state.gemAngle);
  }
  function frame(now) {
    elapsed = (now - t0) / 1000;
    render(elapsed);
    raf = visible ? requestAnimationFrame(frame) : 0;
  }
  if (reduced) {
    render(STATIC_SAMPLE_PHASE * loopSeconds);
  } else {
    raf = requestAnimationFrame(frame);
  }

  return {
    box,
    destroy() { io.disconnect(); if (raf) cancelAnimationFrame(raf); if (rive) rive.cleanup?.(); },
    setPointer(nx, ny) { ptr.tx = nx; ptr.ty = ny; engage(); if (reduced) render(STATIC_SAMPLE_PHASE * loopSeconds); },
    /** Review only: hold the rarity finish at one loop phase so a still can show it. */
    setFinishPhase(p) { phasePin = p; if (reduced) render(STATIC_SAMPLE_PHASE * loopSeconds); },
    riveActive: !!rive,
    /** Review only: frames this card has drawn, and whether its loop is running. */
    stats() { return { frames, running: raf !== 0, visible, reduced }; },
  };
}

/* =============================================================================
   THE TOP STAT BAR (P7-A9/A10) — home's bulb-nav grammar, as card material.
   ONE SEAMLESS SHAPE: a bulb circle for the training load, then a slimmer tube
   carrying HRV, sleep quality and RHR. Fill along the tube IS the load position.
   ============================================================================= */
function buildTopBar(box, facts) {
  const w = box.width;
  const load = facts.trainingLoad ? Math.max(0, Math.min(1, facts.trainingLoad.position)) : null;
  const fillW = load === null ? 0 : load * box.topBarW;
  const wrap = el('div', 'v3-topbar', {
    position: 'absolute', left: '0', top: '0', width: px(box.width), height: px(box.height),
    pointerEvents: 'none',
  });
  const r = box.topBarR, bx = box.topBarX, by = box.topBarY, bw = box.topBarW, bh = box.topBarH;
  const bR = box.bulbD / 2;
  const svg = `
<svg width="${box.width}" height="${box.height}" viewBox="0 0 ${box.width} ${box.height}" aria-hidden="true"
     style="position:absolute;inset:0">
  <defs>
    <clipPath id="tbclip">
      <circle cx="${box.bulbCx}" cy="${box.bulbCy}" r="${bR}"/>
      <rect x="${box.bulbCx}" y="${by}" width="${bx + bw - box.bulbCx}" height="${bh}" rx="${r}" ry="${r}"/>
    </clipPath>
    <linearGradient id="tbglass" x1="0" y1="${box.bulbCy - bR}" x2="0" y2="${box.bulbCy + bR}"
                    gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="rgba(255,255,255,0.10)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0.03)"/>
    </linearGradient>
    <linearGradient id="tbfill" x1="${bx}" y1="0" x2="${bx + Math.max(fillW, 1)}" y2="0"
                    gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="rgba(255,200,87,0.30)"/>
      <stop offset="100%" stop-color="rgba(255,138,74,0.42)"/>
    </linearGradient>
  </defs>
  <g clip-path="url(#tbclip)">
    <rect x="${bx}" y="${by - bR}" width="${bw}" height="${bh + bR * 2}" fill="rgba(10,6,14,0.46)"/>
    <rect x="${bx}" y="${by - bR}" width="${bw}" height="${bh + bR * 2}" fill="url(#tbglass)"/>
    ${load === null ? '' : `<rect x="${bx}" y="${box.bulbCy - bR}" width="${fillW}" height="${bR * 2}" fill="url(#tbfill)"/>`}
    <rect x="${bx}" y="${box.bulbCy - bR}" width="${bw}" height="${bR * 0.45}" fill="rgba(255,255,255,0.05)"/>
  </g>
  <g clip-path="url(#tbclip)" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="${(w * 0.003).toFixed(2)}">
    <circle cx="${box.bulbCx}" cy="${box.bulbCy}" r="${bR}"/>
    <rect x="${box.bulbCx}" y="${by}" width="${bx + bw - box.bulbCx}" height="${bh}" rx="${r}" ry="${r}"/>
  </g>
</svg>`;
  wrap.insertAdjacentHTML('beforeend', svg);

  const iconSize = w * 0.04;
  const cell = (glyph, value) => `
    <span style="display:flex;align-items:center;gap:${px(w * 0.012)};">
      <span style="width:${px(iconSize)};height:${px(iconSize)};display:inline-flex;
                   align-items:center;justify-content:center;color:${CARD_INK.title};
                   opacity:.92">${glyph}</span>
      <span style="font:500 ${px(w * 0.03)}/1 Fredoka,system-ui,sans-serif;color:${CARD_INK.title};
                   letter-spacing:.01em">${value}</span>
    </span>`;
  const S = iconSize;
  const heart = `<svg viewBox="0 0 24 24" width="${S}" height="${S}" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h4l2-6 4 12 2.5-8 1.8 4H22"/></svg>`;
  const moon = `<svg viewBox="0 0 24 24" width="${S}" height="${S}" fill="currentColor"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>`;
  const rhr = `<svg viewBox="0 0 24 24" width="${S}" height="${S}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.6-7-9.4A4.1 4.1 0 0 1 12 8a4.1 4.1 0 0 1 7 2.6C19 15.4 12 20 12 20z"/></svg>`;
  const dumbbell = `<svg viewBox="0 0 24 24" width="${w * 0.042}" height="${w * 0.042}" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"><path d="M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10"/></svg>`;

  const row = el('div', '', {
    position: 'absolute', left: px(box.topBarX), top: px(box.bulbCy - box.bulbD / 2),
    width: px(box.topBarW), height: px(box.bulbD), display: 'flex', alignItems: 'center',
  });
  row.insertAdjacentHTML('beforeend', `
    <span style="position:absolute;left:${px(box.bulbCx - box.topBarX - box.bulbD / 2)};
                 width:${px(box.bulbD)};height:${px(box.bulbD)};display:flex;align-items:center;
                 justify-content:center;color:${CARD_INK.title}">${dumbbell}</span>
    <span style="width:${px(box.bulbD)}"></span>
    <span style="flex:1;display:flex;align-items:center;justify-content:space-around;
                 padding-inline:${px(w * 0.012)}">
      ${cell(heart, facts.hrvMs === null ? '--' : `${facts.hrvMs}ms`)}
      ${cell(moon, facts.sleepQualityScore === null ? '--' : `${Math.round(facts.sleepQualityScore)}%`)}
      ${cell(rhr, facts.rhrBpm === null ? '--' : `${facts.rhrBpm}`)}
    </span>`);
  wrap.appendChild(row);
  return wrap;
}

/* =============================================================================
   THE PLAQUE — the world, refracted once (plaque-backdrop-v3.ts).
   The poster region beneath the plaque is drawn blurred and mildly squeezed, so
   the glass genuinely bends what it covers. Then shade, top sheen, and the
   provenance / title / why hierarchy from collectible-v3-plaque-layout.ts.
   ============================================================================= */
function buildPlaque(box, facts, material, poster, worldBox, liftPx) {
  const w = box.width;
  const node = el('div', 'v3-plaque', {
    position: 'absolute', left: px(box.plaqueX), top: px(box.plaqueY),
    width: px(box.plaqueW), height: px(box.plaqueH),
    borderRadius: px(box.plaqueRadius), overflow: 'hidden',
    boxShadow: `0 ${px(w * 0.006)} ${px(w * 0.02)} rgba(0,0,0,0.45),
                inset 0 ${px(w * 0.0025)} 0 ${V3_INK.plaqueTopSheen}`,
  });

  // REFRACTION: the same poster, same cover-fit + lift, blurred at the material's
  // own frost and squeezed 6% vertically. BLUR_SIGMA_FRACTION = 0.045.
  const sigma = w * 0.045 * (0.75 + material.glassFrost * 0.55);
  const refract = el('img', '', {
    position: 'absolute',
    left: px(parseFloat(worldBox.left) + box.artX - box.plaqueX),
    top: px(parseFloat(worldBox.top) + box.artY - box.plaqueY),
    width: worldBox.width, height: worldBox.height,
    filter: `blur(${sigma.toFixed(2)}px)`,
    transform: 'scaleY(0.9434)', transformOrigin: 'top center',   // 1 / 1.06
  });
  refract.src = poster.src; refract.alt = '';
  node.appendChild(refract);

  node.appendChild(el('div', '', { position: 'absolute', inset: '0', background: material.glassTint }));
  node.appendChild(el('div', '', { position: 'absolute', inset: '0', background: V3_INK.plaqueShade }));
  node.appendChild(el('div', '', {
    position: 'absolute', left: '0', right: '0', top: '0', height: px(box.plaqueH * 0.5),
    background: `linear-gradient(180deg, ${V3_INK.plaqueTopSheen}, transparent)`,
  }));

  const availW = (box.plaqueW - box.plaquePadX * 2) / w;
  const L = plaqueLayoutFor(facts.title, facts.why, availW);
  const inner = el('div', '', {
    position: 'absolute', left: px(box.plaquePadX), top: px(box.plaquePadTop),
    width: px(box.plaqueW - box.plaquePadX * 2),
    height: px(box.plaqueH - box.plaquePadTop - box.plaquePadBottom),
    display: 'flex', flexDirection: 'column',
  });

  const chipRow = el('div', '', { display: 'flex', alignItems: 'center', gap: px(w * 0.014) });
  chipRow.insertAdjacentHTML('beforeend', `
    <span style="display:inline-flex;align-items:center;gap:${px(w * 0.008)};
                 padding:${px(L.chipPadV * w)} ${px(w * 0.018)};border-radius:999px;
                 background:${material.socketTint};
                 font:600 ${px(L.chipFontSize * w)}/${px(L.chipLineHeight * w)} Fredoka,system-ui,sans-serif;
                 color:#12100F;letter-spacing:.04em;text-transform:uppercase">
      ${material.label}
    </span>
    <span style="font:600 ${px(L.chipFontSize * w)}/${px(L.chipLineHeight * w)} Fredoka,system-ui,sans-serif;
                 color:${CARD_INK.vitals};letter-spacing:.12em;text-transform:uppercase">
      ${facts.rarity}
    </span>`);
  inner.appendChild(chipRow);

  const title = el('div', '', {
    marginTop: px(L.title.marginTop * w),
    font: `500 ${px(L.title.fontSize * w)}/${px(L.title.lineHeight * w)} Fredoka, system-ui, sans-serif`,
    color: CARD_INK.title, letterSpacing: '-.012em',
    display: '-webkit-box', WebkitLineClamp: String(L.title.lines), WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  });
  title.textContent = facts.title;
  inner.appendChild(title);

  const why = el('div', '', {
    marginTop: px(L.why.marginTop * w),
    font: `300 ${px(L.why.fontSize * w)}/${px(L.why.lineHeight * w)} Fredoka, system-ui, sans-serif`,
    color: CARD_INK.why,
    display: '-webkit-box', WebkitLineClamp: String(L.why.lines), WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  });
  why.textContent = facts.why;
  inner.appendChild(why);
  node.appendChild(inner);

  // THE GEM — one, socketed into plaque row 1 at its own measured centre.
  const gem = el('div', 'v3-gem', {
    position: 'absolute',
    left: px(box.gemCenterX - box.plaqueX - box.gemW / 2),
    top: px(box.gemCenterY - box.plaqueY - (box.gemW * 1.08) / 2),
    width: px(box.gemW), height: px(box.gemW * 1.08),
    filter: `drop-shadow(0 ${px(w * 0.004)} ${px(w * 0.01)} rgba(0,0,0,0.6))`,
  });
  node.appendChild(gem);
  return { node, gem };
}
