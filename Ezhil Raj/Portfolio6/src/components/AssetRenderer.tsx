import React, { useState } from 'react';
import { PortfolioAsset } from '../types/bexo';
import { sanitizeUrl } from '../utils/safeUrl';
import { FileText, Image as ImageIcon, ExternalLink } from 'lucide-react';
import './AssetRenderer.css';

interface AssetRendererProps {
  asset?: PortfolioAsset;
  className?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | 'auto';
  objectFit?: 'cover' | 'contain';
}

export const AssetRenderer: React.FC<AssetRendererProps> = ({
  asset,
  className = '',
  aspectRatio = '16/9',
  objectFit = 'cover',
}) => {
  const [hasError, setHasError] = useState(false);

  if (!asset || !asset.url) {
    return (
      <div className={`bexo-asset-fallback aspect-${aspectRatio.replace('/', '-')} ${className}`.trim()}>
        <ImageIcon className="bexo-asset-icon-empty" aria-hidden="true" />
      </div>
    );
  }

  const safeUrl = sanitizeUrl(asset.url);
  if (!safeUrl) {
    return null;
  }

  const altText = asset.alt || asset.name || 'Portfolio visual media';

  if (asset.kind === 'pdf') {
    return (
      <div className={`bexo-asset-pdf-card aspect-${aspectRatio.replace('/', '-')} ${className}`.trim()}>
        <FileText className="bexo-asset-pdf-icon" aria-hidden="true" />
        <div className="bexo-asset-pdf-info">
          <span className="bexo-asset-pdf-name">{asset.name || 'Document PDF'}</span>
          {asset.sizeBytes && (
            <span className="bexo-asset-pdf-size">
              {(asset.sizeBytes / 1024 / 1024).toFixed(1)} MB
            </span>
          )}
        </div>
        <a
          href={safeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bexo-asset-pdf-btn"
          aria-label={`View PDF ${asset.name || ''} in new tab`}
        >
          <span>Open PDF</span>
          <ExternalLink className="bexo-asset-pdf-btn-icon" aria-hidden="true" />
        </a>
      </div>
    );
  }

  if (asset.kind === 'video') {
    return (
      <div className={`bexo-asset-video-wrap aspect-${aspectRatio.replace('/', '-')} ${className}`.trim()}>
        <video
          src={safeUrl}
          controls
          playsInline
          preload="metadata"
          className="bexo-asset-video"
          aria-label={altText}
          onError={() => setHasError(true)}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  // Kind is image or fallback
  if (hasError) {
    return (
      <div className={`bexo-asset-fallback aspect-${aspectRatio.replace('/', '-')} ${className}`.trim()}>
        <ImageIcon className="bexo-asset-icon-empty" aria-hidden="true" />
        <span className="bexo-asset-name">{asset.name || 'Image Preview'}</span>
      </div>
    );
  }

  return (
    <div className={`bexo-asset-image-wrap aspect-${aspectRatio.replace('/', '-')} ${className}`.trim()}>
      <img
        src={safeUrl}
        alt={altText}
        loading="lazy"
        decoding="async"
        className="bexo-asset-image"
        style={{ objectFit }}
        onError={() => setHasError(true)}
      />
    </div>
  );
};
