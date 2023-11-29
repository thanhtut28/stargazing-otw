import 'tailwindcss/tailwind.css'

import cn from 'classnames'
import { AppProps } from 'next/app'
import localFont from 'next/font/local'
import router from 'next/router'
import { ReactElement, ReactNode, lazy, useEffect, useState } from 'react'

import Navigation from './layout/navigation'
import { NextPage } from 'next'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export interface SharedPageProps {
  draftMode: boolean
  token: string
}

const PreviewProvider = lazy(() => import('components/PreviewProvider'))

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const { draftMode, token } = pageProps

  const [routeState, setRouteState] = useState({
    isRouteChanging: false,
    loadingKey: 0,
  })
  const [openNav, setOpenNav] = useState<boolean>(false)
  const getLayout = Component.getLayout ?? ((page) => page)

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setRouteState((prevState) => ({
        ...prevState,
        isRouteChanging: true,
        loadingKey: prevState.loadingKey ^ 1,
      }))
    }

    const handleRouteChangeEnd = () => {
      setOpenNav(false)
      setRouteState((prevState) => ({
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
          <Component {...pageProps} />
        </PreviewProvider>
      ) : (
        <>
          {/* <nav>
            <style jsx>{`
              a {
                margin: 0 10px 0 0;
              }
            `}</style>
            <Link href="/">Home</Link>
            <Link href="/showcase">Showcase</Link>{' '}
          </nav> */}
          {getLayout(<Component {...pageProps} />)}
          {/* {state.isRouteChanging && (
              <div className="z-50 fixed bg-slate-600 top-0 left-0 right-0 bottom-0 w-full h-full">
                Loading
              </div>
            )} */}
        </>
      )}
    </>
  )
}
