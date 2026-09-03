/* =============================================================================
   COLLECTIBLE CARD V3 — WEB FIDELITY PORT
   -----------------------------------------------------------------------------
   A port of the app's CollectibleCardV3, not an impression of it. Every number
   below is copied from the canonical source, and the files it came from are
   named at each block so drift is checkable:

     collectible-v3-geometry.ts      the silhouette, orb anchor, plaque, top bar
     collectible-v3-plaque-layout.ts the plaque's type tiers
     finish-sksl-v3.ts               the rarity finish shader (ported SkSL -> GLSL)
     finish-motion.ts                the deterministic finish state vector
     finish-layout.ts                the per-card seeded layout (splitmix32)
     rarity-finish.ts                the tier vocabulary
     comfort-material.ts             the comfort surface
     collectible-ink.ts              card stock + ink
     viz/tokens.ts + viz/orb         the orb palette and scene
     viz/gem/RarityGem.tsx           the gem silhouette + tier params
     world-posters-v3.ts             the measured world composition (mascot lift)

   🔴 THE RATIO IS LOCKED AT 2:3, imported from the frozen V2 contract. It is NOT
      the poster's 848x1264. A card built on the poster ratio is the wrong object.
   ============================================================================= */

/* --- tokens/collectible-geometry.ts ---------------------------------------- */
export const CARD_ASPECT_W = 2;
export const CARD_ASPECT_H = 3;

/* --- collectible-v3-geometry.ts (verbatim) --------------------------------- */
const V3_CARD_RADIUS_FRACTION = 0.055;
const V3_FRAME_FRACTION = 0.028;
const V3_BEVEL_FRACTION = 0.004;
const V3_ORB_DIAMETER_FRACTION = 0.28;
const V3_ORB_CENTER_X_FRACTION = 0.5;
const V3_ORB_CENTER_Y_FRACTION = 0.28;
const ORB_BOX_RADIUS_FRAC = 0.287;
const ORB_BOX_HEIGHT_RATIO = 160 / 150;
const ORB_BOX_CENTER_Y_FRAC = 0.42;
const V3_PLAQUE_HEIGHT_FRACTION = 0.175;
const V3_PLAQUE_INSET_FRACTION = 0.035;
const V3_PLAQUE_RADIUS_FRACTION = 0.04;
const V3_PLAQUE_PAD_X_FRACTION = 0.05;
const V3_PLAQUE_PAD_TOP_FRACTION = 0.024;
const V3_PLAQUE_PAD_BOTTOM_FRACTION = 0.02;
const V3_TOPBAR_TOP_FRACTION = 0.062;
const V3_TOPBAR_HEIGHT_FRACTION = 0.064;
const V3_TOPBAR_BULB_FRACTION = 0.08;
const V3_TOPBAR_SIDE_INSET_FRACTION = 0.062;
const V3_GEM_FRACTION = 0.052;
const V3_MASCOT_CLEAR_MARGIN = 0.06;
const V3_WORLD_LIFT_MAX = 0.2;
const V3_ORB_HOVER_AMPLITUDE_FRACTION = 0.022;

/** Resolve every V3 measurement from ONE card width. Height is never free. */
export function v3BoxFromWidth(width) {
  const w = Math.max(0, width);
  const height = (w * CARD_ASPECT_H) / CARD_ASPECT_W;
  const frame = w * V3_FRAME_FRACTION;
  const radius = w * V3_CARD_RADIUS_FRACTION;
  const artX = frame, artY = frame;
  const artW = w - frame * 2, artH = height - frame * 2;
  const artRadius = Math.max(0, radius - frame);

  const orbDiameter = w * V3_ORB_DIAMETER_FRACTION;
  const orbCenterX = w * V3_ORB_CENTER_X_FRACTION;
  const orbCenterY = height * V3_ORB_CENTER_Y_FRACTION;
  const orbBoxSize = orbDiameter / (ORB_BOX_RADIUS_FRAC * 2);
  const orbBoxX = orbCenterX - orbBoxSize / 2;
  const orbBoxY = orbCenterY - orbBoxSize * ORB_BOX_HEIGHT_RATIO * ORB_BOX_CENTER_Y_FRAC;

  const plaqueInset = w * V3_PLAQUE_INSET_FRACTION;
  const plaqueH = height * V3_PLAQUE_HEIGHT_FRACTION;
  const plaqueW = w - plaqueInset * 2;
  const plaqueX = plaqueInset;
  const plaqueY = height - plaqueInset - plaqueH;
  const plaquePadX = w * V3_PLAQUE_PAD_X_FRACTION;
  const plaquePadTop = w * V3_PLAQUE_PAD_TOP_FRACTION;
  const plaquePadBottom = w * V3_PLAQUE_PAD_BOTTOM_FRACTION;

  const bulbD = w * V3_TOPBAR_BULB_FRACTION;
  const topBarH = w * V3_TOPBAR_HEIGHT_FRACTION;
  const topBarX = w * V3_TOPBAR_SIDE_INSET_FRACTION;
  const bulbCx = topBarX + bulbD / 2;
  const bulbCy = w * V3_TOPBAR_TOP_FRACTION + bulbD / 2;
  const topBarY = bulbCy - topBarH / 2;
  const topBarW = w - topBarX * 2;

  const gemW = w * V3_GEM_FRACTION;
  const gemCenterX = plaqueX + plaqueW - plaquePadX - gemW / 2;
  const gemCenterY = plaqueY + plaquePadTop + gemW * 0.58;

  return {
    width: w, height, radius, frame, bevel: Math.max(1, w * V3_BEVEL_FRACTION),
    artX, artY, artW, artH, artRadius,
    orbCenterX, orbCenterY, orbDiameter, orbBoxSize, orbBoxX, orbBoxY,
    plaqueX, plaqueY, plaqueW, plaqueH,
    plaqueRadius: w * V3_PLAQUE_RADIUS_FRACTION,
    plaquePadX, plaquePadTop, plaquePadBottom,
    gemW, gemCenterX, gemCenterY,
    topBarX, topBarY, topBarW, topBarH, topBarR: topBarH / 2,
    bulbCx, bulbCy, bulbD,
  };
}

/** The plaque's top edge as a fraction of the ART WINDOW height. */
export function v3PlaqueTopArtFraction(box) {
  if (box.artH <= 0) return 1;
  return (box.plaqueY - box.artY) / box.artH;
}

/** The ONE deck-wide mascot-safe lift rule. Per-asset data in, one translate out. */
export function v3WorldLiftFraction(composition, box) {
  if (composition === null) return 0;
  const needed = composition.mascotBottomF + V3_MASCOT_CLEAR_MARGIN - v3PlaqueTopArtFraction(box);
  const budget = Math.min(V3_WORLD_LIFT_MAX, Math.max(0, composition.topCropBudgetF));
  return Math.min(budget, Math.max(0, needed));
}
export function v3WorldLiftPx(composition, box) {
  return v3WorldLiftFraction(composition, box) * box.artH;
}

/** The orb's restrained buoyancy around the LOCKED anchor. Parks at 0 when frozen. */
export function v3OrbHoverDy(timeSeconds, loopSeconds, orbDiameter) {
  if (loopSeconds <= 0) return 0;
  const phase = (((timeSeconds / loopSeconds) % 1) + 1) % 1;
  const rise = 0.5 - 0.5 * Math.cos(Math.PI * 2 * phase);
  return -orbDiameter * V3_ORB_HOVER_AMPLITUDE_FRACTION * rise;
}

/* --- world-posters-v3.ts: MEASURED composition for this world -------------- */
export const WORLD_COMPOSITIONS = {
  this_is_absolutely_fine: { mascotTopF: 0.71, mascotBottomF: 0.845, topCropBudgetF: 0.18 },
};

/* --- collectible-ink.ts ----------------------------------------------------- */
export const CARD_INK = { title: '#F0ECE3', why: '#DAD3C7', vitals: '#A39A8E', orbNumber: '#FFFFFF' };
export const CARD_STOCK = { dark: '#0E0810', light: '#FFF3E2', white: '#FFFFFF' };
export const V3_INK = {
  plaqueShade: 'rgba(0, 0, 0, 0.36)',
  plaqueTopSheen: 'rgba(255, 255, 255, 0.12)',
  socketShadow: 'rgba(0, 0, 0, 1)',
  loadTrack: 'rgba(240, 236, 227, 0.2)',
  loadMarker: '#FFC857',
  loadMarkerGlow: 'rgba(255, 200, 87, 0.35)',
  noData: 'rgba(163, 154, 142, 0.62)',
  worldGround: 'rgba(10, 6, 16, 1)',
};

/* --- comfort-material.ts ---------------------------------------------------- */
export const COMFORT_MATERIAL = {
  concrete: {
    label: 'Concrete',
    character: 'Hard cool stone. A tight rim, a restrained aggregate roughness, no give.',
    overlayColor: '#8C8E96', overlayOpacity: 0.075, grain: 0.5,
    edgeColor: 'rgba(174, 182, 196, 0.62)', edgeSoftness: 0.16,
    glassTint: 'rgba(25, 26, 32, 0.66)', glassFrost: 0.9,
    socketTint: 'rgba(150, 158, 174, 0.58)', orbSpecular: 0.55,
    highlight: 'rgba(232, 240, 252, 0.6)',
  },
};

/* --- rarity-finish.ts: the tier vocabulary --------------------------------- */
export const RARITY_FINISH = {
  rare: {
    label: 'Localized refractive foil',
    catchWidthFraction: 0.085, chromaSplit: 0.5, laminateOpacity: 0.22,
    holoShimmer: 0.13, holoSparkle: 0.55, holoPlay: 0, fractureOpacity: 0,
    edgeLight: 0.62, orbParticipation: 0.35, gemParticipation: 0.5,
    glint: '#FFFAF0', glintOpacity: 0.5, glintRadiusFraction: 0.045,
  },
  legendary: {
    label: 'Prismatic laminate',
    catchWidthFraction: 0.075, chromaSplit: 0.65, laminateOpacity: 0.27,
    holoShimmer: 0.2, holoSparkle: 0.8, holoPlay: 0.13, fractureOpacity: 0.22,
    edgeLight: 1, orbParticipation: 0.55, gemParticipation: 0.7,
    glint: '#FFFDF6', glintOpacity: 0.58, glintRadiusFraction: 0.052,
  },
};

/* --- finish-motion.ts: RARITY_MOTION + the static sample -------------------- */
const RARITY_MOTION = {
  rare: { loopSeconds: 8.5, catchTravel: 1, catchPulse: 0.18, causticBloom: 0.55,
          glintBreath: 0.18, orbBreath: 0.3, gemSweepDegrees: 120 },
  legendary: { loopSeconds: 6.5, catchTravel: 1, catchPulse: 0.24, causticBloom: 0.8,
               glintBreath: 0.24, orbBreath: 0.4, gemSweepDegrees: 240 },
};
export const STATIC_SAMPLE_PHASE = 0.18;
const TAU = Math.PI * 2;

/* --- finish-layout.ts: splitmix32, verbatim so the seed reproduces ---------- */
function nextBits(state) {
  let s = (state + 0x9e3779b9) >>> 0;
  let z = s;
  z = (Math.imul(z ^ (z >>> 16), 0x21f0aaad) >>> 0) >>> 0;
  z = (Math.imul(z ^ (z >>> 15), 0x735a2d97) >>> 0) >>> 0;
  z = (z ^ (z >>> 15)) >>> 0;
  return { value: z, state: s >>> 0 };
}
function sampler(seed) {
  let state = Number.isFinite(seed) ? Math.abs(Math.trunc(seed)) >>> 0 : 0;
  return { unit() { const n = nextBits(state); state = n.state; return n.value / 0x100000000; } };
}
const lerp = (range, t) => range[0] + (range[1] - range[0]) * t;

const TIER_RANGES = {
  rare: { glintX: [0.08, 0.92], glintY: [0.08, 0.6], foilAngle: [20, 36], causticX: [0.12, 0.88], causticY: [0.12, 0.56] },
  legendary: { glintX: [0.06, 0.94], glintY: [0.06, 0.62], foilAngle: [18, 38], causticX: [0.1, 0.9], causticY: [0.1, 0.58] },
};

/**
 * The seeded layout. The DRAW ORDER matters: each field consumes its own draw, so
 * the sequence here must match the native `finishLayoutFor` exactly or the same
 * seed produces a different card. Patch placement is skipped for the fields the
 * planar model no longer draws, but its draws are still CONSUMED in order.
 */
export function finishLayoutFor(seed, rarity, foilPatchCount, opalPatchCount) {
  const r = TIER_RANGES[rarity];
  const s = sampler(seed ?? 0);
  const glintX = lerp(r.glintX, s.unit());
  const glintY = lerp(r.glintY, s.unit());
  const foilAngle = lerp(r.foilAngle, s.unit());
  // placePatches consumes 2 draws per patch (x, y) in the native implementation.
  for (let i = 0; i < foilPatchCount * 2; i++) s.unit();
  for (let i = 0; i < opalPatchCount * 2; i++) s.unit();
  const catchStart = s.unit();
  const causticX = lerp(r.causticX, s.unit());
  const causticY = lerp(r.causticY, s.unit());
  const gemHighlightAngle = lerp([-180, 180], s.unit());
  const noiseOffsetX = s.unit();
  const noiseOffsetY = s.unit();
  return { tier: rarity, glintX, glintY, foilAngle, catchStart, causticX, causticY,
           gemHighlightAngle, noiseOffsetX, noiseOffsetY };
}

/** finish-motion.ts `finishStateAt` — everything time is allowed to change. */
export function finishStateAt(layout, rarity, time, reduceMotion) {
  const m = RARITY_MOTION[rarity];
  const phase = reduceMotion ? STATIC_SAMPLE_PHASE : (((time / m.loopSeconds) % 1) + 1) % 1;
  const breath = Math.sin(TAU * phase);
  const slowBeat = Math.sin(TAU * (phase * 3 + 0.25));
  const travelPhase = (((layout.catchStart + m.catchTravel * phase) % 1) + 1) % 1;
  const catchOffset = -0.25 + 1.5 * travelPhase;
  return {
    phase, catchOffset,
    causticDx: m.causticBloom * 0.06 * slowBeat,
    causticDy: m.causticBloom * 0.04 * breath,
    causticOpacityScale: 1 - m.causticBloom * 0.45 * (0.5 - 0.5 * slowBeat),
    glintScale: 1 + m.glintBreath * breath,
    fractureScale: 0.68 + 0.32 * (0.5 + 0.5 * Math.sin(TAU * (phase * 2 + 0.5))),
    orbHaloScale: 1 - m.orbBreath + m.orbBreath * (0.5 + 0.5 * breath),
    gemAngle: layout.gemHighlightAngle + m.gemSweepDegrees * phase,
    isStatic: !!reduceMotion,
  };
}
export const loopSecondsFor = (rarity) => RARITY_MOTION[rarity].loopSeconds;

/* --- viz/tokens.ts: the orb's comfort bands + score mapping ----------------- */
export const COMFORT_BANDS_RGB = {
  concrete: { core: [255, 190, 150], mid: [225, 90, 55], outer: [140, 48, 38] },
  dirt:     { core: [255, 200, 150], mid: [240, 120, 55], outer: [165, 62, 35] },
  cardboard:{ core: [255, 215, 160], mid: [255, 150, 60], outer: [190, 85, 38] },
  couch:    { core: [255, 228, 175], mid: [255, 178, 75], outer: [215, 115, 45] },
  mattress: { core: [255, 243, 200], mid: [255, 210, 110], outer: [240, 165, 70] },
  feather:  { core: [255, 248, 245], mid: [255, 225, 225], outer: [255, 190, 205] },
  cloud:    { core: [235, 245, 255], mid: [150, 200, 255], outer: [120, 160, 240] },
};
/** comfort-type-service.ts */
export function assignComfortType(score) {
  if (score >= 90) return 'cloud';
  if (score >= 80) return 'feather';
  if (score >= 70) return 'mattress';
  if (score >= 55) return 'couch';
  if (score >= 40) return 'cardboard';
  if (score >= 25) return 'dirt';
  return 'concrete';
}
/** RecoveryOrb.tsx `useOrbScene`: the locked energy curve. */
export const orbEnergy = (score) => Math.max(0.08, (score - 25) / 73);

/* --- viz/gem/RarityGem.tsx: silhouette + tier params ------------------------ */
export const GEM_BOX_RATIO = 1.08;
export const GEM_GEOM = {
  halfWidthFrac: 0.37, halfHeightFrac: 0.44, centerYFrac: 0.46,
  topFrac: 0.85, girdleFrac: 0.3, waistFrac: 0.18, bottomFrac: 0.95, waistInset: 0.62,
};
export const GEM_RAMP = [[201,56,30],[255,106,46],[255,179,71],[255,233,168],[255,246,224]];
export const GEM_TIER_PARAMS = {
  rare:      { tint: 0.66, sat: 1.0, glow: 0.7, opa: 0.6,  fleck: 0, spark: 2 },
  legendary: { tint: 0.9,  sat: 1.0, glow: 1.0, opa: 0.62, fleck: 6, spark: 4 },
};
/** Sample the warm ramp at `tint` (0..1) and desaturate toward grey by `sat`. */
export function gemBaseColor(tint, sat) {
  const t = Math.max(0, Math.min(1, tint)) * (GEM_RAMP.length - 1);
  const i = Math.min(GEM_RAMP.length - 2, Math.floor(t));
  const f = t - i;
  const a = GEM_RAMP[i], b = GEM_RAMP[i + 1];
  const rgb = [0, 1, 2].map((k) => a[k] + (b[k] - a[k]) * f);
  const grey = rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114;
  return rgb.map((c) => Math.round(grey + (c - grey) * sat));
}

/* --- collectible-v3-plaque-layout.ts: the type tiers ----------------------- */
const TITLE_GLYPH_FRACTION = 0.545;
const WHY_GLYPH_FRACTION = 0.5;
const PLAQUE_TIERS = {
  base:    { chipFontSize: 0.022, chipLineHeight: 0.028, chipPadV: 0.00425,
             title: { fontSize: 0.058, lineHeight: 0.068, marginTop: 0.012, lines: 1 },
             why:   { fontSize: 0.03,  lineHeight: 0.04,  marginTop: 0.007, lines: 2 } },
  compact: { chipFontSize: 0.022, chipLineHeight: 0.028, chipPadV: 0.00425,
             title: { fontSize: 0.05,  lineHeight: 0.059, marginTop: 0.01,  lines: 2 },
             why:   { fontSize: 0.03,  lineHeight: 0.04,  marginTop: 0.007, lines: 1 } },
  dense:   { chipFontSize: 0.021, chipLineHeight: 0.026, chipPadV: 0.004,
             title: { fontSize: 0.047, lineHeight: 0.051, marginTop: 0.008, lines: 2 },
             why:   { fontSize: 0.027, lineHeight: 0.032, marginTop: 0.005, lines: 2 } },
};
function estimatePlaqueLines(text, fontSizeFraction, availableWidthFraction, glyphFraction) {
  return text.length * fontSizeFraction * glyphFraction <= availableWidthFraction ? 1 : 2;
}
export function plaqueLayoutFor(title, why, availableWidthFraction) {
  const titleLines = estimatePlaqueLines(title, PLAQUE_TIERS.base.title.fontSize, availableWidthFraction, TITLE_GLYPH_FRACTION);
  if (titleLines === 1) return { tier: 'base', ...PLAQUE_TIERS.base };
  const whyLines = estimatePlaqueLines(why, PLAQUE_TIERS.compact.why.fontSize, availableWidthFraction, WHY_GLYPH_FRACTION);
  return whyLines === 1 ? { tier: 'compact', ...PLAQUE_TIERS.compact } : { tier: 'dense', ...PLAQUE_TIERS.dense };
}
