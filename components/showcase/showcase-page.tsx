import { ArrowLongRightIcon } from '@heroicons/react/24/solid'
import Button from 'components/utils/button'
import type { Product, Settings } from 'lib/sanity.queries'

import Container from './showcase-container'
import ShowcasePageHead from './showcase-page-head'
import ProductImage from './showcase-product-image'
import Title from './showcase-title'
import { useRouter } from 'next/router'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  products: Product[]
  settings: Settings
}

export default function ShowcasePage(props: IndexPageProps) {
  const { products, settings } = props
  const { push } = useRouter()

  console.log(products)

  return (
    <>
      <ShowcasePageHead settings={settings} />

      <Container>
        <Title />
        <div className="grid grid-cols-1 p-2 gap-5 mx-auto lg:max-w-screen-lg md:grid-cols-2">
          {products?.map((product) => (
            <div key={product._id}>
              <div className="aspect-[2/3] w-full max-w-md lg:max-w-lg mx-auto relative border border-disabled border-opacity-20">
                <ProductImage source={product.pictures?.[0]?.asset?._ref} />
                <div className="absolute p-3 top-0 bottom-0 left-0 right-0 w-full h-full flex flex-col justify-end">
                  <div className="flex flex-col items-center ">
                    <h6 className="py-2 uppercase text-secondary text-lg">
                      {product.itemType}
                    </h6>
                    <h3 className="font-heading text-6xl pb-2">
                      {product.name}
                    </h3>

                    <Button
                      variant="cta"
                      onClick={() =>
                        push({
                          pathname: `/products/${product.slug}`,
                        })
                      }
                    >
                      Explore
                      <span>
                        <ArrowLongRightIcon className="text-black w-6 h-6 group-hover:text-white" />
                      </span>
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
