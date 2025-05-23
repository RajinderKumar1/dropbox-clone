'use client';

import { useEffect } from 'react';
import { cubicBezier as CB } from 'framer-motion';


const IntroAnimation = () => {
  useEffect(() => {
    const navForHomeScroll = document.querySelector('.nav') as HTMLElement;
    const navTiles = document.querySelectorAll('.nav-tile') as NodeListOf<HTMLElement>;
    const navTileGridlines = document.querySelectorAll('.nav-tile.nav-tile-gridlines') as NodeListOf<HTMLElement>;
    const navButton = document.querySelector('#nav-button') as HTMLElement;
    const horizontalTileLines = document.querySelectorAll(
      '.nav-tile.nav-tile-gridlines .tile-line.nav-t, .nav-tile.nav-tile-gridlines .tile-line.nav-b'
    ) as NodeListOf<HTMLElement>;
    const verticalTileLines = document.querySelectorAll(
      '.nav-tile.nav-tile-gridlines .tile-line.nav-l, .nav-tile.nav-tile-gridlines .tile-line.nav-r'
    ) as NodeListOf<HTMLElement>;
 
    if (!navForHomeScroll || !navButton) return;

    let baseWindowSize: number;
    const initialScale = 2;
    let scrollTimeout: Timeout;
    const easeFunction = CB(1, 0.25, 0.85, 1);

    const desktopTransformations = [
      [4, 2], [-0.1, 1], [-1, -0.1], [-4, 2],
      [4, -2], [1, 0.1], [0.1, -1], [-4, -2]
    ];

    const mobileTransformations = [
      [2, 3], [-2, 3], [0.25, 1.5], [-1.5, 0.25],
      [1.5, -0.25], [-0.25, -1.5], [2, -3], [-2, -3]
    ];

  
    const handleIntroResize = () => {
      if (document.documentElement.scrollHeight - window.innerHeight - window.scrollY <= 200) {
        window.scrollTo(0, document.documentElement.scrollHeight);
      }

      baseWindowSize = Math.max(window.innerWidth, window.innerHeight);

      handleIntroScroll();
    };

    const handleIntroScroll = () => {
      if (!handleIntroScroll.throttled) {
        handleIntroScroll.throttled = true;
        requestAnimationFrame(() => {
          introScrollHandler();
          handleIntroScroll.throttled = false;
        });
      }
    };

    const introScrollHandler = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 200) {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
      }, 250);

      const scrollProgress = Math.min(
        (window.scrollY || window.pageYOffset) / (document.body.offsetHeight - window.innerHeight),
        1
      );

      const easedScrollProgress = easeFunction(scrollProgress);
      const scale = initialScale - (initialScale - 1) * easedScrollProgress;
      const fwd = easedScrollProgress - 1;
      const bwd = 1 - easedScrollProgress;

      const highestTileYeet = (baseWindowSize - 90) / 2 / initialScale;

      const transformations = window.innerWidth <= 991 ? mobileTransformations : desktopTransformations;

      transformations.forEach(([x, y], i) => {
        const scaleTransform = `scale(${scale})`;
        const xTransform = (x > 0 ? fwd : bwd) * Math.abs(x * highestTileYeet);
        const yTransform = (y > 0 ? fwd : bwd) * Math.abs(y * highestTileYeet);
        const transform = `${scaleTransform} translate(${xTransform}px, ${yTransform}px)`;

        if (navTiles[i]) navTiles[i].style.transform = transform;
        if (navTileGridlines[i]) navTileGridlines[i].style.transform = transform;
      });

      horizontalTileLines.forEach(tile => {
        tile.style.transform = `translateX(50%) scaleY(${1 / scale})`;
      });

      verticalTileLines.forEach(tile => {
        tile.style.transform = `translateY(-50%) scaleX(${1 / scale})`;
      });

      // Truncated: Insert full scroll state logic here based on `easedScrollProgress`

    };

    handleIntroResize();
    window.addEventListener('load', () => handleIntroResize());
    window.addEventListener('resize', () => handleIntroResize());
    window.addEventListener('scroll', () => handleIntroScroll(), { passive: true });

  }, []);

  return null; // This component only runs effects and doesn't render visible DOM so thats why i return null
};

export default IntroAnimation;
