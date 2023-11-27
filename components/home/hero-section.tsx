import Reveal from 'components/utils/reveal'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import HeroCarousel from './hero-carousel'
import { useGlitch, GlitchHandle } from 'react-powerglitch'

interface HeroProps {
  brushImage: any
  heroImages: any[]
}

export default function HeroSection({ brushImage, heroImages }: HeroProps) {
  const brushSource = brushImage?.asset?._ref
  const images = heroImages?.map((img) => img.asset._ref)
  const glitch: GlitchHandle = useGlitch({
    playMode: 'always',
    hideOverflow: true,
    shake: {
      amplitudeX: 0.05,
      amplitudeY: 0.05,
    },
    timing: {
      duration: 6000,
    },
    glitchTimeSpan: {
      start: 0.2,
      end: 0.3,
    },
  })

  return (
    <>
      <div className="flex flex-col justify-between lg:min-h-screen mt-10 lg:mt-0">
        <div className="relative">
          <h1
            className="text-[24vw] pt-3 sm:h-auto text-center font-heading"
            ref={glitch.ref}
          >
            Stargazing
          </h1>

          <div className="absolute bottom-3 left-0 right-0 w-5/6 mx-auto">
            <Reveal type="appear">
              <Image
                className="object-cover w-full"
                width={2318}
                height={124}
                alt={`Featured Photo for ${brushSource}`}
                src={urlForImage(brushSource).url()}
              />
            </Reveal>
          </div>
        </div>
        <Reveal>
          <p className="text-center text-secondary p-10 py-16 lg:p-5 sm:text-lg md:p-14 md:text-xl lg:text-3xl leading-snug lg:w-1/2 mx-auto">
            Discover a curated selection of streetwear essentials from our local
            brand. Explore our collection now and redefine your urban aesthetic.
          </p>
        </Reveal>
      </div>
      <div className="pb-10 lg:pt-10">
        <Reveal type="opacity">
          <HeroCarousel images={images} />
        </Reveal>
      </div>
    </>
  )
}
