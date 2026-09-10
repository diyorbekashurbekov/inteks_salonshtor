/**
 * Universal Asset URL resolver
 * Works on Localhost, Vercel, Netlify, and GitHub Pages (subpath repositories)
 */
export function getAssetUrl(filename) {
  if (!filename) return './assets/img/curtain-palace-peacock-hall.jpg';
  if (filename.startsWith('http://') || filename.startsWith('https://') || filename.startsWith('data:')) {
    return filename;
  }
  
  const base = import.meta.env.BASE_URL || './';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = filename.startsWith('/') ? filename.slice(1) : filename;
  
  if (cleanPath.startsWith('assets/')) {
    return `${cleanBase}${cleanPath}`;
  }
  
  return `${cleanBase}assets/img/${cleanPath}`;
}
