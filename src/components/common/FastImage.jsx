import { useState, useEffect } from 'react';
import { isImageCached, preloadSingleImage } from '../../utils/imageOptimizer';
import { getAssetUrl } from '../../utils/assets';

/**
 * FastImage: High-performance, GPU-accelerated image component
 * - 0 layout shift (CLS)
 * - Async decoding off main thread
 * - Instant display if already cached
 * - Elegant luxury gold-shimmer placeholder while decoding
 * - Universal asset resolution (Localhost, Vercel, GitHub Pages)
 * - Graceful fallback on error
 */
export default function FastImage({
  src,
  alt = '',
  className = '',
  style = {},
  priority = false,
  onClick,
  fallback = './assets/img/curtain-palace-peacock-hall.jpg',
  imgClassName = '',
  ...rest
}) {
  const resolvedSrc = getAssetUrl(src);
  const resolvedFallback = getAssetUrl(fallback);
  const [isLoaded, setIsLoaded] = useState(() => isImageCached(resolvedSrc));
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!resolvedSrc) return;

    if (isImageCached(resolvedSrc)) {
      setIsLoaded(true);
      return;
    }

    let isMounted = true;
    preloadSingleImage(resolvedSrc).then((success) => {
      if (isMounted) {
        if (success) {
          setIsLoaded(true);
        } else {
          setHasError(true);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [resolvedSrc]);

  const activeSrc = hasError ? resolvedFallback : resolvedSrc;

  return (
    <div className={`relative overflow-hidden ${className}`} style={style} onClick={onClick}>
      {/* Shimmer Placeholder (active until image is decoded) */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#F5EFEB] via-[#EBE2D3] to-[#F5EFEB] bg-[length:200%_100%] animate-shimmer pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Actual Rendered Image */}
      <img
        src={activeSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName || 'object-contain'}`}
        {...rest}
      />
    </div>
  );
}
