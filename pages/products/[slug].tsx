import PostPage from 'components/post/PostPage'
import PreviewPostPage from 'components/PreviewPostPage'
import ProductPage from 'components/product/product-page'
import { readToken } from 'lib/sanity.api'
import {
  getAllPostsSlugs,
  getClient,
  getPostAndMoreStories,
  getProductBySlug,
  getSettings,
} from 'lib/sanity.client'
import { Post, Product, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  product: Product
  settings?: Settings
}

interface Query {
  [key: string]: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const { settings, product, draftMode } = props

  return <ProductPage product={product} settings={settings} />
}

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
  const slugs = await getAllPostsSlugs()

  return {
    // paths: slugs?.map(({ slug }) => `/posts/${slug}`) || [],
    paths: [],
    fallback: 'blocking',
  }
}
