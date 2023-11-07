import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'

interface Props {
  source: string
}

export default function ProductImage({ source }: Props) {
  console.log(source)
  return (
    <div className="relative w-full h-full">
      <Image
        className="w-full object-cover"
        alt={`Featured Photo for ${source}`}
        src={urlForImage(source).url()}
        fill
      />
      <div className="bg-gradient-to-t from-dark absolute top-0 bottom-0 left-0 right-0" />
    </div>
  )
}
