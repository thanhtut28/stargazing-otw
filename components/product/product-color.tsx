import Button from 'components/utils/button'
import { Dispatch, SetStateAction } from 'react'

import AttributeTitle from './product-attribute-title'
import AttributeWrapper from './product-attribute-wrapper'

interface Props {
  colors: string[]
  selectedColor: string
  selectColor: Dispatch<SetStateAction<string>>
}

export default function ProductColor({
  colors,
  selectedColor,
  selectColor,
}: Props) {
  return (
    <div className="flex flex-col">
      <AttributeTitle>Color</AttributeTitle>
      <AttributeWrapper>
        {colors.map((color) => (
          <Button
            key={color}
            variant={color === selectedColor ? 'selected' : 'primary'}
            onClick={() => selectColor(color)}
          >
            {color}
          </Button>
        ))}
      </AttributeWrapper>
    </div>
  )
}
