'use client';

import { useEffect, useState } from 'react';

export default function IntroHeading() {
  const [showHeading, setShowHeading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowHeading(window.scrollY < 900);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <h2
      className={`absolute inset-0 top-[30%] flex items-center justify-center text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl text-blue-400 font-bold neon-text transition-opacity duration-700 ease-in-out ${
        showHeading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      Crafted with 💙 by Rajinder Kumar – Dropbox UI Clone
    </h2>
  );
}
