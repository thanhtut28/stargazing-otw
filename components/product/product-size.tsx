import Button from 'components/utils/button'
import { Size } from 'lib/sanity.queries'

import AttributeTitle from './product-attribute-title'
import AttributeWrapper from './product-attribute-wrapper'

interface Props {
  sizes: Size[]
}

export default function ProductSize({ sizes }: Props) {
  return (
    <div className="flex flex-col pt-4">
      <AttributeTitle>Size</AttributeTitle>
      <AttributeWrapper>
        {sizes?.map((s) => (
          <Button key={s.size} disabled={!s.stock}>
            {s.size}
          </Button>
        ))}
      </AttributeWrapper>
    </div>
  )
}
