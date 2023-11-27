import 'tailwindcss/tailwind.css'

import { AppProps } from 'next/app'
import localFont from 'next/font/local'
import { lazy, useEffect, useState } from 'react'
import router from 'next/router'
import Link from 'next/link'

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

  const [state, setState] = useState({
    isRouteChanging: false,
    loadingKey: 0,
  })

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: true,
        loadingKey: prevState.loadingKey ^ 1,
      }))
    }

    const handleRouteChangeEnd = () => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: false,
      }))
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeEnd)
    router.events.on('routeChangeError', handleRouteChangeEnd)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeEnd)
      router.events.off('routeChangeError', handleRouteChangeEnd)
    }
  }, [])

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
          {/* <nav>
            <style jsx>{`
              a {
                margin: 0 10px 0 0;
              }
            `}</style>
            <Link href="/">Home</Link>
            <Link href="/showcase">Showcase</Link>{' '}
          </nav> */}
          <Component {...pageProps} />
          {state.isRouteChanging && (
            <div className="z-50 fixed bg-slate-600 top-0 left-0 right-0 bottom-0 w-full h-full">
              Loading
            </div>
          )}
        </main>
      )}
    </>
  )
}
