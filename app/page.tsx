"use client";

import { useEffect, useRef } from "react";
import IntroAnimation from "./components/IntroAnimation";
import FrameworkTile from "./components/nav-tiles/FrameworkTile";
import VoiceToneTile from "./components/nav-tiles/VoiceToneTile";
import LogoTile from "./components/nav-tiles/LogoTile";
import TypographyTile from "./components/nav-tiles/TypographyTile";
import IconographyTile from "./components/nav-tiles/IconographyTile";
import ColorTile from "./components/nav-tiles/ColorTile";
import ImageTile from "./components/nav-tiles/ImageTile";
import MotionTile from "./components/nav-tiles/MotionTile";

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
          (icon as HTMLElement).style.transition =
            "transform 0.3s cubic-bezier(.25,0,.25,1), opacity 0.3s cubic-bezier(.25,0,.25,1)";
      });
    }

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.location.reload();
      }
    };

    window.addEventListener("pageshow", onPageShow);

    initMenuMode(0);


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
            <FrameworkTile></FrameworkTile>
            <VoiceToneTile></VoiceToneTile>
            <LogoTile></LogoTile>
            <TypographyTile></TypographyTile>
            <IconographyTile></IconographyTile>
            <ColorTile></ColorTile>
            <ImageTile></ImageTile>
            <MotionTile></MotionTile>
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
