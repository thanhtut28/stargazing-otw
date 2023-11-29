import 'tailwindcss/tailwind.css'

import { lazy } from 'react'
import { AppPropsWithLayout } from 'types/global'

export interface SharedPageProps {
  draftMode: boolean
  token: string
}

const PreviewProvider = lazy(() => import('components/PreviewProvider'))

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const { draftMode, token } = pageProps

  const getLayout = Component.getLayout ?? ((page) => page)

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
        </>
      )}
    </>
  )
}
