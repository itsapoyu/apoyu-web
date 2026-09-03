/* =============================================================================
   COLLECTIBLE V3 — WEB RENDERER
   -----------------------------------------------------------------------------
   Three live systems, one clock:
     1. the WORLD    @rive-app/canvas playing the SAME production .riv
     2. the FINISH   finish-sksl-v3.ts ported SkSL -> GLSL ES 3.00 (same math)
     3. the ORB/GEM  the app's palettes, energy curve and silhouette, on 2D canvas

   ONE TIMING SOURCE. A single rAF drives the finish state vector, the orb, the
   gem and the idle float. Pointer/touch feeds a SEPARATE specular drive (the same
   separation the native orb makes with `specularDrive`), so inspecting the card
   can never restart or desynchronise its intrinsic motion.
   ============================================================================= */

import {
  v3BoxFromWidth, v3WorldLiftPx, v3OrbHoverDy, WORLD_COMPOSITIONS,
  CARD_INK, CARD_STOCK, V3_INK, COMFORT_MATERIAL, RARITY_FINISH,
  finishLayoutFor, finishStateAt, loopSecondsFor,
  COMFORT_BANDS_RGB, orbEnergy, GEM_GEOM, GEM_TIER_PARAMS, gemBaseColor,
  plaqueLayoutFor,
} from './collectible-v3.js';

/* =============================================================================
   THE FINISH SHADER — a direct port of FINISH_SKSL (finish-sksl-v3.ts).
   SkSL and GLSL ES differ only in type spelling and how the image is sampled:
     half4/half3/half(x) -> vec4/vec3/float(x);  float2/float4 -> vec2/vec4
     image.eval(xy)      -> texture(uImage, posterUv(xy))   [Clamp tiling]
   Every expression below is otherwise character-for-character the native one.
   ============================================================================= */
const FINISH_FS = `#version 300 es
precision highp float;
in vec2 vCard;                 // card-space pixel coordinate (the SkSL 'xy')
out vec4 fragColor;

uniform sampler2D uImage;
uniform vec2  uPosterOrigin;   // where the cover-fitted, lifted poster starts, in card px
uniform vec2  uPosterSize;     // its drawn size in card px
uniform float uCatch;
uniform float uAngle;
uniform float uWidth;
uniform float uHeight;
uniform vec4  uArt;
uniform float uWave;
uniform float uWavePhase;
uniform float uBandW;
uniform float uSweepAlpha;
uniform float uChroma;
uniform float uShimmer;
uniform float uSparkle;
uniform float uHolo;
uniform float uStripeFreq;
uniform vec2  uSeed;

vec3 hue(float h) {
  float a = h * 6.28318530718;
  return vec3(
    0.5 + 0.5 * cos(a),
    0.5 + 0.5 * cos(a - 2.09439510239),
    0.5 + 0.5 * cos(a + 2.09439510239)
  );
}

void main() {
  vec2 xy = vCard;
  vec2 uv = clamp((xy - uPosterOrigin) / uPosterSize, 0.0, 1.0);
  vec4 art = texture(uImage, uv);
  float artLum = dot(art.rgb, vec3(0.299, 0.587, 0.114));
  float insideX = step(uArt.x, xy.x) * step(xy.x, uArt.x + uArt.z);
  float insideY = step(uArt.y, xy.y) * step(xy.y, uArt.y + uArt.w);
  float lum = mix(0.5, artLum, insideX * insideY);

  float c = cos(uAngle);
  float sn = sin(uAngle);
  float span = max(uWidth * c + uHeight * sn, 1.0);
  float u = (xy.x * c + xy.y * sn) / span;
  float v = (xy.y * c - xy.x * sn) / span;
  float du = u - uCatch + uWave * sin(v * 9.42477796 + uWavePhase);
  float bx = du / max(uBandW, 0.02);
  float band = exp(-bx * bx * 1.6);

  float sheen = uSweepAlpha * band * (0.22 + 0.9 * lum);
  float flank = clamp(bx, -1.0, 1.0);
  vec3 tint = vec3(
    1.0 + 0.4 * uChroma * flank,
    1.0,
    1.0 - 0.35 * uChroma * flank
  );
  vec3 rgb = tint * vec3(1.0, 0.98, 0.94) * sheen;
  float a = sheen;

  if (uShimmer > 0.001) {
    float line = 0.5 + 0.5 * sin(u * uWidth * uStripeFreq * 1.9 + xy.y * 0.012);
    line = smoothstep(0.5, 1.0, line);
    float amp = uShimmer * band * line * (0.2 + 0.8 * lum);
    rgb += hue(u * 2.2 + (xy.y / max(uWidth, 1.0)) * 0.35) * amp;
    a += amp * 0.7;
  }

  if (uHolo > 0.001) {
    vec3 playA = hue(bx * 0.38 + u * 1.4);
    vec3 playB = hue(bx * 0.9 - u * 0.8 + 0.33);
    float playAmp = uHolo * band * (0.25 + 0.75 * lum);
    rgb += (playA * 0.72 + playB * 0.38) * playAmp;
    a += playAmp * 0.8;
  }

  if (uSparkle > 0.001) {
    vec2 p = xy + uSeed * uWidth;
    float c1 = (0.5 + 0.5 * sin(p.x * uStripeFreq * 4.1 + p.y * uStripeFreq * 1.3))
             * (0.5 + 0.5 * sin(p.y * uStripeFreq * 3.3 - p.x * uStripeFreq * 0.7));
    float c2 = (0.5 + 0.5 * sin(p.x * uStripeFreq * 2.3 - p.y * uStripeFreq * 2.9))
             * (0.5 + 0.5 * sin(p.y * uStripeFreq * 5.1 + p.x * uStripeFreq * 0.4));
    float spark = smoothstep(0.96, 1.0, max(c1, c2)) * uSparkle * band * 3.2 * (0.25 + 0.75 * lum);
    rgb += vec3(1.0, 0.99, 0.95) * spark;
    a += spark * 0.6;
  }

  // The native composites this with Plus. The canvas carries the additive term and
  // the page blends it with plus-lighter, so alpha stays 1 and rgb IS the addition.
  fragColor = vec4(rgb, 1.0);
}`;

const FINISH_VS = `#version 300 es
in vec2 aPos;
uniform vec2 uSize;
out vec2 vCard;
void main() {
  vCard = aPos * uSize;
  vec2 clip = aPos * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
}`;

function compile(gl, type, src) {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error('[apoyu] finish shader failed:', gl.getShaderInfoLog(sh));
    return null;
  }
  return sh;
}

/** The finish layer. Returns null if WebGL2 is unavailable — the card still renders. */
function createFinish(canvas, posterImg) {
  const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false });
  if (!gl) return null;
  const vs = compile(gl, gl.VERTEX_SHADER, FINISH_VS);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FINISH_FS);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('[apoyu] finish link failed:', gl.getProgramInfoLog(prog));
    return null;
  }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0,0, 1,0, 0,1, 1,1]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, posterImg);

  const u = (n) => gl.getUniformLocation(prog, n);
  const loc = {
    uImage: u('uImage'), uPosterOrigin: u('uPosterOrigin'), uPosterSize: u('uPosterSize'),
    uCatch: u('uCatch'), uAngle: u('uAngle'), uWidth: u('uWidth'), uHeight: u('uHeight'),
    uArt: u('uArt'), uWave: u('uWave'), uWavePhase: u('uWavePhase'), uBandW: u('uBandW'),
    uSweepAlpha: u('uSweepAlpha'), uChroma: u('uChroma'), uShimmer: u('uShimmer'),
    uSparkle: u('uSparkle'), uHolo: u('uHolo'), uStripeFreq: u('uStripeFreq'),
    uSeed: u('uSeed'), uSize: u('uSize'),
  };
  gl.uniform1i(loc.uImage, 0);
  return { gl, prog, loc, tex };
}

/* =============================================================================
   THE ORB — RecoveryOrbVisual's layer stack, on 2D canvas.
   Ground glow (additive) -> glass body clipped to the sphere -> digits behind ->
   flame -> contrast scrim -> digits on top -> rim + specular.
   Palette, energy curve and every radius fraction are the app's own.
   ============================================================================= */
const rgba = (c, a) => `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a})`;
const darkenRgb = (c, f) => c.map((v) => Math.round(v * f));

function drawOrb(ctx, o) {
  const { size, score, pal, energy, t, specX, specY, material, haloScale } = o;
  const w = size;
  const h = size * (160 / 150);
  const cx = w / 2;
  const cy = h * 0.42;
  const oR = w * 0.287;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.save();
  ctx.scale(o.dpr, o.dpr);

  // 1. GROUND GLOW — additive, OUTSIDE the glass. RecoveryOrb `RadialGlow`.
  ctx.globalCompositeOperation = 'lighter';
  const gg = ctx.createRadialGradient(cx, cy + oR * 0.1, 0, cx, cy + oR * 0.1, oR * 1.5 * haloScale);
  const ggA = (0.34 * energy + 0.06) * 2.2;   // web: the glow sits over a lit world, not a dark app ground
  gg.addColorStop(0, rgba(pal.mid, ggA));
  gg.addColorStop(0.42, rgba(pal.outer, ggA * 0.6));
  gg.addColorStop(1, rgba(pal.outer, 0));
  ctx.fillStyle = gg;
  ctx.fillRect(0, 0, w, h);

  // 2. THE GLASS BODY — everything below is clipped to the sphere, as LiquidGlass does.
  ctx.globalCompositeOperation = 'source-over';
  ctx.save();
  ctx.beginPath(); ctx.arc(cx, cy, oR, 0, Math.PI * 2); ctx.clip();

  // THE FROSTED BODY genuinely refracts the world behind it, the way LiquidGlass
  // does: the poster region under the sphere is drawn back in, softened, rather
  // than relying on backdrop-filter (which several engines drop inside a
  // transformed 3D subtree). `world` carries the poster and its card-space rect.
  if (o.world && o.world.img && o.world.img.complete) {
    const { img, x, y, w: ww, h: hh, boxX, boxY } = o.world;
    ctx.save();
    ctx.filter = `blur(${(oR * 0.06).toFixed(2)}px) saturate(0.86) brightness(0.92)`;
    ctx.drawImage(img, x - boxX, y - boxY, ww, hh);
    ctx.restore();
  }
  const body = ctx.createRadialGradient(cx, cy - oR * 0.3, oR * 0.05, cx, cy, oR);
  body.addColorStop(0, 'rgba(40, 26, 24, 0.12)');
  body.addColorStop(0.6, 'rgba(20, 13, 16, 0.24)');
  body.addColorStop(1, 'rgba(10, 6, 10, 0.46)');
  ctx.fillStyle = body;
  ctx.fillRect(cx - oR, cy - oR, oR * 2, oR * 2);

  const ny = cy + oR * 0.14;            // NUMBER_CENTER_DROP_FRAC
  const digitFont = `500 ${(oR * 0.98).toFixed(1)}px Fredoka, system-ui, sans-serif`;
  const digits = String(Math.round(score));

  // 2a. DIGITS BEHIND the flame, solid white — the fire glows THROUGH them.
  ctx.globalCompositeOperation = 'source-over';
  ctx.font = digitFont; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillStyle = `rgba(255,255,255,1)`;   // SCORE_NUMBER_BEHIND_OPACITY = 1
  ctx.fillText(digits, cx, ny);

  // 2b. THE FLAME — score-keyed fire, additive, rising from the sphere floor.
  ctx.globalCompositeOperation = 'lighter';
  const flameH = oR * (1.05 + 0.9 * energy);
  const baseY = cy + oR * 0.86;
  const tongues = 5;
  for (let i = 0; i < tongues; i++) {
    const ph = t * (0.55 + i * 0.11) + i * 1.7;
    const sway = Math.sin(ph) * oR * 0.1;
    const lick = 0.72 + 0.28 * (0.5 + 0.5 * Math.sin(ph * 1.6 + i));
    const hgt = flameH * lick * (1 - i * 0.09);
    const wid = oR * (0.52 - i * 0.06);
    const tipY = baseY - hgt;
    const g = ctx.createLinearGradient(0, baseY, 0, tipY);
    g.addColorStop(0, rgba(pal.outer, 0.0));
    g.addColorStop(0.28, rgba(pal.outer, 0.5 * energy + 0.3));
    g.addColorStop(0.66, rgba(pal.mid, 0.55 * energy + 0.34));
    g.addColorStop(1, rgba(pal.core, 0.5 * energy + 0.26));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(cx - wid + sway * 0.3, baseY);
    ctx.quadraticCurveTo(cx - wid * 0.9 + sway, baseY - hgt * 0.55, cx + sway * 1.1, tipY);
    ctx.quadraticCurveTo(cx + wid * 0.9 + sway, baseY - hgt * 0.55, cx + wid + sway * 0.3, baseY);
    ctx.closePath();
    ctx.fill();
  }
  // the hot core pooled at the floor
  const core = ctx.createRadialGradient(cx, baseY - oR * 0.18, 0, cx, baseY - oR * 0.18, oR * 0.85);
  core.addColorStop(0, rgba(pal.core, 0.55 * energy + 0.30));
  core.addColorStop(0.5, rgba(pal.mid, 0.36 * energy + 0.16));
  core.addColorStop(1, rgba(pal.outer, 0));
  ctx.fillStyle = core;
  ctx.fillRect(cx - oR, cy - oR, oR * 2, oR * 2);

  // 2c. SCORE CONTRAST SCRIM — a deep version of the band's own flame tone, so the
  //     white digits read without killing the fire (RecoveryOrb `ScoreContrastScrim`).
  ctx.globalCompositeOperation = 'source-over';
  const tintC = darkenRgb(pal.mid, 0.32);
  const scrimA = 0.55 * (0.34 + 0.66 * Math.min(1, energy * 2.4));
  const scr = ctx.createRadialGradient(cx, ny, 0, cx, ny, oR * 0.82);
  scr.addColorStop(0, rgba(tintC, scrimA));
  scr.addColorStop(0.62, rgba(tintC, scrimA * 0.7));
  scr.addColorStop(1, rgba(tintC, 0));
  ctx.fillStyle = scr;
  ctx.fillRect(cx - oR, cy - oR, oR * 2, oR * 2);

  // 2d. DIGITS ON TOP — translucent duplicate. SCORE_NUMBER_TOP_OPACITY = 0.6
  ctx.font = digitFont; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.fillText(digits, cx, ny);

  // 2e. LIVING SPECULAR — the glass highlight. Its position is the ONLY thing the
  //     pointer moves (the native orb's `specularDrive`), never the card's clock.
  ctx.globalCompositeOperation = 'lighter';
  const sx = cx + specX * oR * 0.42;
  const sy = cy - oR * 0.36 + specY * oR * 0.32;
  const sp = ctx.createRadialGradient(sx, sy, 0, sx, sy, oR * 0.85);
  const specA = 0.3 * (material.orbSpecular ?? 0.5) + 0.1;
  sp.addColorStop(0, `rgba(255,252,246,${specA})`);
  sp.addColorStop(0.45, `rgba(255,250,240,${specA * 0.3})`);
  sp.addColorStop(1, 'rgba(255,250,240,0)');
  ctx.fillStyle = sp;
  ctx.fillRect(cx - oR, cy - oR, oR * 2, oR * 2);
  ctx.restore();

  // 3. RIM — the glass edge. Material character lives here (comfort-material).
  ctx.globalCompositeOperation = 'source-over';
  ctx.lineWidth = Math.max(1, oR * 0.035);
  ctx.strokeStyle = material.edgeColor;
  ctx.beginPath(); ctx.arc(cx, cy, oR - ctx.lineWidth / 2, 0, Math.PI * 2); ctx.stroke();
  ctx.lineWidth = Math.max(0.6, oR * 0.014);
  ctx.strokeStyle = material.highlight;
  ctx.beginPath();
  ctx.arc(cx, cy, oR - ctx.lineWidth, Math.PI * 1.05, Math.PI * 1.85);
  ctx.stroke();
  ctx.restore();
}

const GEM_BOX_RATIO_LOCAL = 1.08;  /* RarityGem GEM_BOX_RATIO */

/* =============================================================================
   THE GEM — RarityGem's eight-vertex brilliant cut, its tier params and ramp.
   ============================================================================= */
function gemSvg(size, rarity, angleDeg) {
  const p = GEM_TIER_PARAMS[rarity];
  const base = gemBaseColor(p.tint, p.sat);
  const w = size * GEM_GEOM.halfWidthFrac;
  const h = size * GEM_GEOM.halfHeightFrac;
  const cx = size / 2;
  const cy = size * GEM_BOX_RATIO_LOCAL * GEM_GEOM.centerYFrac;
  const wInset = w * GEM_GEOM.waistInset;
  const T = [cx, cy - h * GEM_GEOM.topFrac];
  const SL = [cx - w, cy - h * GEM_GEOM.girdleFrac];
  const SR = [cx + w, cy - h * GEM_GEOM.girdleFrac];
  const WL = [cx - wInset, cy + h * GEM_GEOM.waistFrac];
  const WR = [cx + wInset, cy + h * GEM_GEOM.waistFrac];
  const B = [cx, cy + h * GEM_GEOM.bottomFrac];
  const midTop = [cx, cy - h * GEM_GEOM.girdleFrac];
  const midBot = [cx, cy + h * GEM_GEOM.waistFrac];
  const P = (a) => `${a[0].toFixed(2)},${a[1].toFixed(2)}`;
  const outline = `M${P(T)} L${P(SR)} L${P(WR)} L${P(B)} L${P(WL)} L${P(SL)} Z`;
  const lit = (c, f) => `rgb(${c.map((v) => Math.min(255, Math.round(v * f))).join(',')})`;
  const id = 'g' + Math.random().toString(36).slice(2, 8);
  // Facets: left lit, right shaded, keyed off the same vertices as the native cut.
  const facets = [
    { d: `M${P(T)} L${P(SL)} L${P(midTop)} Z`, f: 1.34 },
    { d: `M${P(T)} L${P(SR)} L${P(midTop)} Z`, f: 0.82 },
    { d: `M${P(SL)} L${P(WL)} L${P(midBot)} L${P(midTop)} Z`, f: 1.12 },
    { d: `M${P(SR)} L${P(WR)} L${P(midBot)} L${P(midTop)} Z`, f: 0.68 },
    { d: `M${P(WL)} L${P(B)} L${P(midBot)} Z`, f: 0.94 },
    { d: `M${P(WR)} L${P(B)} L${P(midBot)} Z`, f: 0.56 },
  ];
  return `
<svg viewBox="0 0 ${size} ${size * GEM_BOX_RATIO_LOCAL}" width="${size}" height="${size * GEM_BOX_RATIO_LOCAL}" aria-hidden="true">
  <defs>
    <radialGradient id="${id}h" cx="50%" cy="46%" r="50%">
      <stop offset="0%" stop-color="${lit(base, 1.15)}" stop-opacity="${(0.55 * p.glow).toFixed(3)}"/>
      <stop offset="55%" stop-color="${lit(base, 0.9)}" stop-opacity="${(0.22 * p.glow).toFixed(3)}"/>
      <stop offset="100%" stop-color="${lit(base, 0.8)}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${id}b" x1="0" y1="0" x2="0.35" y2="1">
      <stop offset="0%" stop-color="${lit(base, 1.28)}"/>
      <stop offset="52%" stop-color="${lit(base, 0.98)}"/>
      <stop offset="100%" stop-color="${lit(base, 0.62)}"/>
    </linearGradient>
    <clipPath id="${id}c"><path d="${outline}"/></clipPath>
  </defs>
  <ellipse cx="${cx}" cy="${cy}" rx="${w * 2.1}" ry="${h * 1.9}" fill="url(#${id}h)"/>
  <path d="${outline}" fill="url(#${id}b)" opacity="${p.opa}"/>
  <g clip-path="url(#${id}c)">
    ${facets.map((f) => `<path d="${f.d}" fill="${lit(base, f.f)}" opacity="0.5"/>`).join('')}
    <ellipse cx="${cx}" cy="${cy - h * 0.1}" rx="${w * 0.42}" ry="${h * 0.3}"
             fill="#FFF6E0" opacity="${(0.42 * p.glow).toFixed(3)}"/>
    <g transform="rotate(${angleDeg.toFixed(1)} ${cx} ${cy})">
      <rect x="${cx - w * 1.6}" y="${cy - h * 0.16}" width="${w * 3.2}" height="${h * 0.2}"
            fill="#FFFFFF" opacity="0.32"/>
    </g>
  </g>
  <path d="${outline}" fill="none" stroke="rgba(255,250,238,0.72)" stroke-width="${(size * 0.018).toFixed(2)}"/>
  <path d="M${P(T)} L${P(SL)}" stroke="#FFFFFF" stroke-width="${(size * 0.026).toFixed(2)}"
        stroke-linecap="round" opacity="0.8" fill="none"/>
</svg>`;
}
export { FINISH_FS, createFinish, drawOrb, gemSvg };
