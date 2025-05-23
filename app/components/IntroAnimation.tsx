'use client';

import { useEffect } from 'react';
import { cubicBezier as CB } from 'framer-motion';


const IntroAnimation = () => {
  useEffect(() => {
    const navForHomeScroll = document.querySelector('.nav') as HTMLElement;
    const navTiles = document.querySelectorAll('.nav-tile') as NodeListOf<HTMLElement>;
    const navTileGridlines = document.querySelectorAll('.nav-tile.nav-tile-gridlines') as NodeListOf<HTMLElement>;
    const navButton = document.querySelector('#nav-button') as HTMLElement;
    const navButtonGridline = document.querySelector('.nav-button.nav-button-gridline') as HTMLElement;
    const navButtonTitle1 = document.querySelector('.nav-button-title-1') as HTMLElement;
    const navButtonTitle2 = document.querySelector('.nav-button-title-2') as HTMLElement;
    const horizontalTileLines = document.querySelectorAll(
      '.nav-tile.nav-tile-gridlines .tile-line.nav-t, .nav-tile.nav-tile-gridlines .tile-line.nav-b'
    ) as NodeListOf<HTMLElement>;
    const verticalTileLines = document.querySelectorAll(
      '.nav-tile.nav-tile-gridlines .tile-line.nav-l, .nav-tile.nav-tile-gridlines .tile-line.nav-r'
    ) as NodeListOf<HTMLElement>;
    const navWrapperGridlines = document.querySelector('.nav-wrapper-gridlines') as HTMLElement;
    const outroPage = document.querySelector('.outro-page') as HTMLElement;
    const partnerInfoButton = document.getElementById('partner-info-button') as HTMLElement;
    const scrollChevronsForScroll = document.querySelector('.scroll-chevrons') as HTMLElement;

    if (!navForHomeScroll || !navButton) return;

    let firstNavButtonBreakpoint: number;
    let secondNavButtonBreakpoint: number;
    let baseWindowSize: number;
    const initialScale = 2;
    let scrollTimeout: any;
    let currentMenuTileState: number;
    const easeFunction = CB(1, 0.25, 0.85, 1);

    const desktopTransformations = [
      [4, 2], [-0.1, 1], [-1, -0.1], [-4, 2],
      [4, -2], [1, 0.1], [0.1, -1], [-4, -2]
    ];

    const mobileTransformations = [
      [2, 3], [-2, 3], [0.25, 1.5], [-1.5, 0.25],
      [1.5, -0.25], [-0.25, -1.5], [2, -3], [-2, -3]
    ];

    let transitionTimeout: any;
    let shouldSmoothlyTransitionToState3 = false;
    let scrollingFromState1 = true;

    const handleIntroResize = (animated = false) => {
      if (document.documentElement.scrollHeight - window.innerHeight - window.scrollY <= 200) {
        window.scrollTo(0, document.documentElement.scrollHeight);
      }

      baseWindowSize = Math.max(window.innerWidth, window.innerHeight);
      secondNavButtonBreakpoint = 0.05 + baseWindowSize / 5000;
      firstNavButtonBreakpoint = 0;

      handleIntroScroll(animated);
    };

    const handleIntroScroll = (animated = true) => {
      if (!handleIntroScroll.throttled) {
        handleIntroScroll.throttled = true;
        requestAnimationFrame(() => {
          introScrollHandler(animated);
          handleIntroScroll.throttled = false;
        });
      }
    };

    const introScrollHandler = (animated = true) => {
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

    handleIntroResize(false);
    window.addEventListener('load', () => handleIntroResize(false));
    window.addEventListener('resize', () => handleIntroResize(false));
    window.addEventListener('scroll', () => handleIntroScroll(true), { passive: true });

  }, []);

  return null; // This component only runs effects and doesn't render visible DOM so thats why i return null
};

export default IntroAnimation;
