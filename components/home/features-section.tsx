import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'

interface Props {
  featuredImages: any[]
}

export default function FeaturesSection({ featuredImages }: Props) {
  const [firstImage, secondImage] =
    featuredImages?.length > 0
      ? featuredImages.map((img) => img?.asset?._ref)
      : []

  return (
    <div className="p-10 lg:px-0 max-w-screen-lg mx-auto">
      <p className="w-[90%] md:w-3/4 lg:w-2/3 xl:w-1/2 text-secondary leading-4 text-sm lg:text-xl">
        <span className="font-heading leading-3 text-white text-2xl lg:text-4xl pr-2">
          Stargazing
        </span>
        is founded by a group of people in MYANMAR who are passionate in
        creating vintage clothing.
      </p>
      <div className="py-20 lg:py-32 max-w-3xl">
        <div className="relative z-10 w-3/5 aspect-[10/16] rotate-3">
          <Image
            className="w-full object-cover grayscale"
            alt={`Featured Photo for ${firstImage}`}
            src={urlForImage(firstImage).url()}
            fill
          />
        </div>
        <div className="flex justify-end">
          <div className="relative z-0 -mt-10 w-5/6 aspect-[11/16] -rotate-3">
            <Image
              className="w-full object-cover grayscale"
              alt={`Featured Photo for ${firstImage}`}
              src={urlForImage(secondImage).url()}
              fill
            />
          </div>
        </div>
      </div>
    </div>
  )
}
