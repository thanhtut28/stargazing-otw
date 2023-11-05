import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'

interface Props {
  source: string
  soldout: boolean
}

export default function ProductImage({ source, soldout }: Props) {
  return (
    <div className="flex-1 lg:flex-[35%] relative aspect-[2/3] md:aspect-video lg:aspect-[2/3] lg:min-h-screen border-b-[0.5px] border-disabled border-opacity-30 md:border-[0.5px]">
      <Image
        className="w-full object-cover"
        alt={`Featured Photo for ${source}`}
        src={urlForImage(source).url()}
        fill
      />
      {soldout && (
        <div className="absolute top-[20%] right-0 w-10 h-32 bg-white text-black flex justify-center items-center ">
          <h6 className="uppercase font-light text-sm -rotate-90 ml-1">
            soldout
          </h6>
        </div>
      )}
    </div>
  )
}
