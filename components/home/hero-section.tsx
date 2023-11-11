import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'

interface HeroProps {
  brushImage: any
  heroImages: any[]
}

export default function HeroSection({ brushImage, heroImages }: HeroProps) {
  const brushSource = brushImage?.asset?._ref
  const [heroImage, ...images] = heroImages?.map((img) => img.asset._ref)

  return (
    <>
      <div className="flex flex-col justify-between lg:min-h-screen mt-10 lg:mt-0">
        <div>
          <h1 className="text-[24vw] h-32 sm:h-auto text-center font-heading">
            Stargazing
          </h1>
          <div className="-mt-2 lg:-mt-16 xl:-mt-24 w-5/6 mx-auto">
            <Image
              className="object-cover w-full"
              width={2318}
              height={124}
              alt={`Featured Photo for ${brushSource}`}
              src={urlForImage(brushSource).url()}
            />
          </div>
        </div>
        <p className="text-center text-secondary p-10 lg:p-5 sm:text-lg md:p-14 md:text-xl lg:text-3xl leading-snug lg:w-1/2 mx-auto line-">
          Discover a curated selection of streetwear essentials from our local
          brand. Explore our collection now and redefine your urban aesthetic.
        </p>
      </div>
      <div className="pb-10 lg:pt-10">
        <div className="w-full relative aspect-[3/4] lg:aspect-video max-w-screen-lg mx-auto">
          <Image
            className="object-cover w-full grayscale opacity-50"
            alt={`Featured Photo for ${heroImage}`}
            src={urlForImage(heroImage).url()}
            fill
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 flex gap-1 md:gap-2 lg:gap-4 flex-col justify-end items-center p-5">
            <h6 className="font-heading  text-primary text-2xl lg:text-5xl">
              They stargazed about rich life
            </h6>
            <p className="uppercase text-xs opacity-80 lg:text-lg">EST. 2023</p>
          </div>
        </div>
      </div>
    </>
  )
}
