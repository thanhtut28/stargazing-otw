import { AppProps } from 'next/app'
import { lazy } from 'react'
import localFont from 'next/font/local'
import 'tailwindcss/tailwind.css'

export interface SharedPageProps {
  draftMode: boolean
  token: string
}

const headingFont = localFont({ src: '../public/fonts/Killig.ttf' })

const myFont = localFont({ src: '../public/fonts/BAHNSCHRIFT.ttf' })

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
          <main className={myFont.className}>
            <Component {...pageProps} />
          </main>
        </PreviewProvider>
      ) : (
        <main className={myFont.className}>
          <Component {...pageProps} />
        </main>
      )}
    </>
  )
}
