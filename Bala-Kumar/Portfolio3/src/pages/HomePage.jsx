import React from 'react';
import HeroSection from '../components/HeroSection';

export default function HomePage({ onNavigate }) {
  return (
    <div className="space-y-12">
      <HeroSection onNavigate={onNavigate} />
    </div>
  );
}
