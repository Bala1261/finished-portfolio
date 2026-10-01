import React from 'react';

export default function Marquee({ items }) {
  const words = items || ['WRITING', 'STRATEGY', 'IDEAS', 'BUSINESS', 'CREATIVITY', 'CLARITY'];
  const repeated = [...words, ...words, ...words, ...words];

  return (
    <div className="marquee-section" aria-hidden="true">
      <div className="marquee-track">
        {repeated.map((word, i) => (
          <div key={i} className="marquee-item">
            {word} <span>&bull;</span>
          </div>
        ))}
      </div>
    </div>
  );
}
