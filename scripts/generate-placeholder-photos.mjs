#!/usr/bin/env node
/**
 * Generates abstract, film-grain placeholder photos for the /film gallery.
 * These are honest placeholders (color studies, not fake photographs) meant
 * to be replaced by real scans in src/photos/. Run: node scripts/generate-placeholder-photos.mjs
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const OUT = new URL('../src/photos/', import.meta.url).pathname;
await mkdir(OUT, { recursive: true });

/** @type {{name:string,w:number,h:number,stops:[string,string][],horizon?:{y:number,color:string,opacity:number},angle?:number}[]} */
const studies = [
  { name: 'placeholder-01-dawn',     w: 1600, h: 1067, stops: [['#c9d5e8', 0], ['#e8d8d3', 62], ['#f2e6da', 100]], horizon: { y: 0.66, color: '#8fa3bd', opacity: 0.25 } },
  { name: 'placeholder-02-dusk',     w: 1600, h: 1067, stops: [['#2c3a5c', 0], ['#5d6b8d', 55], ['#c98d5f', 100]], horizon: { y: 0.78, color: '#1d2740', opacity: 0.5 } },
  { name: 'placeholder-03-sea',      w: 1600, h: 1000, stops: [['#9fb8c4', 0], ['#5b8291', 52], ['#2e4f5c', 100]], horizon: { y: 0.52, color: '#eef3f4', opacity: 0.35 } },
  { name: 'placeholder-04-fog',      w: 1067, h: 1600, stops: [['#e3e6e8', 0], ['#c3c9cd', 60], ['#a9b1b6', 100]] },
  { name: 'placeholder-05-pine',     w: 1067, h: 1600, stops: [['#d7ded6', 0], ['#7f957e', 55], ['#3d5142', 100]] },
  { name: 'placeholder-06-night',    w: 1400, h: 1400, stops: [['#232c44', 0], ['#39466b', 55], ['#141a2c', 100]], angle: 30 },
  { name: 'placeholder-07-field',    w: 1600, h: 1067, stops: [['#dfe3cf', 0], ['#c2c193', 50], ['#8f9464', 100]], horizon: { y: 0.6, color: '#6d7350', opacity: 0.3 } },
  { name: 'placeholder-08-heather',  w: 1067, h: 1600, stops: [['#b9aec4', 0], ['#8d829f', 55], ['#5c5470', 100]] },
  { name: 'placeholder-09-ice',      w: 1400, h: 1400, stops: [['#eef2f5', 0], ['#c9d8e2', 55], ['#9fb6c6', 100]], angle: -20 },
  { name: 'placeholder-10-ember',    w: 1600, h: 1067, stops: [['#4a3038', 0], ['#7d4638', 55], ['#b5764a', 100]], horizon: { y: 0.7, color: '#2c1d24', opacity: 0.45 } },
];

function gradientSvg({ w, h, stops, horizon, angle = 0 }) {
  const rad = (angle * Math.PI) / 180;
  const x2 = 50 + Math.sin(rad) * 50;
  const y2 = 100 - (50 - Math.cos(rad) * 50);
  const stopEls = stops
    .map(([color, off]) => `<stop offset="${off}%" stop-color="${color}"/>`)
    .join('');
  const horizonEl = horizon
    ? `<rect x="0" y="${horizon.y * h}" width="${w}" height="${h * 0.012}" fill="${horizon.color}" opacity="${horizon.opacity}"/>`
    : '';
  return Buffer.from(`<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="50%" y1="0%" x2="${x2}%" y2="${y2}%">${stopEls}</linearGradient>
      <radialGradient id="v" cx="50%" cy="46%" r="75%">
        <stop offset="60%" stop-color="#000" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000" stop-opacity="0.16"/>
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    ${horizonEl}
    <rect width="100%" height="100%" fill="url(#v)"/>
  </svg>`);
}

for (const study of studies) {
  const { name, w, h } = study;
  const grain = await sharp({
    create: { width: w, height: h, channels: 3, noise: { type: 'gaussian', mean: 128, sigma: 13 } },
  })
    .png()
    .toBuffer();

  await sharp(gradientSvg(study))
    .composite([{ input: grain, blend: 'soft-light' }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(OUT, `${name}.jpg`));
  console.log('generated', `${name}.jpg`);
}
