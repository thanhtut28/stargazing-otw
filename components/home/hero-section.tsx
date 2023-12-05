import Reveal from 'components/utils/reveal'
import { GlitchHandle, useGlitch } from 'react-powerglitch'

import HeroCarousel from './hero-carousel'

interface HeroProps {
  heroVideo: any
}

export default function HeroSection({ heroVideo }: HeroProps) {
  const glitch: GlitchHandle = useGlitch({
    playMode: 'always',
    hideOverflow: true,
    shake: {
      amplitudeX: 0.05,
      amplitudeY: 0.05,
    },
    timing: {
      duration: 8000,
    },
    glitchTimeSpan: {
      start: 0.2,
      end: 0.28,
    },
  })

  return (
    <>
      <div className="flex flex-col justify-between mt-10 lg:mt-0">
        <h1
          className="text-[24vw] pt-3 sm:h-auto text-center font-heading"
          // need to remove or change later
          ref={glitch.ref}
        >
          Stargazing
        </h1>

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
