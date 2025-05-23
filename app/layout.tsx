import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Dropbox Brand Guidelines',
  description: 'Official Dropbox brand assets and guidelines.',
  themeColor: '#ffffff',
  icons: {
    icon: 'https://cdn.prod.website-files.com/66c503d081b2f012369fc5d2/67336e1ef555445999b4a0a3_favicon.ico',
    apple: 'https://cdn.prod.website-files.com/66c503d081b2f012369fc5d2/673385fd3198626bd743eb08_1024x1024bb%20(1).jpg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* External CDN styles */}
        <link
          rel="stylesheet"
          href="https://cdn.prod.website-files.com/66c503d081b2f012369fc5d2/css/brand-app-site.webflow.6721586f7.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Anti-flicker styles */}
        <style>{`
          .anti-flicker, .anti-flicker * {
            visibility: hidden !important;
            opacity: 0 !important;
          }
          [data-wf-hidden-variation], [data-wf-hidden-variation] * {
            display: none !important;
          }
        `}</style>
      </head>
      <body className="home">
        <div className="home-load-in-critical-styles w-embed">
        {children}
        </div>

        {/* External scripts (best practice using next/script) */}
        <Script
          src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://www.dropbox.com/pithos/privacy_consent"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
