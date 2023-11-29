import localFont from 'next/font/local'
import Navigation from './navigation'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PageLoading from './loading'

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
  const [openNav, setOpenNav] = useState<boolean>(false)
  const router = useRouter()

  const [routeState, setRouteState] = useState({
    isRouteChanging: false,
    loadingKey: 0,
  })

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setOpenNav(false)
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
  }, [router.events])

  return (
    <>
      <Navigation openNav={openNav} setOpenNav={setOpenNav} />
      <main
        className={cn(
          `${myFont.className} ${headingFont.variable} pt-16 md:pt-20`,
          {
            'fixed w-full': openNav || routeState.isRouteChanging,
          },
        )}
      >
        {children}
      </main>
      <PageLoading loading={routeState.isRouteChanging}></PageLoading>
    </>
  )
}

export default Template
