"use client";

import { useEffect, useRef } from "react";
import IntroAnimation from "./components/IntroAnimation";

export default function Home() {
  const dayCounterRef = useRef<number>(0);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sunAndMoonRef = useRef<HTMLDivElement | null>(null);
  const moonRef = useRef<HTMLDivElement | null>(null);

  const initialRotation = -25;

  function setNight() {
    const dayCounter = dayCounterRef.current;
    const sunAndMoonRotation = 360 * dayCounter + initialRotation + 180;

    if (sunAndMoonRef.current && moonRef.current) {
      sunAndMoonRef.current.style.transform = `rotateZ(${sunAndMoonRotation}deg)`;
      moonRef.current.style.transform = `rotateZ(${-sunAndMoonRotation}deg)`;
    }

    dayCounterRef.current = dayCounter + 1;
  }

  function setDay() {
    const dayCounter = dayCounterRef.current;
    const sunAndMoonRotation = 360 * dayCounter + initialRotation;

    if (sunAndMoonRef.current && moonRef.current) {
      sunAndMoonRef.current.style.transform = `rotateZ(${sunAndMoonRotation}deg)`;
      moonRef.current.style.transform = `rotateZ(${-sunAndMoonRotation}deg)`;
    }
  }

  // Imagery tile hover effect
  useEffect(() => {
    const tiles = document.querySelectorAll(".tile.imagery");

    function onMouseEnter() {
      hoverTimeoutRef.current = setTimeout(setNight, 100);
    }

    function onMouseLeave() {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      setDay();
    }

    tiles.forEach((tile) => {
      tile.addEventListener("mouseenter", onMouseEnter);
      tile.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      tiles.forEach((tile) => {
        tile.removeEventListener("mouseenter", onMouseEnter);
        tile.removeEventListener("mouseleave", onMouseLeave);
      });
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // Replace last space with non-breaking space for .nav-button-title
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".nav-button-title");
    elements.forEach((element) => {
      element.innerHTML = element.innerHTML.replace(/ (?!.* )/, "\u00A0");
    });
  }, []);

  // Page transitions & nav menu logic
  useEffect(() => {
    const navDec = document.querySelector(".nav-container");
    const navTilesDec = document.querySelectorAll<HTMLElement>(".nav-tile");
    const navLinksDec = document.querySelectorAll<HTMLAnchorElement>(".nav-tile > a");

    const prefersReducedMotionForTransition = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function setMenuMode(mode: number) {
      const menuIcons = [
        document.querySelector(".nav-button-svg.menu-logo"),
        document.querySelector(".nav-button-svg.menu-hamburger"),
        document.querySelector(".nav-button-svg.menu-arrow"),
        document.querySelector(".nav-button-svg.menu-close"),
      ];

      menuIcons.forEach((icon, index) => {
        if (icon)
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          index === mode ? icon.classList.remove("menu-svg-hidden") : icon.classList.add("menu-svg-hidden");
      });
    }

    function initMenuMode(mode: number) {
      setMenuMode(mode);
      const menuIcons = [
        document.querySelector(".nav-button-svg.menu-logo"),
        document.querySelector(".nav-button-svg.menu-hamburger"),
        document.querySelector(".nav-button-svg.menu-arrow"),
        document.querySelector(".nav-button-svg.menu-close"),
      ];

      menuIcons.forEach((icon) => {
        if (icon)
          icon.style.transition =
            "transform 0.3s cubic-bezier(.25,0,.25,1), opacity 0.3s cubic-bezier(.25,0,.25,1)";
      });
    }

    function onNavLinkClick(event: MouseEvent, i: number) {
      const target = event.currentTarget as HTMLAnchorElement;
      if (window.innerWidth > 991 && !prefersReducedMotionForTransition) {
        event.preventDefault();
        const href = target.href;

        if (navDec) navDec.classList.add("close");
        if (navTilesDec[i]) navTilesDec[i].classList.add("enlarge");

        setMenuMode(1);

        setTimeout(() => {
          window.location.href = href;
        }, 600);
      }
    }

    navLinksDec.forEach((link, i) => {
      const handler = (event: MouseEvent) => onNavLinkClick(event, i);
      link.addEventListener("click", handler);
      (link)._handler = handler;
    });

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.location.reload();
      }
    };

    window.addEventListener("pageshow", onPageShow);

    initMenuMode(0);

    return () => {
      navLinksDec.forEach((link) => {
        if ((link as any)._handler) {
          link.removeEventListener("click", (link as any)._handler);
        }
      });
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);
  return (
    <div className="home-load-in-critical-styles w-embed">
      <div persist-id="nav" className="nav-container">
        <div className="w-embed">

        </div>
        <div className="outro-nav-background"></div>
        <div className="nav-scroll-indicator"></div>

        <div className="nav-border-line"></div>
        <div className="nav">
          <nav className="nav-wrapper">
            <div className="nav-tile nav-tile-1">
              <a id="tilestrategy" href="/framework" className="tile strategy w-inline-block"
              ><div className="tile-title">Framework</div>
                <div className="strategy-visual-container">
                  <div className="strategy-visual-square">
                    <div className="w-embed">
                      <svg
                        className="bezier-point point-1"
                        width="20"
                        height="20"
                        viewBox="-2 -2 20 20"
                      >
                        <path
                          d="M0 8C0 5.19974 0 3.79961 0.544967 2.73005C1.02433 1.78924 1.78924 1.02433 2.73005 0.544967C3.79961 0 5.19974 0 8 0C10.8003 0 12.2004 0 13.27 0.544967C14.2108 1.02433 14.9757 1.78924 15.455 2.73005C16 3.79961 16 5.19974 16 8C16 10.8003 16 12.2004 15.455 13.27C14.9757 14.2108 14.2108 14.9757 13.27 15.455C12.2004 16 10.8003 16 8 16C5.19974 16 3.79961 16 2.73005 15.455C1.78924 14.9757 1.02433 14.2108 0.544967 13.27C0 12.2004 0 10.8003 0 8Z"
                        />
                      </svg>
                      <svg
                        className="bezier-point point-2"
                        width="20"
                        height="20"
                        viewBox="-2 -2 20 20"
                      >
                        <path
                          d="M0 8C0 5.19974 0 3.79961 0.544967 2.73005C1.02433 1.78924 1.78924 1.02433 2.73005 0.544967C3.79961 0 5.19974 0 8 0C10.8003 0 12.2004 0 13.27 0.544967C14.2108 1.02433 14.9757 1.78924 15.455 2.73005C16 3.79961 16 5.19974 16 8C16 10.8003 16 12.2004 15.455 13.27C14.9757 14.2108 14.2108 14.9757 13.27 15.455C12.2004 16 10.8003 16 8 16C5.19974 16 3.79961 16 2.73005 15.455C1.78924 14.9757 1.02433 14.2108 0.544967 13.27C0 12.2004 0 10.8003 0 8Z"
                        />
                      </svg>
                      <svg
                        className="bezier-point point-3"
                        width="20"
                        height="20"
                        viewBox="-2 -2 20 20"
                      >
                        <path
                          d="M0 8C0 5.19974 0 3.79961 0.544967 2.73005C1.02433 1.78924 1.78924 1.02433 2.73005 0.544967C3.79961 0 5.19974 0 8 0C10.8003 0 12.2004 0 13.27 0.544967C14.2108 1.02433 14.9757 1.78924 15.455 2.73005C16 3.79961 16 5.19974 16 8C16 10.8003 16 12.2004 15.455 13.27C14.9757 14.2108 14.2108 14.9757 13.27 15.455C12.2004 16 10.8003 16 8 16C5.19974 16 3.79961 16 2.73005 15.455C1.78924 14.9757 1.02433 14.2108 0.544967 13.27C0 12.2004 0 10.8003 0 8Z"
                        />
                      </svg>


                    </div>
                    <div id="strategysvg" className="strategy-bezier-container">
                      <div className="strategy-bezier-container-embed w-embed">
                        <svg
                          className="strategy-bezier-path"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M 0 25
       Q 31.25 32.8125, 62.5 40.625
       Q 93.75 48.4375, 100 50
       C 70 57.5, 80 55, 50 62.5
       C 20 70, 30 67.5, 0 75"
                          >
                          </path>
                        </svg>


                      </div>
                    </div>
                    <div className="strategy-sketch-1-embed w-embed">
                      <svg
                        className="strategy-sketch-path-1"
                        width="230"
                        height="134"
                        fill="none"
                        viewBox="0 0 230 134"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M10 25.9355C18.5 21.266 20.8707 19.9053 29.968 16.173C42.5012 11.0312 56.0106 11.8857 69.3085 11.8857C86.1833 11.8857 104.199 14.8053 117.944 25.6051C126.871 32.619 132.508 39.5429 134.476 51.0204C136.056 60.2398 138.357 71.0643 134.819 80.1056C132.69 85.546 126.533 90.478 121.5 90.9355C115.296 91.4995 108.734 92.337 105 85.9355C100.933 78.9636 106.721 68.6751 112.5 64.9355C120.248 59.9219 128.67 55.4355 137.5 55.4355C152.272 55.4355 167.625 66.3328 179.5 75.8325C189.5 83.8325 194.985 91.3048 197.5 95.8325C200 100.333 201.66 101.419 204.5 111.833C205.182 114.333 207.5 122.833 207.712 124.248C207.712 124.408 203.344 121.813 201.66 120.425C199.399 118.562 197.5 117.826 195.5 116.833C193.472 115.826 190 112.833 188 112.333C187.156 112.122 202 120.833 208 123.833C209.5 121.833 210.5 119.833 212.5 116.833C213.677 115.067 217 110.833 220 107.833"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>


                    </div>
                    <div className="strategy-sketch-2-embed w-embed">
                      <svg
                        className="strategy-sketch-path-2"
                        width="230"
                        height="134"
                        fill="none"
                        viewBox="0 0 230 134"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M219.36 17.1993C219.006 16.4914 214.909 15.59 213.801 15.5317C209.624 15.3118 205.295 14.1842 201.108 13.5861C189.734 11.9612 177.606 12.3757 166.18 13.1846C155.481 13.9421 144.868 14.4116 134.309 16.6743C121.742 19.3673 109.21 24.1555 97.3736 29.1818C90.7444 31.9969 83.7225 34.8108 77.6088 38.6318C73.0482 41.4822 69.1444 45.2812 65.0087 48.6995C43.6854 66.3239 27.3717 93.2898 25.3555 121.15C24.2391 118.308 21.4909 116.548 19.8259 114.033C18.5433 112.095 16.993 110.261 15.4726 108.507C14.57 107.465 13.9753 106.314 12.9878 105.326C12.2757 104.614 11.3185 103.936 11 102.98L25.6881 121.15C32 114.5 35 113 38.5 111C42 109 44.5 105.5 46 105"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>


                    </div>
                  </div>
                </div></a >
            </div>
            <div className="nav-tile nav-tile-2">
              <a
                id="tilevoicetone"
                href="/voice-and-tone"
                className="tile voice-tone w-inline-block"
              ><div className="tile-title">Voice &amp; Tone</div>
                <div className="voice-tone-visual-container">
                  <div className="w-embed">
                    <svg
                      className="voice-tone-quotation-mark left"
                      width="204"
                      height="163"
                      viewBox="0 0 204 163"
                    >
                      <defs>
                        <clipPath id="clip-shape">
                          <path
                            d="M8.16 50.9646C2.72 65.2502 0 82.2384 0 101.929C0 116.987 1.36 128.763 4.08 137.257C7.18857 145.751 12.0457 151.929 18.6514 155.79C25.2571 159.264 34 161.002 44.88 161.002C54.9829 161.002 63.1429 159.651 69.36 156.948C75.5771 154.245 80.0457 149.805 82.7657 143.628C85.8743 137.45 87.4286 129.149 87.4286 118.724C87.4286 107.528 86.0686 99.2266 83.3486 93.8213C81.0171 88.0298 77.1314 84.1689 71.6914 82.2384C66.2514 79.9218 59.0629 78.7635 50.1257 78.7635C47.4878 78.7635 44.9198 78.9721 42.4217 79.3891C43.1347 71.3966 44.537 64.4314 46.6286 58.4935C49.7371 50.7716 54.2057 44.594 60.0343 39.9609C65.8629 35.3277 72.8571 32.6251 81.0172 31.8529L75.7714 0C58.6743 2.31657 44.4914 7.91495 33.2229 16.7951C21.9543 25.2893 13.6 36.6791 8.16 50.9646Z"
                          />
                          <path
                            d="M124.731 50.9646C119.291 65.2502 116.571 82.2384 116.571 101.929C116.571 116.987 117.931 128.763 120.651 137.257C123.76 145.751 128.617 151.929 135.223 155.79C141.829 159.264 150.571 161.002 161.451 161.002C171.554 161.002 179.714 159.651 185.931 156.948C192.149 154.245 196.617 149.805 199.337 143.628C202.446 137.45 204 129.149 204 118.724C204 107.528 202.64 99.2266 199.92 93.8213C197.589 88.0298 193.703 84.1689 188.263 82.2384C182.823 79.9218 175.634 78.7635 166.697 78.7635C164.059 78.7635 161.491 78.9721 158.993 79.3891C159.706 71.3966 161.108 64.4314 163.2 58.4935C166.309 50.7716 170.777 44.594 176.606 39.9609C182.434 35.3277 189.429 32.6251 197.589 31.8529L192.343 0C175.246 2.31657 161.063 7.91495 149.794 16.7951C138.526 25.2893 130.171 36.6791 124.731 50.9646Z"
                          />
                        </clipPath>
                      </defs>
                      <g clipPath="url(#clip-shape)">
                        <path
                          d="M8.16 50.9646C2.72 65.2502 0 82.2384 0 101.929C0 116.987 1.36 128.763 4.08 137.257C7.18857 145.751 12.0457 151.929 18.6514 155.79C25.2571 159.264 34 161.002 44.88 161.002C54.9829 161.002 63.1429 159.651 69.36 156.948C75.5771 154.245 80.0457 149.805 82.7657 143.628C85.8743 137.45 87.4286 129.149 87.4286 118.724C87.4286 107.528 86.0686 99.2266 83.3486 93.8213C81.0171 88.0298 77.1314 84.1689 71.6914 82.2384C66.2514 79.9218 59.0629 78.7635 50.1257 78.7635C47.4878 78.7635 44.9198 78.9721 42.4217 79.3891C43.1347 71.3966 44.537 64.4314 46.6286 58.4935C49.7371 50.7716 54.2057 44.594 60.0343 39.9609C65.8629 35.3277 72.8571 32.6251 81.0172 31.8529L75.7714 0C58.6743 2.31657 44.4914 7.91495 33.2229 16.7951C21.9543 25.2893 13.6 36.6791 8.16 50.9646Z"
                        />
                        <path
                          d="M124.731 50.9646C119.291 65.2502 116.571 82.2384 116.571 101.929C116.571 116.987 117.931 128.763 120.651 137.257C123.76 145.751 128.617 151.929 135.223 155.79C141.829 159.264 150.571 161.002 161.451 161.002C171.554 161.002 179.714 159.651 185.931 156.948C192.149 154.245 196.617 149.805 199.337 143.628C202.446 137.45 204 129.149 204 118.724C204 107.528 202.64 99.2266 199.92 93.8213C197.589 88.0298 193.703 84.1689 188.263 82.2384C182.823 79.9218 175.634 78.7635 166.697 78.7635C164.059 78.7635 161.491 78.9721 158.993 79.3891C159.706 71.3966 161.108 64.4314 163.2 58.4935C166.309 50.7716 170.777 44.594 176.606 39.9609C182.434 35.3277 189.429 32.6251 197.589 31.8529L192.343 0C175.246 2.31657 161.063 7.91495 149.794 16.7951C138.526 25.2893 130.171 36.6791 124.731 50.9646Z"
                        />
                      </g>
                    </svg>
                    <svg
                      className="voice-tone-quotation-mark right"
                      width="204"
                      height="163"
                      viewBox="0 0 204 163"
                    >
                      <defs>
                        <clipPath id="clip-shape">
                          <path
                            d="M8.16 50.9646C2.72 65.2502 0 82.2384 0 101.929C0 116.987 1.36 128.763 4.08 137.257C7.18857 145.751 12.0457 151.929 18.6514 155.79C25.2571 159.264 34 161.002 44.88 161.002C54.9829 161.002 63.1429 159.651 69.36 156.948C75.5771 154.245 80.0457 149.805 82.7657 143.628C85.8743 137.45 87.4286 129.149 87.4286 118.724C87.4286 107.528 86.0686 99.2266 83.3486 93.8213C81.0171 88.0298 77.1314 84.1689 71.6914 82.2384C66.2514 79.9218 59.0629 78.7635 50.1257 78.7635C47.4878 78.7635 44.9198 78.9721 42.4217 79.3891C43.1347 71.3966 44.537 64.4314 46.6286 58.4935C49.7371 50.7716 54.2057 44.594 60.0343 39.9609C65.8629 35.3277 72.8571 32.6251 81.0172 31.8529L75.7714 0C58.6743 2.31657 44.4914 7.91495 33.2229 16.7951C21.9543 25.2893 13.6 36.6791 8.16 50.9646Z"
                          />
                          <path
                            d="M124.731 50.9646C119.291 65.2502 116.571 82.2384 116.571 101.929C116.571 116.987 117.931 128.763 120.651 137.257C123.76 145.751 128.617 151.929 135.223 155.79C141.829 159.264 150.571 161.002 161.451 161.002C171.554 161.002 179.714 159.651 185.931 156.948C192.149 154.245 196.617 149.805 199.337 143.628C202.446 137.45 204 129.149 204 118.724C204 107.528 202.64 99.2266 199.92 93.8213C197.589 88.0298 193.703 84.1689 188.263 82.2384C182.823 79.9218 175.634 78.7635 166.697 78.7635C164.059 78.7635 161.491 78.9721 158.993 79.3891C159.706 71.3966 161.108 64.4314 163.2 58.4935C166.309 50.7716 170.777 44.594 176.606 39.9609C182.434 35.3277 189.429 32.6251 197.589 31.8529L192.343 0C175.246 2.31657 161.063 7.91495 149.794 16.7951C138.526 25.2893 130.171 36.6791 124.731 50.9646Z"
                          />
                        </clipPath>
                      </defs>
                      <g clipPath="url(#clip-shape)">
                        <path
                          d="M8.16 50.9646C2.72 65.2502 0 82.2384 0 101.929C0 116.987 1.36 128.763 4.08 137.257C7.18857 145.751 12.0457 151.929 18.6514 155.79C25.2571 159.264 34 161.002 44.88 161.002C54.9829 161.002 63.1429 159.651 69.36 156.948C75.5771 154.245 80.0457 149.805 82.7657 143.628C85.8743 137.45 87.4286 129.149 87.4286 118.724C87.4286 107.528 86.0686 99.2266 83.3486 93.8213C81.0171 88.0298 77.1314 84.1689 71.6914 82.2384C66.2514 79.9218 59.0629 78.7635 50.1257 78.7635C47.4878 78.7635 44.9198 78.9721 42.4217 79.3891C43.1347 71.3966 44.537 64.4314 46.6286 58.4935C49.7371 50.7716 54.2057 44.594 60.0343 39.9609C65.8629 35.3277 72.8571 32.6251 81.0172 31.8529L75.7714 0C58.6743 2.31657 44.4914 7.91495 33.2229 16.7951C21.9543 25.2893 13.6 36.6791 8.16 50.9646Z"
                        />
                        <path
                          d="M124.731 50.9646C119.291 65.2502 116.571 82.2384 116.571 101.929C116.571 116.987 117.931 128.763 120.651 137.257C123.76 145.751 128.617 151.929 135.223 155.79C141.829 159.264 150.571 161.002 161.451 161.002C171.554 161.002 179.714 159.651 185.931 156.948C192.149 154.245 196.617 149.805 199.337 143.628C202.446 137.45 204 129.149 204 118.724C204 107.528 202.64 99.2266 199.92 93.8213C197.589 88.0298 193.703 84.1689 188.263 82.2384C182.823 79.9218 175.634 78.7635 166.697 78.7635C164.059 78.7635 161.491 78.9721 158.993 79.3891C159.706 71.3966 161.108 64.4314 163.2 58.4935C166.309 50.7716 170.777 44.594 176.606 39.9609C182.434 35.3277 189.429 32.6251 197.589 31.8529L192.343 0C175.246 2.31657 161.063 7.91495 149.794 16.7951C138.526 25.2893 130.171 36.6791 124.731 50.9646Z"
                        />
                      </g>
                    </svg>


                  </div>
                </div></a>
            </div>
            <div className="nav-tile nav-tile-3">
              <a
                id="tilelogo"
                href="/logo"
                data-w-id="ca3f3316-2d3b-9693-1a7c-0bbddcad8ac0"
                className="tile logo w-inline-block"
              ><div className="tile-title">Logo</div>
                <div className="logo-visual-container">
                  <div className="logo-visual-square">
                    <div className="w-embed">

                    </div>
                    <div
                      data-is-ix2-target="1"
                      className="logo-visual-lottie"
                      data-w-id="ca3f3316-2d3b-9693-1a7c-0bbddcad8ac6"
                      data-animation-type="lottie"
                      data-src="https://cdn.prod.website-files.com/66c503d081b2f012369fc5d2/671028fc31978e2572941a61_DB_Master_Dropbox.json"
                      data-loop="0"
                      data-direction="-1"
                      data-autoplay="0"
                      data-renderer="svg"
                      data-default-duration="0"
                      data-duration="0"
                      data-ix2-initial-state="92"
                    ></div>
                    <div
                      data-is-ix2-target="1"
                      className="logo-visual-outline-lottie"
                      data-w-id="ca3f3316-2d3b-9693-1a7c-0bbddcad8ac7"
                      data-animation-type="lottie"
                      data-src="https://cdn.prod.website-files.com/66c503d081b2f012369fc5d2/671028fc31978e2572941a61_DB_Master_Dropbox.json"
                      data-loop="0"
                      data-direction="-1"
                      data-autoplay="0"
                      data-renderer="svg"
                      data-default-duration="0"
                      data-duration="0"
                      data-ix2-initial-state="100"
                    ></div>
                  </div></div ></a>
            </div>
            <div className="nav-tile nav-tile-4">
              <a
                id="tiletypography"
                href="/typography"
                className="tile typography w-inline-block"
              ><div className="tile-title">Typography</div>
                <div className="typography-visual-container">
                  <div className="typography-visual-square">
                    <div className="typography-visual-type-embed w-embed">
                      <svg className="typography-visual-type" viewBox="0 0 196 110">
                        <defs>
                          <path
                            id="typography-visual-type-uppercase-a-path"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M47.4654 0.45166L8.9082 106.596H28.8567L36.8115 82.7766H79.1182L87.3625 106.596H107.162L67.7117 0.45166H47.4654ZM73.3987 66.252L57.5868 20.728L42.3301 66.252H73.3987Z"
                          >
                            <animate
                              attributeName="d"
                              dur="0.35s"
                              fill="freeze"
                              keyTimes="0; 1"
                              keySplines=".4 0 .2 1"
                              calcMode="spline"
                              to="M36.1952 0.0527344L0.913086 107.239H35.8974L39.6229 93.6917H68.0607L71.9239 107.239H107.057L71.3284 0.0527344H36.1952ZM60.2071 66.1508L53.5838 42.9247L47.1966 66.1508H60.2071Z"
                              begin="tiletypography.mouseover"
                            />
                            <animate
                              attributeName="d"
                              dur="0.35s"
                              fill="freeze"
                              keyTimes="0; 1"
                              keySplines=".4 0 .2 1"
                              calcMode="spline"
                              to="M47.4654 0.45166L8.9082 106.596H28.8567L36.8115 82.7766H79.1182L87.3625 106.596H107.162L67.7117 0.45166H47.4654ZM73.3987 66.252L57.5868 20.728L42.3301 66.252H73.3987Z"
                              begin="tiletypography.mouseout"
                            />
                          </path>
                          <path
                            id="typography-visual-type-lowercase-a-path"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M126.908 106C131.077 107.886 136.237 108.829 142.391 108.829C149.239 108.829 155.144 107.737 160.106 105.554C165.168 103.271 169.286 100.294 172.462 96.6214C174.388 94.404 176.022 92.0323 177.364 89.5061L179.459 106.596H195.239V48.8343C195.239 44.2689 194.545 40.1502 193.155 36.4781C191.865 32.806 189.731 29.6797 186.754 27.0993C183.776 24.4197 179.856 22.3851 174.993 20.9957C170.229 19.6062 164.374 18.9115 157.427 18.9115C149.288 18.9115 142.291 20.2513 136.436 22.931C130.58 25.6106 126.015 29.382 122.74 34.2451C119.564 39.1081 117.728 44.7652 117.232 51.2162H137.329C137.528 47.5441 138.371 44.4674 139.86 41.9863C141.448 39.4059 143.78 37.4706 146.857 36.1804C149.933 34.7909 153.804 34.0962 158.469 34.0962C161.744 34.0962 164.523 34.3939 166.805 34.9894C169.187 35.4856 171.073 36.23 172.462 37.2225C173.852 38.2149 174.844 39.4555 175.44 40.9442C176.134 42.3336 176.482 43.9216 176.482 45.708C176.482 47.9907 175.738 49.8267 174.249 51.2162C172.859 52.6056 170.577 53.6974 167.401 54.4913C164.225 55.2853 160.106 56.0296 155.045 56.7244C149.685 57.5183 145.269 58.2627 141.795 58.9574C138.322 59.6521 135.344 60.4461 132.863 61.3393C130.481 62.1333 128.05 63.3243 125.568 64.9122C122.095 67.0956 119.366 69.9738 117.381 73.5466C115.396 77.0203 114.403 81.139 114.403 85.9028C114.403 90.5674 115.445 94.6365 117.529 98.1101C119.614 101.484 122.74 104.115 126.908 106ZM169.187 85.4562C161.744 92.8777 154.281 93.7929 149.09 93.7929C135.866 93.7929 135.802 85.4813 135.692 83.0743C135.692 73.5466 146.122 70.7903 159.449 68.7745C166.092 67.7697 173.441 65.9276 176.631 63.3879C176.631 71.7279 176.098 78.5658 169.187 85.4562Z"
                          >
                            <animate
                              attributeName="d"
                              dur="0.35s"
                              fill="freeze"
                              keyTimes="0; 1"
                              keySplines=".4 0 .2 1"
                              calcMode="spline"
                              to="M121.218 107C125.287 108.886 130.498 109.829 136.85 109.829C143.4 109.829 148.61 108.787 152.481 106.703C156.451 104.519 159.478 101.691 161.562 98.217C161.879 97.6742 162.179 97.1223 162.464 96.5612L166.326 107.596H195.207V55.3425C195.207 49.884 194.512 44.9713 193.122 40.6045C191.733 36.1384 189.5 32.3174 186.423 29.1415C183.347 25.8664 179.228 23.3852 174.067 21.698C169.005 19.9116 162.803 19.0184 155.458 19.0184C145.633 19.0184 137.544 20.4574 131.193 23.3356C124.94 26.2137 120.226 30.2332 117.05 35.394C113.973 40.5548 112.187 46.6089 111.691 53.5561H146.675C146.675 51.7697 146.973 50.3306 147.568 49.2389C148.164 48.0479 149.007 47.1547 150.099 46.5592C151.29 45.9638 152.729 45.666 154.416 45.666C155.706 45.666 156.749 45.8149 157.542 46.1126C158.336 46.3111 158.982 46.6585 159.478 47.1547C159.974 47.5517 160.321 48.0479 160.52 48.6434C160.718 49.2389 160.818 49.884 160.818 50.5787C160.818 51.8689 160.272 52.911 159.18 53.705C158.088 54.499 156.401 55.1441 154.118 55.6403C151.935 56.1365 149.007 56.6824 145.335 57.2778C141.365 57.8733 137.892 58.4688 134.914 59.0643C132.036 59.6598 129.456 60.4041 127.173 61.2973C124.89 62.0913 122.707 63.1334 120.623 64.4236C117.149 66.607 114.37 69.4355 112.286 72.9092C110.202 76.2835 109.16 80.7992 109.16 86.4563C109.16 91.2201 110.152 95.3885 112.137 98.9613C114.122 102.435 117.149 105.115 121.218 107ZM159.003 82.0018C157.242 84.2686 155.12 85.4142 152.034 85.4142C146.593 85.4142 145.633 82.9836 145.633 80.7992C145.633 75.2922 151.638 74.3119 154.084 73.8056C156.529 73.2993 158.679 72.9086 160.818 71.3296C160.818 76.2904 161.093 79.3123 159.003 82.0018Z"
                              begin="tiletypography.mouseover"
                            />
                            <animate
                              attributeName="d"
                              dur="0.35s"
                              fill="freeze"
                              keyTimes="0; 1"
                              keySplines=".4 0 .2 1"
                              calcMode="spline"
                              to="M126.908 106C131.077 107.886 136.237 108.829 142.391 108.829C149.239 108.829 155.144 107.737 160.106 105.554C165.168 103.271 169.286 100.294 172.462 96.6214C174.388 94.404 176.022 92.0323 177.364 89.5061L179.459 106.596H195.239V48.8343C195.239 44.2689 194.545 40.1502 193.155 36.4781C191.865 32.806 189.731 29.6797 186.754 27.0993C183.776 24.4197 179.856 22.3851 174.993 20.9957C170.229 19.6062 164.374 18.9115 157.427 18.9115C149.288 18.9115 142.291 20.2513 136.436 22.931C130.58 25.6106 126.015 29.382 122.74 34.2451C119.564 39.1081 117.728 44.7652 117.232 51.2162H137.329C137.528 47.5441 138.371 44.4674 139.86 41.9863C141.448 39.4059 143.78 37.4706 146.857 36.1804C149.933 34.7909 153.804 34.0962 158.469 34.0962C161.744 34.0962 164.523 34.3939 166.805 34.9894C169.187 35.4856 171.073 36.23 172.462 37.2225C173.852 38.2149 174.844 39.4555 175.44 40.9442C176.134 42.3336 176.482 43.9216 176.482 45.708C176.482 47.9907 175.738 49.8267 174.249 51.2162C172.859 52.6056 170.577 53.6974 167.401 54.4913C164.225 55.2853 160.106 56.0296 155.045 56.7244C149.685 57.5183 145.269 58.2627 141.795 58.9574C138.322 59.6521 135.344 60.4461 132.863 61.3393C130.481 62.1333 128.05 63.3243 125.568 64.9122C122.095 67.0956 119.366 69.9738 117.381 73.5466C115.396 77.0203 114.403 81.139 114.403 85.9028C114.403 90.5674 115.445 94.6365 117.529 98.1101C119.614 101.484 122.74 104.115 126.908 106ZM169.187 85.4562C161.744 92.8777 154.281 93.7929 149.09 93.7929C135.866 93.7929 135.802 85.4813 135.692 83.0743C135.692 73.5466 146.122 70.7903 159.449 68.7745C166.092 67.7697 173.441 65.9276 176.631 63.3879C176.631 71.7279 176.098 78.5658 169.187 85.4562Z"
                              begin="tiletypography.mouseout"
                            />
                          </path>
                          <clipPath
                            id="typography-visual-type-uppercase-a-clip"
                            clipRule="evenodd"
                          >
                            <use xlinkHref="#typography-visual-type-uppercase-a-path" />
                          </clipPath>

                          <clipPath
                            id="typography-visual-type-lowercase-a-clip"
                            clipRule="evenodd"
                          >
                            <use xlinkHref="#typography-visual-type-lowercase-a-path" />
                          </clipPath>
                        </defs>
                        <g>
                          <use
                            xlinkHref="#typography-visual-type-uppercase-a-path"
                            strokeWidth="4px"
                            clipPath="url(#typography-visual-type-uppercase-a-clip)"
                          />
                          <use
                            xlinkHref="#typography-visual-type-lowercase-a-path"
                            strokeWidth="4px"
                            clipPath="url(#typography-visual-type-lowercase-a-clip)"
                          />
                        </g>

                      </svg>




                    </div>
                  </div>
                </div></a >
            </div>
            <div className="nav-tile nav-tile-5">
              <a
                id="tileiconography"
                href="/iconography"
                className="tile iconography w-inline-block"
              ><div className="tile-title">Iconography</div>
                <div className="iconography-visual-container">
                  <div className="iconography-visual-square">
                    <div className="iconography-visual-lock-embed w-embed">
                      <svg className="iconography-visual-lock" viewBox="0 0 103 142">
                        <path
                          d="M44.3743 116.181L57.6864 116.181V102.115C60.501 101.018 62.8802 99.0769 64.4768 96.5757C66.0734 94.0745 66.71 91.1539 66.71 88.2117C66.71 85.9998 66.4417 84.1626 65.7204 82.2617C64.9991 80.3608 63.8606 78.6345 62.3836 77.2022C60.9067 75.77 59.1265 74.6659 57.1662 73.9665C55.2059 73.267 53.1143 72.9998 51.0303 72.9998C48.942 72.9998 46.8548 73.267 44.8945 73.9665C42.9342 74.6659 41.154 75.77 39.6771 77.2022C38.2001 78.6345 37.0616 80.3608 36.3403 82.2617C35.619 84.1626 35.35 85.9998 35.35 88.2117C35.35 91.1539 35.9873 94.0745 37.5839 96.5757C39.1804 99.0769 41.5597 101.018 44.3743 102.115V116.181Z"
                        />
                        <defs>
                          <path
                            id="iconography-visual-lock-path"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M102.06 64.3331C102.06 53.0489 96.3443 47.3331 85.06 47.3331H35.4991V39.2695C35.4991 28.1505 39.5638 24.2089 51.03 24.2089C62.4962 24.2089 66.5609 28.1505 66.5609 39.2695V47.3331H79.873V39.2695C79.873 26.511 74.8677 11.2998 51.03 11.2998C27.1923 11.2998 22.187 26.511 22.187 39.2695V47.3331H17C5.71573 47.3331 0 53.0489 0 64.3331V111.03C0.00939465 121.445 3.05122 128.554 8.45831 133.798C13.8654 139.041 21.1963 141.991 31.843 142H70.2169C80.8637 141.991 88.1946 139.041 93.6017 133.798C99.0088 128.554 102.051 121.445 102.06 111.03V64.3331ZM88.7478 112.03C88.7478 119.024 87.1115 121.855 84.1989 124.68C81.2863 127.504 78.336 129.091 71.2169 129.091H30.843C23.724 129.091 20.7737 127.504 17.8611 124.68C14.9485 121.855 13.3122 119.024 13.3122 112.03V64.2422C13.3122 61.5854 14.6553 60.2422 17.3122 60.2422H84.7478C87.4047 60.2422 88.7478 61.5854 88.7478 64.2422V112.03Z"
                          >
                            <animate
                              attributeName="d"
                              dur="0.35s"
                              fill="freeze"
                              keyTimes="0; 1"
                              keySplines=".4 0 .2 1"
                              calcMode="spline"
                              to="M102.06 64.3331C102.06 53.0489 96.3443 47.3331 85.06 47.3331H35.4991V28.2695C35.4991 17.1505 39.5638 13.2089 51.03 13.2089C62.4962 13.2089 66.5609 17.1505 66.5609 28.2695V34.3331H79.873V28.2695C79.873 15.511 74.8677 0.299805 51.03 0.299805C27.1923 0.299805 22.187 15.511 22.187 28.2695V47.3331H17C5.71573 47.3331 0 53.0489 0 64.3331V111.03C0.00939465 121.445 3.05122 128.554 8.45831 133.798C13.8654 139.041 21.1963 141.991 31.843 142H70.2169C80.8637 141.991 88.1946 139.041 93.6017 133.798C99.0088 128.554 102.051 121.445 102.06 111.03V64.3331ZM88.7478 112.03C88.7478 119.024 87.1115 121.855 84.1989 124.68C81.2863 127.504 78.336 129.091 71.2169 129.091H30.843C23.724 129.091 20.7737 127.504 17.8611 124.68C14.9485 121.855 13.3122 119.024 13.3122 112.03V64.2422C13.3122 61.5854 14.6553 60.2422 17.3122 60.2422H84.7478C87.4047 60.2422 88.7478 61.5854 88.7478 64.2422V112.03Z"
                              begin="tileiconography.mouseover"
                            />
                            <animate
                              attributeName="d"
                              dur="0.2s"
                              fill="freeze"
                              keyTimes="0; 1"
                              keySplines=".6 0 .9 1"
                              calcMode="spline"
                              to="M102.06 64.3331C102.06 53.0489 96.3443 47.3331 85.06 47.3331H35.4991V39.2695C35.4991 28.1505 39.5638 24.2089 51.03 24.2089C62.4962 24.2089 66.5609 28.1505 66.5609 39.2695V47.3331H79.873V39.2695C79.873 26.511 74.8677 11.2998 51.03 11.2998C27.1923 11.2998 22.187 26.511 22.187 39.2695V47.3331H17C5.71573 47.3331 0 53.0489 0 64.3331V111.03C0.00939465 121.445 3.05122 128.554 8.45831 133.798C13.8654 139.041 21.1963 141.991 31.843 142H70.2169C80.8637 141.991 88.1946 139.041 93.6017 133.798C99.0088 128.554 102.051 121.445 102.06 111.03V64.3331ZM88.7478 112.03C88.7478 119.024 87.1115 121.855 84.1989 124.68C81.2863 127.504 78.336 129.091 71.2169 129.091H30.843C23.724 129.091 20.7737 127.504 17.8611 124.68C14.9485 121.855 13.3122 119.024 13.3122 112.03V64.2422C13.3122 61.5854 14.6553 60.2422 17.3122 60.2422H84.7478C87.4047 60.2422 88.7478 61.5854 88.7478 64.2422V112.03Z"
                              begin="tileiconography.mouseout"
                            />
                          </path>
                          <clipPath id="iconography-visual-lock-clip">
                            <use xlinkHref="#iconography-visual-lock-path" />
                          </clipPath>

                        </defs>
                        <g>
                          <use
                            xlinkHref="#iconography-visual-lock-path"
                            strokeWidth="4px"
                            clipPath="url(#iconography-visual-lock-clip)"
                          />
                        </g>

                      </svg>


                    </div>
                  </div>
                </div></a>
            </div>
            <div className="nav-tile nav-tile-6">
              <a id="tilecolor" href="/color" className="tile color w-inline-block"
              ><div className="tile-title">Color</div>
                <div className="color-visual-container">
                  <div className="color-tile-embed w-embed">

                  </div>
                  <div className="color-visual-square">
                    <div className="color-visual-square-square">
                      <div className="color-color-block block-1">
                        <div className="w-embed">
                          <svg
                            className="color-color-circle"
                            viewBox="0 0 150 150"
                          >
                            <path
                              d="M75 25C42.7594 25 25 42.7563 25 75C25 107.244 42.7594 125 75 125C107.241 125 125 107.244 125 75C125 42.7563 107.241 25 75 25Z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="color-color-block block-2">
                        <div className="w-embed">
                          <svg
                            className="color-color-circle"
                            viewBox="0 0 150 150"
                          >
                            <path
                              d="M75 25C42.7594 25 25 42.7563 25 75C25 107.244 42.7594 125 75 125C107.241 125 125 107.244 125 75C125 42.7563 107.241 25 75 25Z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div></div
                ></a>
            </div>
            <div className="nav-tile nav-tile-7">
              <a id="tileimagery" href="/imagery" className="tile imagery w-inline-block"
              ><div className="tile-title">Imagery</div>
                <div className="imagery-visual-container">
                  <div className="imagery-visual-square">
                    <div className="imagery-visual-picture">
                      <div className="imagery-visual-picture-embed w-embed w-script">
                        <svg className="hills" viewBox="0 0 250 150" fill="none">
                          <defs>
                            <path
                              id="imagery-hills-path"
                              d="M39 64.6059C16.4306 64.6059 0 83.8921 0 83.8921V150H250V34.2917C250 34.2917 229 0 202.602 0C155 0 136.444 87.8921 100 87.8921C77 87.8921 64 64.6059 39 64.6059Z"
                            />
                            <clipPath id="imagery-hills-clip">
                              <use xlinkHref="#imagery-hills-path" />
                            </clipPath>

                          </defs>
                          <g>
                            <use
                              xlinkHref="#imagery-hills-path"
                              strokeWidth="4px"
                              clipPath="url(#imagery-hills-clip)"
                            />
                          </g>

                        </svg>

                        <div className="sunandmoon">
                          <svg className="sunmoon sun" viewBox="-2 -2 44 44">
                            <defs>
                              <circle
                                id="imagery-sun-path"
                                cx="20"
                                cy="20"
                                r="20"
                              />
                              <clipPath id="imagery-sun-clip">
                                <use xlinkHref="#imagery-sun-path" />
                              </clipPath>
                            </defs>
                            <g>
                              <use
                                xlinkHref="#imagery-sun-path"
                                strokeWidth="4px"
                                clipPath="url(#imagery-sun-clip)"
                              />
                            </g>
                          </svg>
                          <svg className="sunmoon moon" viewBox="-2 -2 44 44">
                            <defs>
                              <path
                                id="imagery-moon-path"
                                d="M37.789 27.8581C37.789 27.8581 25.4475 32.7572 15.6202 22.5197C5.79294 12.2821 11.3735 0.765137 11.3735 0.765137C9.44381 1.70298 7.6356 2.97261 6.03402 4.57419C-1.71664 12.3248 -1.69319 24.9146 6.08638 32.6942C13.866 40.4737 26.4557 40.4972 34.2064 32.7465C35.6825 31.2704 36.8767 29.6187 37.789 27.8581Z"
                              />
                              <clipPath id="imagery-moon-clip">
                                <use xlinkHref="#imagery-moon-path" />
                              </clipPath>
                            </defs>
                            <g>
                              <use
                                xlinkHref="#imagery-moon-path"
                                strokeWidth="4px"
                                clipPath="url(#imagery-moon-clip)"
                              />
                            </g>
                          </svg>
                        </div>




                      </div>
                      <div className="imagery-visual-picture-border"></div>
                    </div>
                  </div></div
                ></a>
            </div>
            <div className="nav-tile nav-tile-8">
              <a id="tilemotion" href="/motion" className="tile motion w-inline-block"
              ><div className="tile-title">Motion</div>
                <div className="motion-visual-container">
                  <div className="w-embed">
                    <div className="bezier-tangent tangent-1"></div>
                    <div className="bezier-tangent tangent-2"></div>
                    <svg
                      className="bezier-point point-1"
                      width="20"
                      height="20"
                      viewBox="-2 -2 20 20"
                    >
                      <path
                        d="M0 8C0 5.19974 0 3.79961 0.544967 2.73005C1.02433 1.78924 1.78924 1.02433 2.73005 0.544967C3.79961 0 5.19974 0 8 0C10.8003 0 12.2004 0 13.27 0.544967C14.2108 1.02433 14.9757 1.78924 15.455 2.73005C16 3.79961 16 5.19974 16 8C16 10.8003 16 12.2004 15.455 13.27C14.9757 14.2108 14.2108 14.9757 13.27 15.455C12.2004 16 10.8003 16 8 16C5.19974 16 3.79961 16 2.73005 15.455C1.78924 14.9757 1.02433 14.2108 0.544967 13.27C0 12.2004 0 10.8003 0 8Z"
                      />
                    </svg>
                    <svg
                      className="bezier-point point-2"
                      width="20"
                      height="20"
                      viewBox="-2 -2 20 20"
                    >
                      <path
                        d="M0 8C0 5.19974 0 3.79961 0.544967 2.73005C1.02433 1.78924 1.78924 1.02433 2.73005 0.544967C3.79961 0 5.19974 0 8 0C10.8003 0 12.2004 0 13.27 0.544967C14.2108 1.02433 14.9757 1.78924 15.455 2.73005C16 3.79961 16 5.19974 16 8C16 10.8003 16 12.2004 15.455 13.27C14.9757 14.2108 14.2108 14.9757 13.27 15.455C12.2004 16 10.8003 16 8 16C5.19974 16 3.79961 16 2.73005 15.455C1.78924 14.9757 1.02433 14.2108 0.544967 13.27C0 12.2004 0 10.8003 0 8Z"
                      />
                    </svg>
                    <svg
                      className="bezier-point point-3"
                      width="20"
                      height="20"
                      viewBox="-2 -2 20 20"
                    >
                      <path
                        d="M0 8C0 5.19974 0 3.79961 0.544967 2.73005C1.02433 1.78924 1.78924 1.02433 2.73005 0.544967C3.79961 0 5.19974 0 8 0C10.8003 0 12.2004 0 13.27 0.544967C14.2108 1.02433 14.9757 1.78924 15.455 2.73005C16 3.79961 16 5.19974 16 8C16 10.8003 16 12.2004 15.455 13.27C14.9757 14.2108 14.2108 14.9757 13.27 15.455C12.2004 16 10.8003 16 8 16C5.19974 16 3.79961 16 2.73005 15.455C1.78924 14.9757 1.02433 14.2108 0.544967 13.27C0 12.2004 0 10.8003 0 8Z"
                      />
                    </svg>
                    <svg
                      className="bezier-point point-4"
                      width="20"
                      height="20"
                      viewBox="-2 -2 20 20"
                    >
                      <path
                        d="M0 8C0 5.19974 0 3.79961 0.544967 2.73005C1.02433 1.78924 1.78924 1.02433 2.73005 0.544967C3.79961 0 5.19974 0 8 0C10.8003 0 12.2004 0 13.27 0.544967C14.2108 1.02433 14.9757 1.78924 15.455 2.73005C16 3.79961 16 5.19974 16 8C16 10.8003 16 12.2004 15.455 13.27C14.9757 14.2108 14.2108 14.9757 13.27 15.455C12.2004 16 10.8003 16 8 16C5.19974 16 3.79961 16 2.73005 15.455C1.78924 14.9757 1.02433 14.2108 0.544967 13.27C0 12.2004 0 10.8003 0 8Z"
                      />
                    </svg>


                  </div>
                  <div className="motion-bezier-container">
                    <div className="motion-bezier-container-embed w-embed">
                      <svg
                        className="motion-bezier-path"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <path d="M 0,75 C 30,75 60,25 100,25">
                          <animate
                            attributeName="d"
                            dur="0.35s"
                            fill="freeze"
                            keyTimes="0; 1"
                            keySplines=".4 0 .2 1"
                            calcMode="spline"
                            to="M 0,75 C 65,75 35,25 100,25"
                            begin="tilemotion.mouseover"
                          />
                          <animate
                            attributeName="d"
                            dur="0.35s"
                            fill="freeze"
                            keyTimes="0; 1"
                            keySplines=".4 0 .2 1"
                            calcMode="spline"
                            to="M 0,75 C 30,75 60,25 100,25"
                            begin="tilemotion.mouseout"
                          />
                        </path>
                      </svg>


                    </div>
                  </div>
                </div></a>
            </div>
          </nav>
          <div className="nav-wrapper nav-wrapper-gridlines">
            <div className="menu">
              <div className="tile-menu-tile nav-button nav-button-gridline">
                <div className="tile-line nav-l"></div>
                <div className="tile-line nav-r"></div>
                <div className="tile-line nav-t"></div>
                <div className="tile-line nav-b"></div>
              </div>
            </div>
            <div className="nav-tile nav-tile-1 nav-tile-gridlines">
              <div className="tile-line-wrapper">
                <div className="tile-line nav-l"></div>
                <div className="tile-line nav-r"></div>
                <div className="tile-line nav-t"></div>
                <div className="tile-line nav-b"></div>
              </div>
            </div>
            <div className="nav-tile nav-tile-2 nav-tile-gridlines">
              <div className="tile-line-wrapper">
                <div className="tile-line nav-l"></div>
                <div className="tile-line nav-r"></div>
                <div className="tile-line nav-t"></div>
                <div className="tile-line nav-b"></div>
              </div>
            </div>
            <div className="nav-tile nav-tile-3 nav-tile-gridlines">
              <div className="tile-line-wrapper">
                <div className="tile-line nav-l"></div>
                <div className="tile-line nav-r"></div>
                <div className="tile-line nav-t"></div>
                <div className="tile-line nav-b"></div>
              </div>
            </div>
            <div className="nav-tile nav-tile-4 nav-tile-gridlines">
              <div className="tile-line-wrapper">
                <div className="tile-line nav-l"></div>
                <div className="tile-line nav-r"></div>
                <div className="tile-line nav-t"></div>
                <div className="tile-line nav-b"></div>
              </div>
            </div>
            <div className="nav-tile nav-tile-5 nav-tile-gridlines">
              <div className="tile-line-wrapper">
                <div className="tile-line nav-l"></div>
                <div className="tile-line nav-r"></div>
                <div className="tile-line nav-t"></div>
                <div className="tile-line nav-b"></div>
              </div>
            </div>
            <div className="nav-tile nav-tile-6 nav-tile-gridlines">
              <div className="tile-line-wrapper">
                <div className="tile-line nav-l"></div>
                <div className="tile-line nav-r"></div>
                <div className="tile-line nav-t"></div>
                <div className="tile-line nav-b"></div>
              </div>
            </div>
            <div className="nav-tile nav-tile-7 nav-tile-gridlines">
              <div className="tile-line-wrapper">
                <div className="tile-line nav-l"></div>
                <div className="tile-line nav-r"></div>
                <div className="tile-line nav-t"></div>
                <div className="tile-line nav-b"></div>
              </div>
            </div>
            <div className="nav-tile nav-tile-8 nav-tile-gridlines">
              <div className="tile-line-wrapper">
                <div className="tile-line nav-l"></div>
                <div className="tile-line nav-r"></div>
                <div className="tile-line nav-t"></div>
                <div className="tile-line nav-b"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="menu">
          <button
            id="nav-button"
            aria-label="Navigation menu"
            tabIndex={0}
            className="tile-menu-tile nav-button"
          >
            <div className="nav-button-highlight"></div>
            <div className="scroll-chevrons w-embed">


              <div className="scroll-chevrons-container">
                <svg
                  className="scroll-chevron chevron-1"
                  width="26"
                  height="14"
                  viewBox="0 0 26 14"
                  fill="currentColor"
                >
                  <path
                    d="M23.2161 0.352539L13 10.1757L2.78391 0.352539L1.00781 2.19967L13 13.7306L24.9922 2.19967L23.2161 0.352539Z"
                  />
                </svg>
                <svg
                  className="scroll-chevron chevron-2"
                  width="26"
                  height="14"
                  viewBox="0 0 26 14"
                  fill="currentColor"
                >
                  <path
                    d="M23.2161 0.352539L13 10.1757L2.78391 0.352539L1.00781 2.19967L13 13.7306L24.9922 2.19967L23.2161 0.352539Z"
                  />
                </svg>
              </div>
            </div>
            <div className="nav-button-content">
              <div className="nav-button-title-container">
                <h3 className="nav-button-title nav-button-title-1">
                  At Dropbox, our Brand Guidelines help us infuse everything we make
                  with identity.
                </h3>
                <h3 className="nav-button-title nav-button-title-2">
                  From icons to illustration, logos to language, this collection is
                  the foundation for how Dropbox looks, feels, and sounds like
                  Dropbox.
                </h3>
                <div className="w-embed w-script">

                </div>
              </div>
              <div className="nav-button-svg menu-logo w-embed">
                <svg viewBox="0 0 46 42" fill="currentColor">
                  <path
                    d="M11.4995 2L0 9.31249L11.4995 16.625L23.001 9.31249L34.5005 16.625L46 9.31249L34.5005 2L23.001 9.31249L11.4995 2Z"
                  />
                  <path
                    d="M11.4995 31.2501L0 23.9376L11.4995 16.625L23.001 23.9376L11.4995 31.2501Z"
                  />
                  <path
                    d="M23.001 23.9376L34.5005 16.625L46 23.9376L34.5005 31.2501L23.001 23.9376Z"
                  />
                  <path
                    d="M23.001 41L11.4995 33.6875L23.001 26.375L34.5005 33.6875L23.001 41Z"
                  />
                </svg>
              </div>
              <div className="nav-button-svg menu-hamburger w-embed">
                <svg viewBox="0 0 41 41" fill="currentColor">
                  <path d="M32.6719 19.2188H8.32812V21.7812H32.6719V19.2188Z" />
                  <path d="M32.6719 9.96875H8.32812V12.5312H32.6719V9.96875Z" />
                  <path d="M32.6719 29.1094H8.32812V31.6719H32.6719V29.1094Z" />
                </svg>
              </div>
              <div className="nav-button-svg menu-arrow w-embed">


                <div className="menu-arrow-icon">
                  <svg viewBox="0 0 41 41" fill="currentColor">
                    <path
                      d="M21.8547 31.1429L13.2634 22.208L32.4624 22.208V19.6455L13.2634 19.6455L21.8547 10.7107L20.0075 8.93457L8.47656 20.9268L20.0075 32.919L21.8547 31.1429Z"
                    />
                  </svg>
                </div>
              </div>
              <div className="nav-button-svg menu-close w-embed">
                <svg viewBox="0 0 41 41" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M22.311 20.5001L30.8009 28.9899L28.9889 30.8019L20.4991 22.312L12.0092 30.8019L10.1973 28.9899L18.6871 20.5001L10.1973 12.0102L12.0092 10.1982L20.4991 18.6881L28.9889 10.1982L30.8009 12.0102L22.311 20.5001Z"
                  />
                </svg>
              </div>
            </div>
            <div className="home-logo-container w-embed">
              <svg className="home-logo" viewBox="120 120 1462 1462">
                <path
                  d="M663.477 555.977L850.079 673.172L663.477 790.366L476.906 673.172L663.477 555.977ZM663.477 791.542L850.079 908.739L663.477 1025.93L476.906 908.739L663.477 791.542ZM851.951 908.739L1038.52 791.542L1225.09 908.739L1038.52 1025.93L851.951 908.739ZM1225.09 673.172L1038.52 790.366L851.951 673.172L1038.52 555.977L1225.09 673.172ZM1037.59 1065.78L851.015 1182.97L664.413 1065.78L851.015 948.585L1037.59 1065.78Z"
                />
              </svg>
            </div>
          </button>
        </div>
        <div className="nav-page-title"></div>
        <a
          id="outro-mobile-close-button"
          tabIndex={-1}
          href="#"
          className="outro-mobile-close-button w-inline-block"
        ><div className="outro-mobile-close-button-embed w-embed">
            <svg viewBox="0 0 32 32">
              <path
                d="M22.0304 20.9697L17.0607 16.0001L22.0304 11.0304L20.9697 9.96973L16.0001 14.9394L11.0304 9.96973L9.96973 11.0304L14.9394 16.0001L9.96973 20.9697L11.0304 22.0304L16.0001 17.0607L20.9697 22.0304L22.0304 20.9697Z"
              />
            </svg></div></a><a id="partner-info-button" href="#" className="partner-info-button w-inline-block"
        ><div className="partner-info-icon-embed w-embed">
            <div className="partner-icon-container">
              <svg className="partner-info-icon" id="partner-info-icon" viewBox="0 0 16 16">
                <path
                  d="M8 0.25C2.785 0.25 0.25 2.785 0.25 8C0.25 13.215 2.785 15.75 8 15.75C13.215 15.75 15.75 13.215 15.75 8C15.75 2.785 13.215 0.25 8 0.25ZM8 14.25C3.6775 14.25 1.75 12.3225 1.75 8C1.75 3.6775 3.6775 1.75 8 1.75C12.3225 1.75 14.25 3.6775 14.25 8C14.25 12.3225 12.3225 14.25 8 14.25Z"
                />
                <path
                  d="M8 4.25002C7.85166 4.25002 7.70666 4.29401 7.58332 4.37642C7.45999 4.45883 7.36386 4.57597 7.30709 4.71301C7.25033 4.85006 7.23547 5.00086 7.26441 5.14634C7.29335 5.29183 7.36478 5.42546 7.46967 5.53035C7.57456 5.63524 7.7082 5.70667 7.85368 5.73561C7.99917 5.76455 8.14997 5.7497 8.28701 5.69293C8.42406 5.63617 8.54119 5.54004 8.6236 5.4167C8.70601 5.29336 8.75 5.14836 8.75 5.00002C8.75581 4.90001 8.7404 4.7999 8.70476 4.70627C8.66913 4.61265 8.61408 4.52762 8.54324 4.45678C8.4724 4.38594 8.38738 4.3309 8.29375 4.29526C8.20012 4.25963 8.10001 4.24421 8 4.25002Z"
                />
                <path
                  d="M7.25 6.65497L7.25 11.75L8.75 11.75L8.75 6.65497C8.25801 6.78155 7.74199 6.78155 7.25 6.65497Z"
                />
              </svg>
              <svg className="partner-close-icon" id="partner-close-icon" viewBox="0 0 16 16">
                <path
                  d="M7.26945 14.8348H8.73195C9.74257 10.4551 14.1784 9.02227 14.2234 9.00727L14.0003 8.29102L13.7798 7.57439C11.7768 8.27017 10.0261 9.54602 8.75032 11.2396V1.16602H7.25032V11.2396C5.97453 9.54602 4.22379 8.27017 2.22082 7.57439L1.77832 9.00727C1.82295 9.02114 6.25882 10.4551 7.26945 14.8348Z"
                />
              </svg>
            </div>

          </div>
          <div>Partner Info</div></a >
        <div className="nav-background"></div>
        <div className="nav-enlarge-and-menu-icon-script w-embed w-script">


        </div>
      </div>
      <div className="home-script w-embed w-script">
        <IntroAnimation></IntroAnimation>
      </div>
    </div>
  );
}
