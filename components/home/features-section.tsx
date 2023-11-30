import { ArrowLongRightIcon } from '@heroicons/react/24/solid'
import Button from 'components/utils/button'
import Reveal from 'components/utils/reveal'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import { useRouter } from 'next/router'

interface Props {
  featuredImages: any[]
}

export default function FeaturesSection({ featuredImages }: Props) {
  const [firstImage, secondImage] =
    featuredImages?.length > 0
      ? featuredImages.map((img) => img?.asset?._ref)
      : []
  const { push } = useRouter()

  return (
    <div className="p-10 lg:px-2 max-w-screen-lg mx-auto">
      <Reveal>
        <p className="w-[90%] py-4 md:w-3/4 lg:w-2/3 xl:w-1/2 text-secondary leading-4 text-sm lg:text-xl">
          <span className="font-heading leading-3 text-white text-2xl lg:text-4xl pr-2">
            Stargazing
          </span>
          is founded by a group of people in MYANMAR who are passionate in
          creating vintage clothing.
        </p>
      </Reveal>

      <div className="py-7">
        <Reveal>
          <Button
            variant="cta"
            onClick={() =>
              push({
                pathname: `/showcase`,
              })
            }
          >
            explore products
            <ArrowLongRightIcon className="ml-3 w-4 h-4" />
          </Button>
        </Reveal>
      </div>

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
