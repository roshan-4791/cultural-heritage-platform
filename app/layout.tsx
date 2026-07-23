import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Virasat (विरासत) — Universal Vault for Vanishing Cultural Heritage',
  description:
    'Virasat (विरासत) — An inclusive living archive honoring the world\'s vanishing cultures, tribal lore, folk arts, and oral traditions. Amrita Vishwa Vidyapeetam SSR Initiative.',
  keywords: [
    'Virasat',
    'विरासत',
    'Cultural Heritage Vault',
    'Vanishing Cultures',
    'Tribal Art',
    'Folk Traditions',
    'Oral Lore',
    'Amrita Vishwa Vidyapeetam',
    'SSR',
  ],
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Poppins:wght@300;400;500;600;700&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300&family=Tiro+Devanagari+Hindi:ital@0;1&display=swap"
          rel="stylesheet"
        />
        {/* Google Translate Init Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                if (window.google && window.google.translate) {
                  new window.google.translate.TranslateElement({
                    pageLanguage: 'en',
                    includedLanguages: 'en,hi,te,ta,kn,ml,mr,sa,pa,gu,bn',
                    autoDisplay: false
                  }, 'google_translate_element');
                }
              }
            `
          }}
        />
        <script
          type="text/javascript"
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          async
        ></script>
      </head>
      <body>
        <div id="google_translate_element" style={{ position: 'fixed', top: '-9999px', left: '-9999px', opacity: 0, pointerEvents: 'none' }}></div>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
