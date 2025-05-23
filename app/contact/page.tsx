'use client';
import React from 'react';

export default function Contact() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl md:text-6xl font-bold neon-text mb-6">
        Lets Build Something Amazing Together!
      </h1>
      <p className="text-purple-300 text-lg md:text-xl mb-8 max-w-xl">
        I am <span className="font-semibold text-purple-400">Rajinder Kumar</span>, a frontend developer who turns bold ideas into beautiful digital experiences.
        Got a project or just want to say hi? Lets chat!
      </p>
      <a
        href="https://wa.me/917340843147"
        target="_blank"
        rel="noopener noreferrer"
        className="px-8 py-4 border-2 border-purple-500 text-purple-300 hover:bg-purple-700 hover:text-white transition-all duration-300 rounded-xl text-lg"
      >
        📲 Contact Me on WhatsApp
      </a>

      <style jsx>{`
        .neon-text {
          color: #d946ef;
          text-shadow: 0 0 5px #d946ef, 0 0 10px #d946ef, 0 0 20px #d946ef;
          animation: glow 2s ease-in-out infinite alternate;
        }

        @keyframes glow {
          from {
            text-shadow: 0 0 5px #d946ef, 0 0 10px #d946ef, 0 0 20px #d946ef;
          }
          to {
            text-shadow: 0 0 10px #c026d3, 0 0 20px #c026d3, 0 0 40px #c026d3;
          }
        }
      `}</style>
    </main>
  );
}
