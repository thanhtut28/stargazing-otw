import Reveal from 'components/utils/reveal'
import Image from 'next/image'

import logoSrc from '../../public/assets/text-logo.png'
import HeroCarousel from './hero-carousel'

interface HeroProps {
  heroVideo: any
}

export default function HeroSection({ heroVideo }: HeroProps) {
  return (
    <>
      <div className="flex flex-col justify-between mt-10 lg:mt-0">
        <Image
          className="w-full aspect-[3/1] object-cover"
          alt={`Featured Photo for ${logoSrc}`}
          src={logoSrc}
          priority
        />

        <Reveal>
          <p className="text-center text-secondary p-10 py-16 lg:p-5 sm:text-lg md:p-14 md:text-xl lg:text-3xl leading-snug lg:w-1/2 mx-auto">
            Discover a curated selection of streetwear essentials from our local
            brand. Explore our collection now and redefine your urban aesthetic.
          </p>
        </Reveal>
      </div>
      <div className="pb-10 lg:pt-10">
        <HeroCarousel video={heroVideo} />
      </div>
    </>
  )
}
