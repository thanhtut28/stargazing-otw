import ProductPage from 'components/product/product-page'
import { readToken } from 'lib/sanity.api'
import {
  getAllProductsSlugs,
  getClient,
  getProductBySlug,
  getSettings,
} from 'lib/sanity.client'
import { Product, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'
import Template from 'pages/layout/template'
import { NextPageWithLayout } from 'types/global'

interface PageProps extends SharedPageProps {
  product: Product
  settings?: Settings
}

interface Query {
  [key: string]: string
}

const Page: NextPageWithLayout<PageProps> = (props) => {
  const { settings, product } = props

  return <ProductPage product={product} settings={settings} />
}

Page.getLayout = (page) => <Template>{page}</Template>

export default Page

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, product] = await Promise.all([
    getSettings(client),
    getProductBySlug(client, params.slug),
  ])

  if (!product) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      product,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
    revalidate: 1,
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllProductsSlugs()

  return {
    paths: slugs?.map(({ slug }) => `/products/${slug}`) || [],
    fallback: true,
  }
}
