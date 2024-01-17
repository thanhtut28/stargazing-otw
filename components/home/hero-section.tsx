import Reveal from 'components/utils/reveal'
import Time from 'components/utils/time'
import Image from 'next/image'

import logoSrc from '../../public/assets/text-logo.png'
import HeroCarousel from './hero-carousel'

interface HeroProps {
  heroVideo: any
}

export default function HeroSection({ heroVideo }: HeroProps) {
  return (
    <>
      <div className="flex flex-col items-center justify-between mt-10 lg:mt-0">
        <Image
          className="w-2/3 aspect-[3/1] object-cover"
          alt={`Featured Photo for ${logoSrc}`}
          src={logoSrc}
          priority
        />

        <Reveal>
          <p className="text-center text-secondary leading-snug mx-auto pb-20 text-sm sm:text-lg md:text-xl lg:text-2xl lg:w-1/2 ">
            <Time />
          </p>
        </Reveal>
      </div>
      <div className="pb-10 lg:pt-10">
        <HeroCarousel video={heroVideo} />
      </div>
    </>
  )
}
