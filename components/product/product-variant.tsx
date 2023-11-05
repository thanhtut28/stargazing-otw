import { Product } from 'lib/sanity.queries'
import { useState } from 'react'

import ProductColor from './product-color'
import ProductSize from './product-size'

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

        <div className="h-[1px] w-full bg-disabled lg:hidden my-5" />

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

const ProductHeading = ({ name, description }: HeadingProps) => {
  return (
    <div className="py-4">
      <h2 className="font-heading text-7xl pl-5 leading-tight md:text-8xl lg:text-9xl lg:[word-spacing:99rem]">
        {name}
      </h2>
      {description && (
        <div className="flex lg:justify-end py-5">
          <p className="text-sm font-light text-secondary max-w-lg lg:w-1/2 lg:min-w-[16rem]">
            {description}
          </p>
        </div>
      )}
    </div>
  )
}
