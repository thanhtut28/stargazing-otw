import { Product } from 'lib/sanity.queries'
import { useState } from 'react'

import ProductColor from './product-color'
import ProductSize from './product-size'
import ProductDate from './product-date'

interface Props {
  product: Product
}

export default function ProductVariant({ product }: Props) {
  const colors = product.variants.map((v) => v.color)
  const [selectedColor, setSelectedColor] = useState<string>(colors[0])
  const sizes = product.variants?.find((v) => v.color === selectedColor)?.sizes

  return (
    <div className="flex-1 flex lg:justify-end py-6 px-3 md:py-8 md:px-5 lg:py-10 lg:px-8">
      <div className="flex w-full flex-col justify-between lg:text-right">
        <ProductHeading {...product} />

        <div className="h-[1px] w-full bg-disabled lg:hidden my-3 opacity-30" />

        <div className="py-4">
          <ProductColor
            colors={colors}
            selectedColor={selectedColor}
            selectColor={setSelectedColor}
          />

          <ProductSize sizes={sizes} />
        </div>
      </div>
    </div>
  )
}

type HeadingProps = Partial<Product>

const ProductHeading = ({
  name,
  description,
  itemType,
  releaseDate,
}: HeadingProps) => {
  return (
    <div className="py-4">
      <div className="pl-5">
        <h2 className="font-heading text-6xl leading-tight md:text-8xl lg:text-9xl lg:[word-spacing:99rem]">
          {name}
        </h2>
        <div className="text-secondary flex flex-col ml-2 -mt-1 lg:mr-5">
          <h6 className="uppercase text-primary font-semibold">{itemType}</h6>
          <p className="text-xs font-light">
            <ProductDate dateString={releaseDate} />
          </p>
        </div>
      </div>

      {description && (
        <div className="flex lg:justify-end pt-10 pb-5">
          <p className="text-sm font-light  max-w-lg lg:w-1/2 lg:min-w-[16rem]">
            {description}
          </p>
        </div>
      )}
    </div>
  )
}
