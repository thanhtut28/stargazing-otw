import 'tailwindcss/tailwind.css'

import { AppProps } from 'next/app'
import localFont from 'next/font/local'
import { lazy } from 'react'

export interface SharedPageProps {
  draftMode: boolean
  token: string
}

const headingFont = localFont({
  src: './fonts/killig.ttf',
  variable: '--font-head',
})

const myFont = localFont({
  src: './fonts/bat.ttf',
})

const PreviewProvider = lazy(() => import('components/PreviewProvider'))

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps
  return (
    <>
      {draftMode ? (
        <PreviewProvider token={token}>
          <main className={`${myFont.className} ${headingFont.variable}`}>
            <Component {...pageProps} />
          </main>
        </PreviewProvider>
      ) : (
        <main className={`${myFont.className} ${headingFont.variable}`}>
          <Component {...pageProps} />
        </main>
      )}
    </>
  )
}
