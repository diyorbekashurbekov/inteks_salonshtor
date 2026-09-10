// Ultra-Fast Image Preloading & In-Memory Cache Engine
// Ensures zero-delay image display, off-thread decoding, and seamless mobile performance

import { getAssetUrl } from './assets';

const imageCache = new Set();
const preloadingQueue = new Set();

/**
 * Preloads a single image and decodes it asynchronously off the main thread
 * @param {string} src 
 * @returns {Promise<boolean>}
 */
export function preloadSingleImage(src) {
  if (!src) return Promise.resolve(false);
  if (imageCache.has(src)) return Promise.resolve(true);
  if (preloadingQueue.has(src)) return Promise.resolve(false);

  preloadingQueue.add(src);

  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;

    // Use HTMLImageElement.decode() if supported to decode off the main thread
    if ('decode' in img) {
      img.decode()
        .then(() => {
          imageCache.add(src);
          preloadingQueue.delete(src);
          resolve(true);
        })
        .catch(() => {
          // Fallback if decode fails (e.g. image still loads)
          img.onload = () => {
            imageCache.add(src);
            preloadingQueue.delete(src);
            resolve(true);
          };
          img.onerror = () => {
            preloadingQueue.delete(src);
            resolve(false);
          };
        });
    } else {
      img.onload = () => {
        imageCache.add(src);
        preloadingQueue.delete(src);
        resolve(true);
      };
      img.onerror = () => {
        preloadingQueue.delete(src);
        resolve(false);
      };
    }
  });
}

/**
 * Preloads an array of image URLs
 * @param {string[]} sources 
 */
export function preloadBatch(sources) {
  if (!Array.isArray(sources)) return;
  sources.forEach((src) => {
    if (src && !imageCache.has(src)) {
      preloadSingleImage(src);
    }
  });
}

/**
 * Progressively preloads all project images during idle time
 * @param {Array<{filename: string}>} projects 
 */
export function preloadAllProjectsProgressive(projects) {
  if (!Array.isArray(projects) || projects.length === 0) return;

  // 1. Prioritize first 8 projects immediately
  const highPriority = projects.slice(0, 8);
  highPriority.forEach((p) => {
    const src = getAssetUrl(p.filename);
    preloadSingleImage(src);
  });

  // 2. Queue remaining projects progressively using requestIdleCallback or setTimeout
  const remaining = projects.slice(8);
  let index = 0;

  const loadNextChunk = () => {
    if (index >= remaining.length) return;
    const chunk = remaining.slice(index, index + 4);
    chunk.forEach((p) => {
      const src = getAssetUrl(p.filename);
      preloadSingleImage(src);
    });
    index += 4;

    if (index < remaining.length) {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => loadNextChunk(), { timeout: 1200 });
      } else {
        setTimeout(loadNextChunk, 200);
      }
    }
  };

  // Start background preloading after 800ms initial render
  setTimeout(() => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => loadNextChunk(), { timeout: 1500 });
    } else {
      setTimeout(loadNextChunk, 400);
    }
  }, 800);
}

/**
 * Check if image is already cached
 * @param {string} src 
 * @returns {boolean}
 */
export function isImageCached(src) {
  return imageCache.has(src);
}
