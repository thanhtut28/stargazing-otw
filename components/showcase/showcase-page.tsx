import { ArrowLongRightIcon } from '@heroicons/react/24/solid'
import Button from 'components/utils/button'
import type { Product, Settings } from 'lib/sanity.queries'
import { useRouter } from 'next/router'

import ImageGallery from '../utils/image-gallery'
import Container from './showcase-container'
import ShowcasePageHead from './showcase-page-head'
import ProductImage from './showcase-product-image'
import TitleC from './showcase-title'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  products: Product[]
  settings: Settings
}

export default function ShowcasePage(props: IndexPageProps) {
  const { products, settings } = props
  const { push } = useRouter()

  return (
    <>
      <ShowcasePageHead settings={settings} />

      <Container>
        <TitleC />
        <div className="grid grid-cols-1 p-2 gap-5 mx-auto lg:max-w-screen-lg md:grid-cols-2">
          {products?.map((product) => (
            <div key={product._id}>
              <div className="aspect-[2/3] w-full max-w-md lg:max-w-lg mx-auto relative border border-disabled border-opacity-20">
                <ProductImage source={product.featuredImage?.asset?._ref} />
                <div className="absolute p-3 top-0 bottom-0 left-0 right-0 w-full h-full flex flex-col justify-end">
                  <div className="flex flex-col items-center ">
                    <h6 className="py-3 uppercase text-secondary text-lg">
                      {product.itemType}
                    </h6>
                    <h3 className="font-heading text-6xl pb-2">
                      {product.name}
                    </h3>

                    <Button
                      variant="action"
                      onClick={() =>
                        push({
                          pathname: `/products/${product.slug}`,
                        })
                      }
                    >
                      Explore
                      <ArrowLongRightIcon className="w-6 h-6" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  )
}
