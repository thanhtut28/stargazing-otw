import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'

interface Props {
  source: string
}

export default function ProductImage({ source }: Props) {
  return (
    <div className="flex-1 lg:flex-[35%] relative aspect-[2/3] md:aspect-video lg:aspect-[2/3] lg:min-h-screen">
      <Image
        className="w-full object-cover"
        alt={`Featured Photo for ${source}`}
        src={urlForImage(source).url()}
        fill
      />
    </div>
  )
}
