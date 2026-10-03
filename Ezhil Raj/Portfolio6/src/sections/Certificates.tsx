import React from 'react';
import { PortfolioCertificateItem } from '../types/bexo';
import { SectionHeading } from '../components/SectionHeading';
import { ExternalLink } from '../components/ExternalLink';
import { AssetRenderer } from '../components/AssetRenderer';
import { formatPortfolioDate } from '../utils/date';
import { Award, Building, Calendar } from 'lucide-react';
import './Certificates.css';

interface CertificatesProps {
  certificates?: PortfolioCertificateItem[];
}

export const Certificates: React.FC<CertificatesProps> = ({ certificates }) => {
  if (!certificates || certificates.length === 0) {
    return null;
  }

  return (
    <section id="certificates" className="bexo-certificates-section">
      <SectionHeading
        eyebrow="CREDENTIALS"
        title="Certifications & Licenses"
        subtitle="Verified professional certifications and technical specializations"
      />

      <div className="bexo-certificates-grid">
        {certificates.map((cert) => {
          const dateLabel = cert.dateLabel || formatPortfolioDate(cert.date);
          const primaryAsset = cert.assets && cert.assets.length > 0 ? cert.assets[0] : undefined;

          return (
            <div key={cert.id} className="bexo-cert-card">
              {primaryAsset && (
                <div className="bexo-cert-asset">
                  <AssetRenderer asset={primaryAsset} aspectRatio="16/9" />
                </div>
              )}

              <div className="bexo-cert-content">
                <div className="bexo-cert-header">
                  <Award className="bexo-cert-badge-icon" aria-hidden="true" />
                  <div className="bexo-cert-title-wrap">
                    <h3 className="bexo-cert-title">{cert.title}</h3>
                    {cert.issuer && (
                      <div className="bexo-cert-issuer">
                        <Building className="bexo-cert-meta-icon" aria-hidden="true" />
                        <span>{cert.issuer}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bexo-cert-footer">
                  {dateLabel && (
                    <span className="bexo-cert-date">
                      <Calendar className="bexo-cert-meta-icon" aria-hidden="true" />
                      <span>{dateLabel}</span>
                    </span>
                  )}

                  {cert.credentialUrl && (
                    <ExternalLink
                      url={cert.credentialUrl}
                      label="View Credential"
                      className="bexo-cert-link"
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
