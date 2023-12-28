import ImageGallery from 'components/utils/image-gallery'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'

interface Props {
  images: string[]
  sizeChart: string
}

export default function ProductImage({ images, sizeChart }: Props) {
  return (
    <div className="lg:flex-[35%] relative">
      <ImageGallery images={images} sizeChart={sizeChart} />
      {/* {soldout && (
        <div className="absolute top-[20%] right-0 w-10 h-32 bg-white text-black flex justify-center items-center ">
          <h6 className="uppercase font-light text-sm -rotate-90 ml-1">
            soldout
          </h6>
        </div>
      )} */}
    </div>
  )
}
