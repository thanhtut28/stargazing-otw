import ShowcasePage from 'components/showcase/showcase-page'
import { readToken } from 'lib/sanity.api'
import { getAllProducts, getClient, getSettings } from 'lib/sanity.client'
import { Product, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  products: Product[]
  settings: Settings
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const { products, settings } = props

  return <ShowcasePage settings={settings} products={products} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  // demo testing page loading time
  // await new Promise((resolve) => {
  //   setTimeout(resolve, 3000)
  // })

  const [settings, products = []] = await Promise.all([
    getSettings(client),
    getAllProducts(client),
  ])

  return {
    props: {
      products,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
    revalidate: 1,
  }
}
