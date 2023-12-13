import cn from 'classnames'
import localFont from 'next/font/local'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import PageLoading from './loading'
import Navigation from './navigation'
import Footer from './footer'
import Head from '..'

interface Props {
  children: React.ReactNode
}

const headingFont = localFont({
  src: '../../pages/fonts/killig.ttf',
  variable: '--font-head',
})

const myFont = localFont({
  src: '../../pages/fonts/bat.ttf',
})

const Template: React.FC<Props> = ({ children }) => {
  const router = useRouter()
  const [openNav, setOpenNav] = useState<boolean>(false)
  const [lastYPos, setLastYPos] = useState(0)
  const [shouldShowNav, setShouldShowNav] = useState(true)
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [routeState, setRouteState] = useState({
    isRouteChanging: false,
    loadingKey: 0,
  })

  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontsLoaded(true)
    })
  }, [])

  useEffect(() => {
    function handleScroll() {
      const yPos = window.scrollY
      const isScrollingUp = yPos < lastYPos

      if (window.scrollY < 200) return

      if (!openNav) {
        setShouldShowNav(isScrollingUp)
        setLastYPos(yPos)
      }
    }

    window.addEventListener('scroll', handleScroll, false)

    return () => {
      window.removeEventListener('scroll', handleScroll, false)
    }
  }, [lastYPos, openNav])

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setOpenNav(false)
      setShouldShowNav(true)
      setRouteState((prevState) => ({
        ...prevState,
        isRouteChanging: true,
        loadingKey: prevState.loadingKey ^ 1,
      }))
    }

    const handleRouteChangeEnd = () => {
      setOpenNav(false)
      setShouldShowNav(true)
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
  }, [router.events])

  return (
    <>
      {fontsLoaded && (
        <>
          <Navigation
            openNav={openNav}
            setOpenNav={setOpenNav}
            shouldShowNav={shouldShowNav}
          />
          <div
            className={cn({
              'fixed w-full': openNav || routeState.isRouteChanging,
            })}
          >
            <main
              className={cn(
                `${myFont.className} ${headingFont.variable} pt-16 md:pt-20`,
              )}
            >
              {children}
            </main>
            <Footer className={`${myFont.className} ${headingFont.variable}`} />
          </div>
        </>
      )}
      <PageLoading
        loading={routeState.isRouteChanging || !fontsLoaded}
      ></PageLoading>
    </>
  )
}

export default Template
