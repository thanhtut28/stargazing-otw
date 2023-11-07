import BlogMeta from 'components/BlogMeta'
import * as demo from 'lib/demo.data'
import { urlForImage } from 'lib/sanity.image'
import { Product, Settings } from 'lib/sanity.queries'
import Head from 'next/head'

export interface ProductPageHeadProps {
  settings: Settings
  product: Product
}

export default function ProductPageHead({
  settings,
  product,
}: ProductPageHeadProps) {
  const title = settings.title ?? demo.title
  return (
    <Head>
      <title>{product.name ? `${product.name} | ${title}` : title}</title>
      <BlogMeta />
      {product.pictures?.[0]?.asset?._ref && (
        <meta
          property="og:image"
          content={urlForImage(product.pictures?.[0])
            .width(1200)
            .height(627)
            .fit('crop')
            .url()}
        />
      )}
    </Head>
  )
}
