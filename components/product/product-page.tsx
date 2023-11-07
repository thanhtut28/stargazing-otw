import Container from 'components/product/product-container'
import type { Product, Settings } from 'lib/sanity.queries'
import { notFound } from 'next/navigation'

import DetailsWrapper from './product-details-wrapper'
import ProductImage from './product-image'
import ProductPrice from './product-price'
import ProductVariant from './product-variant'
import ProductPageHead from './product-page-head'

export interface PostPageProps {
  preview?: boolean
  loading?: boolean
  product: Product
  settings: Settings
}

export default function ProductPage({
  product,
  preview,
  loading,
  settings,
}: PostPageProps) {
  const [firstImage, ...images] = product?.pictures
  const source = firstImage?.asset?._ref

  const slug = product?.slug

  if (!slug && !preview) {
    notFound()
  }

  return (
    <>
      <ProductPageHead product={product} settings={settings} />
      <Container>
        <ProductImage source={source} soldout={product.soldout} />
        <DetailsWrapper>
          <ProductVariant product={product} />

          {/* price column */}
          <ProductPrice price={product.price} />
        </DetailsWrapper>
      </Container>
    </>
  )
}
